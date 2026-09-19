///|
priv struct StreamPending {
  command : Method
  metadata : Int
  mut remaining : UInt64?
}

///|
/// Validates streaming content without retaining body fragments.
priv struct StreamAssembler {
  pending : Map[Int, StreamPending]
  mut metadata : Int
}

///|
fn StreamAssembler::new() -> StreamAssembler {
  { pending: Map([]), metadata: 0, }
}

///|
fn StreamAssembler::discard(self : StreamAssembler, channel : Int) -> Unit {
  if self.pending.get(channel) is Some(p) {
    self.metadata -= p.metadata
    self.pending.remove(channel)
  }
}

///|
fn StreamAssembler::finish(self : StreamAssembler) -> Unit raise FrameError {
  if !self.pending.is_empty() {
    raise Invalid("incomplete streaming content")
  }
}

///|
fn StreamAssembler::push(
  self : StreamAssembler,
  frame : Frame,
  events : Array[SessionEvent],
) -> Unit raise FrameError {
  if frame.kind == 1 {
    if self.pending.contains(frame.channel) {
      raise Invalid("method interrupts incomplete content")
    }
    let command = Method::decode(frame)
    let spec = method_spec(command.class_id, command.method_id).unwrap()
    if spec.carries_content {
      if self.pending.length() >= 64 {
        raise Invalid("in-flight channel limit")
      }
      if frame.payload.length() > 16777216 - self.metadata {
        raise Invalid("buffered metadata limit")
      }
      self.metadata += frame.payload.length()
      self.pending[frame.channel] = {
        command,
        metadata: frame.payload.length(),
        remaining: None,
      }
    }
    return
  }
  let p = self.pending
    .get(frame.channel)
    .unwrap_or_else(() => {
      raise Invalid("content frame without preceding method")
    })
  if frame.kind == 2 {
    if p.remaining is Some(_) {
      raise Invalid("duplicate content header")
    }
    let header = BasicHeader::decode(frame)
    p.remaining = Some(header.body_size)
    events.push(MessageStart(frame.channel, p.command, header))
    if header.body_size == 0UL {
      self.discard(frame.channel)
      events.push(MessageEnd(frame.channel))
    }
  } else {
    let remaining = p.remaining.unwrap_or_else(() => {
      raise Invalid("body before content header")
    })
    if frame.payload.length() == 0 ||
      frame.payload.length().to_uint64() > remaining {
      raise Invalid("invalid streaming body length")
    }
    let left = remaining - frame.payload.length().to_uint64()
    p.remaining = Some(left)
    events.push(MessageData(frame.channel, frame.payload))
    if left == 0UL {
      self.discard(frame.channel)
      events.push(MessageEnd(frame.channel))
    }
  }
}

///|
fn Session::receive_content(
  self : Session,
  frame : Frame,
  events : Array[SessionEvent],
) -> Unit raise FrameError {
  if self.stream_bodies {
    self.stream_assembler.push(frame, events)
  } else if self.assembler.push(frame) is Some(content) {
    events.push(Message(content))
  }
}
