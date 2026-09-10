///|
pub(all) enum ArgumentKind {
  BitKind
  OctetKind
  ShortKind
  LongKind
  LongLongKind
  ShortStringKind
  LongStringKind
  TableKind
} derive(Debug, Eq)

///|
pub(all) enum Argument {
  Bit(Bool)
  Octet(Int)
  Short(Int)
  Long(UInt)
  LongLong(UInt64)
  ShortString(String)
  LongString(Bytes)
  Table(Array[(String, FieldValue)])
} derive(Debug, Eq)

///|
pub struct MethodSpec {
  class_id : Int
  method_id : Int
  name : String
  fields : Array[(String, ArgumentKind)]
  carries_content : Bool
} derive(Debug, Eq)

///|
pub(all) struct Method {
  class_id : Int
  method_id : Int
  arguments : Array[Argument]
} derive(Debug, Eq)

///|
fn method_channel(class_id : Int, channel : Int) -> Unit raise FrameError {
  if channel < 0 || channel > 65535 || (class_id == 10) != (channel == 0) {
    raise Invalid(
      "connection methods require channel zero; other methods require a nonzero channel",
    )
  }
}

///|
/// Names use the specification spelling, for example "queue.declare" or "basic.get-ok".
pub fn Method::new(
  name : String,
  arguments : Array[Argument],
) -> Method raise FrameError {
  let spec = match method_spec_by_name(name) {
    Some(spec) => spec
    None => raise Invalid("unknown method name")
  }
  { class_id: spec.class_id, method_id: spec.method_id, arguments, }
}

///|
fn write_argument(
  w : WireWriter,
  kind : ArgumentKind,
  value : Argument,
) -> Unit raise FrameError {
  match (kind, value) {
    (OctetKind, Octet(n)) => w.uint(checked_int(n, 0, 255), 1)
    (ShortKind, Short(n)) => w.uint(checked_int(n, 0, 65535), 2)
    (LongKind, Long(n)) => w.uint(n.to_uint64(), 4)
    (LongLongKind, LongLong(n)) => w.uint(n, 8)
    (ShortStringKind, ShortString(s)) => w.shortstr(s)
    (LongStringKind, LongString(s)) => w.longstr(s)
    (TableKind, Table(t)) => write_table(w, t, 0)
    _ => raise Invalid("method argument type mismatch")
  }
}

///|
pub fn Method::encode(
  self : Method,
  channel : Int,
  max_size? : Int = 131072,
) -> Frame raise FrameError {
  method_channel(self.class_id, channel)
  let spec = match method_spec(self.class_id, self.method_id) {
    Some(spec) => spec
    None => raise Invalid("unknown class or method id")
  }
  if self.arguments.length() != spec.fields.length() {
    raise Invalid("method argument count mismatch")
  }
  let w = WireWriter::new()
  w.uint(self.class_id.to_uint64(), 2)
  w.uint(self.method_id.to_uint64(), 2)
  let mut bits = 0UL
  let mut used = 0
  for i, (_, kind) in spec.fields {
    if kind == BitKind {
      let bit = match self.arguments[i] {
        Bit(value) => value
        _ => raise Invalid("method argument type mismatch")
      }
      if bit {
        bits = bits | (1UL << used)
      }
      used += 1
      if used == 8 {
        w.uint(bits, 1)
        bits = 0UL
        used = 0
      }
    } else {
      if used > 0 {
        w.uint(bits, 1)
        bits = 0UL
        used = 0
      }
      write_argument(w, kind, self.arguments[i])
    }
  }
  if used > 0 {
    w.uint(bits, 1)
  }
  let frame : Frame = { kind: 1, channel, payload: Bytes::from_array(w.bytes), }
  if max_size < 8 || max_size > 16777216 {
    raise Invalid("invalid frame limit")
  }
  validate(frame, max_size)
  frame
}

///|
/// Decode exactly one known method, rejecting truncated and extra arguments.
/// Unused packed bit positions are ignored on input and zeroed on encoding.
pub fn Method::decode(frame : Frame) -> Method raise FrameError {
  validate(frame, 16777216)
  if frame.kind != 1 {
    raise Invalid("expected method frame")
  }
  let r = WireReader::new(frame.payload)
  let class_id = r.uint(2).to_int()
  let method_id = r.uint(2).to_int()
  method_channel(class_id, frame.channel)
  let spec = match method_spec(class_id, method_id) {
    Some(spec) => spec
    None => raise Invalid("unknown class or method id")
  }
  let arguments = []
  let mut bits = 0UL
  let mut used = 8
  for (_, kind) in spec.fields {
    if kind == BitKind {
      if used == 8 {
        bits = r.uint(1)
        used = 0
      }
      arguments.push(Bit((bits & (1UL << used)) != 0UL))
      used += 1
    } else {
      used = 8
      arguments.push(
        match kind {
          OctetKind => Octet(r.uint(1).to_int())
          ShortKind => Short(r.uint(2).to_int())
          LongKind => Long(r.uint(4).to_uint())
          LongLongKind => LongLong(r.uint(8))
          ShortStringKind => ShortString(r.shortstr())
          LongStringKind => LongString(r.longstr())
          TableKind => Table(read_table(r, 0))
          BitKind => raise Invalid("invalid bit field state")
        },
      )
    }
  }
  r.finish()
  { class_id, method_id, arguments, }
}
