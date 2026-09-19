///|
pub(all) enum SessionEvent {
  Ready
  AuthenticationRequested(Int, String)
  Received(Int, Method)
  Message(Content)
  MessageStart(Int, Method, BasicHeader)
  MessageData(Int, Bytes)
  MessageEnd(Int)
  ChannelClosed(Int, Int, String)
  Closed(Int, String)
} derive(Debug, Eq)

///|
/// Transport-independent client. The host owns timers, sockets and RPC scheduling.
pub struct Session {
  priv decoder : Decoder
  priv assembler : Assembler
  priv stream_assembler : StreamAssembler
  priv stream_bodies : Bool
  priv mut state : String
  priv auth : Array[Authentication]
  priv mut selected_auth : String
  priv locale : String
  priv vhost : String
  priv mut channel_limit : Int
  priv mut frame_limit : Int
  priv mut heartbeat_seconds : Int
  priv channels : Map[Int, String]
  priv paused : Map[Int, Bool]
  priv mut blocked : Bool
  priv mut secret_update : Bool
  priv sending : Map[Int, UInt64]
  priv output : Array[Bytes]
}

///|
pub fn Session::new(
  username : String,
  password : String,
  vhost? : String = "/",
  channel_max? : Int = 64,
  frame_max? : Int = 131072,
  heartbeat? : Int = 60,
  stream_bodies? : Bool = false,
) -> Session raise FrameError {
  Session::with_authentication(
    [Authentication::plain(username, password)],
    vhost~,
    channel_max~,
    frame_max~,
    heartbeat~,
    stream_bodies~,
  )
}

///|
/// Candidates are considered in client order. No shared candidate fails closed.
pub fn Session::with_authentication(
  authentication : Array[Authentication],
  vhost? : String = "/",
  locale? : String = "en_US",
  channel_max? : Int = 64,
  frame_max? : Int = 131072,
  heartbeat? : Int = 60,
  stream_bodies? : Bool = false,
) -> Session raise FrameError {
  if authentication.is_empty() ||
    authentication.length() > 32 ||
    locale.is_empty() ||
    @utf8.encode(locale).length() > 255 ||
    locale.contains(" ") {
    raise Invalid("invalid authentication candidates or locale")
  }
  if channel_max < 1 ||
    channel_max > 65535 ||
    frame_max < 4096 ||
    frame_max > 16777216 ||
    heartbeat < 0 ||
    heartbeat > 65535 ||
    @utf8.encode(vhost).length() > 255 {
    raise Invalid("invalid connection options")
  }
  {
    decoder: Decoder::new(),
    assembler: Assembler::new(strict_methods=true),
    stream_assembler: StreamAssembler::new(),
    stream_bodies,
    state: "start",
    auth: authentication.copy(),
    selected_auth: "",
    locale,
    vhost,
    channel_limit: channel_max,
    frame_limit: frame_max,
    heartbeat_seconds: heartbeat,
    channels: Map([]),
    paused: Map([]),
    blocked: false,
    secret_update: false,
    sending: Map([]),
    output: [protocol_header()],
  }
}

///|
pub fn Session::status(self : Session) -> String {
  self.state
}

///|
fn Session::closed(self : Session) -> Unit {
  for channel, _ in self.channels {
    self.assembler.discard(channel)
    self.stream_assembler.discard(channel)
  }
  self.channels.clear()
  self.paused.clear()
  self.auth.clear()
  self.secret_update = false
  self.sending.clear()
  self.state = "closed"
}

///|
pub fn Session::limits(self : Session) -> (Int, Int, Int) {
  (self.channel_limit, self.frame_limit, self.heartbeat_seconds)
}

///|
pub fn Session::take_output(self : Session) -> Array[Bytes] {
  let out = self.output.copy()
  self.output.clear()
  out
}

///|
fn Session::emit(
  self : Session,
  name : String,
  args : Array[Argument],
  channel : Int,
) -> Unit raise FrameError {
  self.output.push(
    Method::new(name, args)
    .encode(channel, max_size=self.frame_limit)
    .encode(max_size=self.frame_limit),
  )
}

