///|
pub struct Content {
  channel : Int
  method_payload : Bytes
  header : Bytes
  body : Bytes
} derive(Debug, Eq)

///|
priv struct Pending {
  method_payload : Bytes
  mut header : Bytes?
  mut expected : Int
  body : Array[Byte]
}

///|
/// Content assembly for AMQP Basic.Publish/Return/Deliver/Get-Ok.
/// Non-content methods and heartbeats produce no Content; callers retain those frames.
pub struct Assembler {
  priv pending : Map[Int, Pending]
  priv max_body : Int
  priv mut buffered : Int
  priv mut failed : Bool
}

///|
pub fn Assembler::new(max_body? : Int = 8388608) -> Assembler raise FrameError {
  if max_body < 0 || max_body > 16777216 {
    raise Invalid("invalid body limit")
  }
  { pending: Map([]), max_body, buffered: 0, failed: false, }
}

///|
/// Errors poison the assembler. Limits: 64 in-flight channels and max_body total buffered bytes.
pub fn Assembler::push(
  self : Assembler,
  frame : Frame,
) -> Content? raise FrameError {
  if self.failed {
    raise Invalid("assembler is poisoned")
  }
  errdefer {
    self.failed = true
  }
  validate(frame, 16777216)
  if frame.kind == 8 {
    return None
  }
  if frame.kind == 1 {
    if self.pending.contains(frame.channel) {
      raise Invalid("method interrupts incomplete content")
    }
    let ids = frame.method_ids().unwrap()
    if ids.0 == 60 && (ids.1 == 40 || ids.1 == 50 || ids.1 == 60 || ids.1 == 71) {
      if frame.channel == 0 {
        raise Invalid("content method on channel zero")
      }
      if self.pending.length() >= 64 {
        raise Invalid("in-flight channel limit")
      }
      self.pending[frame.channel] = {
        method_payload: frame.payload,
        header: None,
        expected: 0,
        body: [],
      }
    }
    return None
  }
  let state = match self.pending.get(frame.channel) {
    Some(state) => state
    None => raise Invalid("content frame without preceding method")
  }
  if frame.kind == 2 {
    if state.header is Some(_) {
      raise Invalid("duplicate content header")
    }
    let bytes = frame.payload
    if bytes[0] != 0 || bytes[1] != 60 || bytes[2] != 0 || bytes[3] != 0 {
      raise Invalid("expected Basic class header with weight zero")
    }
    let mut size = 0UL
    for i in 4..<12 {
      size = (size << 8) | bytes[i].to_uint64()
    }
    if size > self.max_body.to_uint64() {
      raise Invalid("declared body exceeds limit")
    }
    state.expected = size.to_int()
    state.header = Some(bytes)
    if state.expected == 0 {
      self.pending.remove(frame.channel)
      return Some({
        channel: frame.channel,
        method_payload: state.method_payload,
        header: bytes,
        body: b"",
      })
    }
    return None
  }
  let header = match state.header {
    Some(header) => header
    None => raise Invalid("body before content header")
  }
  if frame.payload.length() == 0 {
    raise Invalid("empty body fragment")
  }
  if state.body.length() + frame.payload.length() > state.expected {
    raise Invalid("body exceeds declared length")
  }
  if self.buffered + frame.payload.length() > self.max_body {
    raise Invalid("total buffered body limit")
  }
  for b in frame.payload {
    state.body.push(b)
  }
  self.buffered += frame.payload.length()
  if state.body.length() == state.expected {
    let body = Bytes::from_array(state.body)
    self.buffered -= body.length()
    self.pending.remove(frame.channel)
    Some({
      channel: frame.channel,
      method_payload: state.method_payload,
      header,
      body,
    })
  } else {
    None
  }
}

///|
pub fn Assembler::finish(self : Assembler) -> Unit raise FrameError {
  if self.failed || !self.pending.is_empty() {
    raise Invalid("incomplete or failed content stream")
  }
}
