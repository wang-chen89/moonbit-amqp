///|
priv struct WireWriter {
  bytes : Array[Byte]
  mut nodes : Int
}

///|
fn WireWriter::new() -> WireWriter {
  { bytes: [], nodes: 0, }
}

///|
fn WireWriter::uint(
  self : WireWriter,
  value : UInt64,
  width : Int,
) -> Unit raise FrameError {
  if self.bytes.length() > 16777208 - width {
    raise Invalid("payload byte limit")
  }
  for i = width - 1; i >= 0; i = i - 1 {
    self.bytes.push((value >> (i * 8)).to_byte())
  }
}

///|
fn WireWriter::raw(self : WireWriter, data : Bytes) -> Unit raise FrameError {
  if data.length() > 16777208 - self.bytes.length() {
    raise Invalid("payload byte limit")
  }
  for byte in data {
    self.bytes.push(byte)
  }
}

///|
fn WireWriter::shortstr(
  self : WireWriter,
  text : String,
) -> Unit raise FrameError {
  if text.length() > 255 {
    raise Invalid("shortstr exceeds 255 UTF-8 bytes")
  }
  let bytes = @utf8.encode(text)
  if bytes.length() > 255 {
    raise Invalid("shortstr exceeds 255 UTF-8 bytes")
  }
  self.uint(bytes.length().to_uint64(), 1)
  self.raw(bytes)
}

///|
fn WireWriter::longstr(
  self : WireWriter,
  bytes : Bytes,
) -> Unit raise FrameError {
  self.uint(bytes.length().to_uint64(), 4)
  self.raw(bytes)
}

///|
fn WireWriter::patch_size(self : WireWriter, start : Int) -> Unit {
  let length = self.bytes.length() - start - 4
  for i in 0..<4 {
    self.bytes[start + i] = (length >> ((3 - i) * 8)).to_byte()
  }
}

///|
fn WireWriter::node(self : WireWriter, depth : Int) -> Unit raise FrameError {
  self.nodes += 1
  if depth > 32 || self.nodes > 65536 {
    raise Invalid("field nesting or element limit")
  }
}

///|
priv struct WireReader {
  bytes : Bytes
  mut pos : Int
  mut end : Int
  mut nodes : Int
}

///|
fn WireReader::new(bytes : Bytes) -> WireReader raise FrameError {
  if bytes.length() > 16777208 {
    raise Invalid("payload byte limit")
  }
  { bytes, pos: 0, end: bytes.length(), nodes: 0, }
}

///|
fn WireReader::uint(self : WireReader, width : Int) -> UInt64 raise FrameError {
  if width > self.end - self.pos {
    raise Invalid("truncated field")
  }
  let mut value = 0UL
  for _ in 0..<width {
    value = (value << 8) | self.bytes[self.pos].to_uint64()
    self.pos += 1
  }
  value
}

///|
fn WireReader::raw(self : WireReader, size : UInt64) -> Bytes raise FrameError {
  if size > (self.end - self.pos).to_uint64() {
    raise Invalid("truncated string or container")
  }
  let start = self.pos
  self.pos += size.to_int()
  self.bytes[start:self.pos].to_owned()
}

///|
fn WireReader::shortstr(self : WireReader) -> String raise FrameError {
  let data = self.raw(self.uint(1))
  @utf8.decode(data, ignore_bom=false) catch {
    _ => raise Invalid("invalid UTF-8 shortstr")
  }
}

///|
fn WireReader::longstr(self : WireReader) -> Bytes raise FrameError {
  self.raw(self.uint(4))
}

///|
fn WireReader::container_end(self : WireReader) -> Int raise FrameError {
  let size = self.uint(4)
  if size > (self.end - self.pos).to_uint64() {
    raise Invalid("container length exceeds parent")
  }
  self.pos + size.to_int()
}

///|
fn WireReader::node(self : WireReader, depth : Int) -> Unit raise FrameError {
  self.nodes += 1
  if depth > 32 || self.nodes > 65536 {
    raise Invalid("field nesting or element limit")
  }
}

///|
fn WireReader::finish(self : WireReader) -> Unit raise FrameError {
  if self.pos != self.end {
    raise Invalid("trailing payload bytes")
  }
}
