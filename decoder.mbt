///|
pub struct Decoder {
  priv buffer : Array[Byte]
  priv limit : Int
  priv mut expected : Int
  priv mut poisoned : Bool
} derive(Debug)

///|
pub fn Decoder::new(max_size? : Int = 131072) -> Decoder raise FrameError {
  if max_size < 8 || max_size > 16777216 {
    raise Invalid("invalid frame limit")
  }
  { buffer: [], limit: max_size, expected: 7, poisoned: false, }
}

///|
fn Decoder::consume(
  self : Decoder,
  input : Bytes,
) -> Array[Frame] raise FrameError {
  let frames = []
  for byte in input {
    self.buffer.push(byte)
    if self.buffer.length() == 7 {
      let b = self.buffer
      let n = b[3].to_int64() * 16777216L +
        b[4].to_int64() * 65536L +
        b[5].to_int64() * 256L +
        b[6].to_int64()
      if n > (self.limit - 8).to_int64() {
        raise Invalid("declared frame exceeds limit")
      }
      self.expected = n.to_int() + 8
    }
    if self.buffer.length() == self.expected && self.expected >= 8 {
      if byte != 206 {
        raise Invalid("invalid frame terminator")
      }
      let b = self.buffer
      let payload = []
      for i in 7..<(b.length() - 1) {
        payload.push(b[i])
      }
      let frame : Frame = {
        kind: b[0].to_int(),
        channel: b[1].to_int() * 256 + b[2].to_int(),
        payload: Bytes::from_array(payload),
      }
      validate(frame, self.limit)
      frames.push(frame)
      self.buffer.clear()
      self.expected = 7
    }
  }
  frames
}

///|
/// A malformed stream poisons the decoder. Frames from the failing feed call are discarded.
pub fn Decoder::feed(
  self : Decoder,
  input : Bytes,
) -> Array[Frame] raise FrameError {
  if self.poisoned {
    raise Invalid("decoder is poisoned")
  }
  errdefer {
    self.poisoned = true
  }
  self.consume(input)
}

///|
pub fn Decoder::finish(self : Decoder) -> Unit raise FrameError {
  if self.poisoned || !self.buffer.is_empty() {
    raise Invalid("incomplete or invalid stream")
  }
}
