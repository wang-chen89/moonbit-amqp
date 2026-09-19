///|
/// Start a publication without retaining its body. All metadata is validated
/// before output is exposed. Hosts must serialize content on each channel.
pub fn Session::publish_start(
  self : Session,
  channel : Int,
  exchange : String,
  routing_key : String,
  body_size : UInt64,
  properties? : Array[(String, Argument)] = [],
  mandatory? : Bool = false,
  immediate? : Bool = false,
) -> Unit raise FrameError {
  if self.state != "ready" ||
    self.channels.get(channel) != Some("open") ||
    self.blocked ||
    self.paused.get(channel) == Some(true) {
    raise Invalid("publishing is unavailable or blocked")
  }
  if self.sending.contains(channel) {
    raise Invalid("publication already in progress on channel")
  }
  let command = Method::new("basic.publish", [
    Short(0),
    ShortString(exchange),
    ShortString(routing_key),
    Bit(mandatory),
    Bit(immediate),
  ])
  let first = command
    .encode(channel, max_size=self.frame_limit)
    .encode(max_size=self.frame_limit)
  let header : BasicHeader = { body_size, properties, }
  let second = header
    .encode(channel, max_size=self.frame_limit)
    .encode(max_size=self.frame_limit)
  if body_size > 0UL {
    self.sending[channel] = body_size
  }
  self.output.push(first)
  self.output.push(second)
}

///|
/// One bounded body frame. Invalid fragments do not consume the remaining size.
pub fn Session::publish_body(
  self : Session,
  channel : Int,
  data : Bytes,
) -> Unit raise FrameError {
  if self.state != "ready" || self.channels.get(channel) != Some("open") {
    raise Invalid("publication channel is unavailable")
  }
  let remaining = self.sending
    .get(channel)
    .unwrap_or_else(() => raise Invalid("no outgoing content on channel"))
  if data.length() == 0 || data.length().to_uint64() > remaining {
    raise Invalid("invalid outgoing body length")
  }
  let wire = ({ kind: 3, channel, payload: data, } : Frame).encode(
    max_size=self.frame_limit,
  )
  let left = remaining - data.length().to_uint64()
  if left == 0UL {
    self.sending.remove(channel)
  } else {
    self.sending[channel] = left
  }
  self.output.push(wire)
}