///|
pub fn Session::send(
  self : Session,
  channel : Int,
  command : Method,
) -> Unit raise FrameError {
  if self.sending.contains(channel) {
    raise Invalid("method interrupts outgoing content")
  }
  if self.state != "ready" {
    raise Invalid("connection is not ready")
  }
  let spec = match method_spec(command.class_id, command.method_id) {
    Some(spec) => spec
    None => raise Invalid("unknown command")
  }
  let name = spec.name
  if ![
      "connection.close", "connection.update-secret", "channel.open", "channel.close",
      "exchange.declare", "exchange.delete", "exchange.bind", "exchange.unbind",
      "queue.declare", "queue.bind", "queue.unbind", "queue.delete", "queue.purge",
      "basic.qos", "basic.consume", "basic.cancel", "basic.cancel-ok", "basic.get",
      "basic.ack", "basic.reject", "basic.nack", "basic.recover", "basic.recover-async",
      "tx.select", "tx.commit", "tx.rollback", "confirm.select",
    ].contains(name) {
    raise Invalid("unsupported client command")
  }
  let wire = command
    .encode(channel, max_size=self.frame_limit)
    .encode(max_size=self.frame_limit)
  if name == "connection.close" {
    self.state = "closing"
  } else if name == "connection.update-secret" {
    if self.secret_update {
      raise Invalid("credential update is already pending")
    }
    self.secret_update = true
  } else if channel < 1 || channel > self.channel_limit {
    raise Invalid("invalid or unavailable channel")
  } else if name == "channel.open" {
    if self.channels.contains(channel) {
      raise Invalid("channel already allocated")
    }
    self.channels[channel] = "opening"
  } else {
    if self.channels.get(channel) != Some("open") {
      raise Invalid("channel is not open")
    }
    if spec.carries_content {
      raise Invalid("use publish for content")
    }
    if name == "channel.close" {
      self.channels[channel] = "closing"
    }
  }
  self.output.push(wire)
}

///|
pub fn Session::publish(
  self : Session,
  channel : Int,
  exchange : String,
  routing_key : String,
  body : Bytes,
  properties? : Array[(String, Argument)] = [],
  mandatory? : Bool = false,
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
  let frames = content_frames(
    Method::new("basic.publish", [
      Short(0),
      ShortString(exchange),
      ShortString(routing_key),
      Bit(mandatory),
      Bit(false),
    ]),
    channel,
    properties,
    body,
    max_frame_size=self.frame_limit,
  )
  // Validate the entire message before exposing any bytes to the transport.
  let data = frames.map(f => f.encode(max_size=self.frame_limit))
  for bytes in data {
    self.output.push(bytes)
  }
}

///|
pub fn Session::heartbeat(self : Session) -> Bytes raise FrameError {
  if self.state != "ready" && self.state != "open" {
    raise Invalid("connection is not active")
  }
  ({ kind: 8, channel: 0, payload: b"", } : Frame).encode()
}

///|
pub fn Session::finish(self : Session) -> Unit raise FrameError {
  defer self.auth.clear()
  errdefer {
    self.state = "failed"
    self.output.clear()
  }
  self.decoder.finish()
  self.assembler.finish()
  self.stream_assembler.finish()
  if self.state != "closed" {
    self.state = "failed"
    raise Invalid("connection ended without close handshake")
  }
}

