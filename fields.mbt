///|
/// RabbitMQ field-table dialect. Floating point values preserve their raw IEEE bits.
/// LongString retains arbitrary bytes; table order and duplicate keys are preserved.
pub(all) enum FieldValue {
  Boolean(Bool)
  Signed8(Int)
  Unsigned8(Int)
  Signed16(Int)
  Unsigned16(Int)
  Signed32(Int)
  Unsigned32(UInt)
  Signed64(Int64)
  Float32Bits(UInt)
  Float64Bits(UInt64)
  Decimal(Int, Int)
  LongString(Bytes)
  ByteArray(Bytes)
  Timestamp(UInt64)
  ArrayValue(Array[FieldValue])
  TableValue(Array[(String, FieldValue)])
  Void
} derive(Debug, Eq)

///|
fn checked_int(value : Int, low : Int, high : Int) -> UInt64 raise FrameError {
  if value < low || value > high {
    raise Invalid("integer field out of range")
  }
  value.to_int64().reinterpret_as_uint64()
}

///|
fn write_table(
  w : WireWriter,
  entries : Array[(String, FieldValue)],
  depth : Int,
) -> Unit raise FrameError {
  w.node(depth)
  let start = w.bytes.length()
  w.uint(0UL, 4)
  for (key, value) in entries {
    w.shortstr(key)
    write_field(w, value, depth + 1)
  }
  w.patch_size(start)
}

///|
fn write_field(
  w : WireWriter,
  value : FieldValue,
  depth : Int,
) -> Unit raise FrameError {
  w.node(depth)
  match value {
    Boolean(v) => {
      w.uint(116UL, 1)
      w.uint(if v { 1UL } else { 0UL }, 1)
    }
    Signed8(v) => {
      w.uint(98UL, 1)
      w.uint(checked_int(v, -128, 127), 1)
    }
    Unsigned8(v) => {
      w.uint(66UL, 1)
      w.uint(checked_int(v, 0, 255), 1)
    }
    Signed16(v) => {
      w.uint(115UL, 1)
      w.uint(checked_int(v, -32768, 32767), 2)
    }
    Unsigned16(v) => {
      w.uint(117UL, 1)
      w.uint(checked_int(v, 0, 65535), 2)
    }
    Signed32(v) => {
      w.uint(73UL, 1)
      w.uint(v.to_int64().reinterpret_as_uint64(), 4)
    }
    Unsigned32(v) => {
      w.uint(105UL, 1)
      w.uint(v.to_uint64(), 4)
    }
    Signed64(v) => {
      w.uint(108UL, 1)
      w.uint(v.reinterpret_as_uint64(), 8)
    }
    Float32Bits(v) => {
      w.uint(102UL, 1)
      w.uint(v.to_uint64(), 4)
    }
    Float64Bits(v) => {
      w.uint(100UL, 1)
      w.uint(v, 8)
    }
    Decimal(scale, coefficient) => {
      w.uint(68UL, 1)
      w.uint(checked_int(scale, 0, 255), 1)
      w.uint(coefficient.to_int64().reinterpret_as_uint64(), 4)
    }
    LongString(v) => {
      w.uint(83UL, 1)
      w.longstr(v)
    }
    ByteArray(v) => {
      w.uint(120UL, 1)
      w.longstr(v)
    }
    Timestamp(v) => {
      w.uint(84UL, 1)
      w.uint(v, 8)
    }
    Void => w.uint(86UL, 1)
    TableValue(entries) => {
      w.uint(70UL, 1)
      write_table(w, entries, depth)
    }
    ArrayValue(values) => {
      w.uint(65UL, 1)
      let start = w.bytes.length()
      w.uint(0UL, 4)
      for item in values {
        write_field(w, item, depth + 1)
      }
      w.patch_size(start)
    }
  }
}

///|
fn read_table(
  r : WireReader,
  depth : Int,
) -> Array[(String, FieldValue)] raise FrameError {
  r.node(depth)
  let end = r.container_end()
  let outer = r.end
  r.end = end
  let entries = []
  while r.pos < end {
    let key = r.shortstr()
    entries.push((key, read_field(r, depth + 1)))
  }
  r.end = outer
  entries
}

///|
fn read_field(r : WireReader, depth : Int) -> FieldValue raise FrameError {
  r.node(depth)
  match r.uint(1).to_int() {
    116 => Boolean(r.uint(1) != 0UL)
    98 => {
      let n = r.uint(1).to_int()
      Signed8(if n >= 128 { n - 256 } else { n })
    }
    66 => Unsigned8(r.uint(1).to_int())
    115 => {
      let n = r.uint(2).to_int()
      Signed16(if n >= 32768 { n - 65536 } else { n })
    }
    117 => Unsigned16(r.uint(2).to_int())
    73 => Signed32(r.uint(4).to_int())
    105 => Unsigned32(r.uint(4).to_uint())
    108 => Signed64(r.uint(8).reinterpret_as_int64())
    102 => Float32Bits(r.uint(4).to_uint())
    100 => Float64Bits(r.uint(8))
    68 => {
      let scale = r.uint(1).to_int()
      Decimal(scale, r.uint(4).to_int())
    }
    83 => LongString(r.longstr())
    120 => ByteArray(r.longstr())
    84 => Timestamp(r.uint(8))
    86 => Void
    70 => TableValue(read_table(r, depth))
    65 => {
      let end = r.container_end()
      let outer = r.end
      r.end = end
      let values = []
      while r.pos < end {
        values.push(read_field(r, depth + 1))
      }
      r.end = outer
      ArrayValue(values)
    }
    _ => raise Invalid("unknown field-table type tag")
  }
}

///|
/// Encode a length-prefixed AMQP table; maximum depth 32, 65536 visited nodes.
pub fn encode_table(
  entries : Array[(String, FieldValue)],
) -> Bytes raise FrameError {
  let w = WireWriter::new()
  write_table(w, entries, 0)
  Bytes::from_array(w.bytes)
}

///|
pub fn decode_table(
  bytes : Bytes,
) -> Array[(String, FieldValue)] raise FrameError {
  let r = WireReader::new(bytes)
  let result = read_table(r, 0)
  r.finish()
  result
}
