///|
pub suberror FrameError {
  Invalid(String)
} derive(Debug)

///|
pub(all) struct Frame {
  kind : Int
  channel : Int
  payload : Bytes
} derive(Debug, Eq)

///|
pub fn protocol_header() -> Bytes {
  b"AMQP\x00\x00\x09\x01"
}

///|
fn validate(frame : Frame, max_size : Int) -> Unit raise FrameError {
  if frame.channel < 0 || frame.channel > 65535 {
    raise Invalid("invalid channel")
  }
  if frame.payload.length() > max_size - 8 {
    raise Invalid("frame exceeds limit")
  }
  match frame.kind {
    1 =>
      if frame.payload.length() < 4 {
        raise Invalid("method frame requires class and method")
      }
    2 =>
      if frame.channel == 0 || frame.payload.length() < 14 {
        raise Invalid("invalid content header")
      }
    3 => if frame.channel == 0 { raise Invalid("body on channel zero") }
    8 =>
      if frame.channel != 0 || frame.payload.length() != 0 {
        raise Invalid("invalid heartbeat")
      }
    _ => raise Invalid("unknown frame type")
  }
}

///|
pub fn Frame::encode(
  self : Frame,
  max_size? : Int = 131072,
) -> Bytes raise FrameError {
  if max_size < 8 || max_size > 16777216 {
    raise Invalid("invalid frame limit")
  }
  validate(self, max_size)
  let n = self.payload.length()
  let out : Array[Byte] = [
    self.kind.to_byte(),
    (self.channel >> 8).to_byte(),
    self.channel.to_byte(),
    (n >> 24).to_byte(),
    (n >> 16).to_byte(),
    (n >> 8).to_byte(),
    n.to_byte(),
  ]
  for b in self.payload {
    out.push(b)
  }
  out.push(206)
  Bytes::from_array(out)
}

///|
pub fn Frame::method_ids(self : Frame) -> (Int, Int)? {
  if self.kind != 1 || self.payload.length() < 4 {
    return None
  }
  Some(
    (
      self.payload[0].to_int() * 256 + self.payload[1].to_int(),
      self.payload[2].to_int() * 256 + self.payload[3].to_int(),
    ),
  )
}
