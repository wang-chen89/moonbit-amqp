///|
/// Property names use XML spelling; absent properties differ from present empty/zero values.
pub(all) struct BasicHeader {
  body_size : UInt64
  properties : Array[(String, Argument)]
} derive(Debug, Eq)

///|
pub fn basic_property_spec() -> Array[(String, ArgumentKind)] {
  [
    ("content-type", ShortStringKind),
    ("content-encoding", ShortStringKind),
    ("headers", TableKind),
    ("delivery-mode", OctetKind),
    ("priority", OctetKind),
    ("correlation-id", ShortStringKind),
    ("reply-to", ShortStringKind),
    ("expiration", ShortStringKind),
    ("message-id", ShortStringKind),
    ("timestamp", LongLongKind),
    ("type", ShortStringKind),
    ("user-id", ShortStringKind),
    ("app-id", ShortStringKind),
    ("cluster-id", ShortStringKind),
  ]
}

///|
pub fn BasicHeader::encode(
  self : BasicHeader,
  channel : Int,
  max_size? : Int = 131072,
) -> Frame raise FrameError {
  if channel < 1 || channel > 65535 || max_size < 8 || max_size > 16777216 {
    raise Invalid("invalid content header channel or frame limit")
  }
  let spec = basic_property_spec()
  if self.properties.length() > spec.length() {
    raise Invalid("too many Basic properties")
  }
  let values : Map[String, Argument] = Map([])
  for (key, value) in self.properties {
    if values.contains(key) || !spec.any(item => item.0 == key) {
      raise Invalid("unknown or duplicate Basic property")
    }
    values[key] = value
  }
  let mut flags = 0UL
  for i, (key, _) in spec {
    if values.contains(key) {
      flags = flags | (1UL << (15 - i))
    }
  }
  let w = WireWriter::new()
  w.uint(60UL, 2)
  w.uint(0UL, 2)
  w.uint(self.body_size, 8)
  w.uint(flags, 2)
  for (key, kind) in spec {
    if values.get(key) is Some(value) {
      write_argument(w, kind, value)
    }
  }
  let frame : Frame = { kind: 2, channel, payload: Bytes::from_array(w.bytes), }
  validate(frame, max_size)
  frame
}

///|
pub fn BasicHeader::decode(frame : Frame) -> BasicHeader raise FrameError {
  validate(frame, 16777216)
  if frame.kind != 2 {
    raise Invalid("expected content header frame")
  }
  let r = WireReader::new(frame.payload)
  if r.uint(2) != 60UL || r.uint(2) != 0UL {
    raise Invalid("expected Basic class header with weight zero")
  }
  let body_size = r.uint(8)
  let flags = r.uint(2)
  if (flags & 3UL) != 0UL {
    raise Invalid("unsupported Basic property flag or continuation")
  }
  let properties = []
  for i, (key, kind) in basic_property_spec() {
    if (flags & (1UL << (15 - i))) != 0UL {
      let value = match kind {
        ShortStringKind => ShortString(r.shortstr())
        OctetKind => Octet(r.uint(1).to_int())
        LongLongKind => LongLong(r.uint(8))
        TableKind => Table(read_table(r, 0))
        _ => raise Invalid("unsupported Basic property kind")
      }
      properties.push((key, value))
    }
  }
  r.finish()
  { body_size, properties, }
}

///|
/// Build method/header/body frames together, with the negotiated frame envelope limit.
/// Bodies use the existing bounded body_frames helper (up to 1 MiB).
pub fn content_frames(
  command : Method,
  channel : Int,
  properties : Array[(String, Argument)],
  body : Bytes,
  max_frame_size? : Int = 131072,
) -> Array[Frame] raise FrameError {
  let spec = match method_spec(command.class_id, command.method_id) {
    Some(spec) => spec
    None => raise Invalid("unknown content method")
  }
  if !spec.carries_content {
    raise Invalid("method does not carry content")
  }
  let first = command.encode(channel, max_size=max_frame_size)
  let header : BasicHeader = {
    body_size: body.length().to_uint64(),
    properties,
  }
  let frames = [first, header.encode(channel, max_size=max_frame_size)]
  for frame in body_frames(channel, body, max_frame_size) {
    frames.push(frame)
  }
  frames
}

///|
pub fn Content::basic_header(self : Content) -> BasicHeader raise FrameError {
  BasicHeader::decode({ kind: 2, channel: self.channel, payload: self.header, })
}