///|
pub fn Session::feed(
  self : Session,
  input : Bytes,
) -> Array[SessionEvent] raise FrameError {
  if self.state == "failed" || self.state == "closed" {
    raise Invalid("session is closed")
  }
  errdefer {
    self.state = "failed"
    self.auth.clear()
    self.output.clear()
  }
  let events = []
  for frame in self.decoder.feed(input) {
    if self.state == "closed" {
      break
    }
    if self.state != "start" && self.state != "tune" {
      validate(frame, self.frame_limit)
    }
    if frame.kind == 8 {
      continue
    }
    if frame.kind != 1 {
      if self.state == "closing" ||
        self.channels.get(frame.channel) == Some("closing") {
        continue
      }
      if self.state != "ready" ||
        self.channels.get(frame.channel) != Some("open") {
        raise Invalid("content on inactive channel")
      }
      self.receive_content(frame, events)
      continue
    }
    let command = Method::decode(frame)
    let name = method_spec(command.class_id, command.method_id).unwrap().name
    let args = command.arguments
    if name == "connection.close" {
      self.emit("connection.close-ok", [], 0)
      self.closed()
      if args is [Short(code), ShortString(reason), ..] {
        events.push(Closed(code, reason))
      }
      continue
    }
    if self.state == "closing" {
      if name == "connection.close-ok" {
        self.closed()
        events.push(Closed(200, "normal close"))
      }
      continue
    }
    match self.state {
      "start" => {
        if name != "connection.start" {
          raise Invalid("expected connection.start")
        }
        if args
          is [
            Octet(0),
            Octet(9),
            Table(_),
            LongString(mechanisms),
            LongString(locales),
          ] {
          let offered = @utf8.decode_lossy(mechanisms).split(" ").to_array()
          let has_locale = @utf8.decode_lossy(locales)
            .split(" ")
            .any(s => s == self.locale)
          if !has_locale {
            raise Invalid("requested locale is unavailable")
          }
          let mut selected = None
          for i, candidate in self.auth {
            if offered.contains(candidate.mechanism) {
              selected = Some((i, candidate))
              break
            }
          }
          let (index, candidate) = selected.unwrap_or_else(() => {
            raise Invalid("no shared SASL mechanism")
          })
          self.selected_auth = candidate.mechanism
          self.auth.clear()
          match candidate.response {
            Some(response) => self.auth_response(response)
            None => {
              self.state = "authenticate"
              events.push(AuthenticationRequested(index, candidate.mechanism))
            }
          }
        } else {
          raise Invalid("unsupported protocol version")
        }
      }
      "tune" => {
        if name != "connection.tune" {
          raise Invalid(
            "expected connection.tune; additional SASL challenge unsupported",
          )
        }
        if args is [Short(channels), Long(frame_max), Short(heartbeat)] {
          if frame_max != 0 && frame_max < 4096 {
            raise Invalid("server frame limit below minimum")
          }
          if channels != 0 && channels < self.channel_limit {
            self.channel_limit = channels
          }
          if frame_max != 0 &&
            frame_max < self.frame_limit.reinterpret_as_uint() {
            self.frame_limit = frame_max.reinterpret_as_int()
          }
          self.heartbeat_seconds = if heartbeat == 0 ||
            self.heartbeat_seconds == 0 {
            if heartbeat > self.heartbeat_seconds {
              heartbeat
            } else {
              self.heartbeat_seconds
            }
          } else if heartbeat < self.heartbeat_seconds {
            heartbeat
          } else {
            self.heartbeat_seconds
          }
          self.decoder.set_limit(self.frame_limit)
          self.emit(
            "connection.tune-ok",
            [
              Short(self.channel_limit),
              Long(self.frame_limit.reinterpret_as_uint()),
              Short(self.heartbeat_seconds),
            ],
            0,
          )
          self.emit(
            "connection.open",
            [ShortString(self.vhost), ShortString(""), Bit(false)],
            0,
          )
          self.state = "open"
        }
      }
      "open" => {
        if name != "connection.open-ok" {
          raise Invalid("expected connection.open-ok")
        }
        self.state = "ready"
        events.push(Ready)
      }
      "ready" => {
        if frame.channel == 0 {
          if name == "connection.blocked" {
            self.blocked = true
          } else if name == "connection.unblocked" {
            self.blocked = false
          } else if name == "connection.update-secret-ok" && self.secret_update {
            self.secret_update = false
          } else {
            raise Invalid("unexpected connection method")
          }
          events.push(Received(0, command))
          continue
        }
        if !self.channels.contains(frame.channel) {
          raise Invalid("method on unknown channel")
        }
        if name == "channel.close" {
          self.emit("channel.close-ok", [], frame.channel)
          self.assembler.discard(frame.channel)
          self.stream_assembler.discard(frame.channel)
          self.channels.remove(frame.channel)
          self.sending.remove(frame.channel)
          self.paused.remove(frame.channel)
          if args is [Short(code), ShortString(reason), ..] {
            events.push(ChannelClosed(frame.channel, code, reason))
          }
          continue
        }
        match self.channels.get(frame.channel) {
          Some("opening") => {
            if name != "channel.open-ok" {
              raise Invalid("expected channel.open-ok")
            }
            self.channels[frame.channel] = "open"
          }
          Some("closing") => {
            if name == "channel.close-ok" {
              self.assembler.discard(frame.channel)
              self.stream_assembler.discard(frame.channel)
              self.channels.remove(frame.channel)
              self.sending.remove(frame.channel)
              self.paused.remove(frame.channel)
              events.push(ChannelClosed(frame.channel, 200, "normal close"))
            }
            continue
          }
          _ => ()
        }
        if name == "channel.flow" && args is [Bit(active)] {
          self.paused[frame.channel] = !active
          self.emit("channel.flow-ok", [Bit(active)], frame.channel)
        }
        self.receive_content(frame, events)
        if !method_spec(command.class_id, command.method_id).unwrap().carries_content {
          events.push(Received(frame.channel, command))
        }
      }
      _ => raise Invalid("invalid session state")
    }
  }
  events
}
