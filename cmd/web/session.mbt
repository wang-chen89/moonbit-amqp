///|
let sessions : Map[String, @lib.Session] = Map([])

///|
fn session(key : String) -> @lib.Session raise {
  sessions.get(key).unwrap_or_else(() => raise Failure("unknown session"))
}

///|
fn str(value : Json) -> String raise {
  match value {
    String(s) => s
    _ => raise Failure("expected string")
  }
}

///|
fn int(value : Json) -> Int raise {
  match value {
    Number(n, ..) if n >= -2147483648.0 &&
      n <= 2147483647.0 &&
      n == n.to_int().to_double() => n.to_int()
    _ => raise Failure("expected int32")
  }
}

///|
fn uint(value : Json) -> UInt raise {
  match value {
    Number(n, ..) if n >= 0.0 &&
      n <= 4294967295.0 &&
      n == n.to_uint().to_double() => n.to_uint()
    _ => raise Failure("expected uint32")
  }
}

///|
fn obj(value : Json) -> Map[String, Json] raise {
  match value {
    Object(o) => o
    _ => raise Failure("expected object")
  }
}

///|
fn required(o : Map[String, Json], key : String) -> Json raise {
  o.get(key).unwrap_or_else(() => raise Failure("missing field " + key))
}

///|
fn table_json(entries : Array[(String, @lib.FieldValue)]) -> Json {
  let out : Map[String, Json] = Map([])
  for (key, value) in entries {
    out[key] = field_json(value)
  }
  Json::object(out)
}

///|
fn field_json(v : @lib.FieldValue) -> Json {
  match v {
    Boolean(b) => b.to_json()
    Signed8(n) | Unsigned8(n) | Signed16(n) | Unsigned16(n) | Signed32(n) =>
      n.to_json()
    Unsigned32(n) => n.to_double().to_json()
    Signed64(n) => { "$type": "int64", "value": n.to_string().to_json() }
    Timestamp(n) => { "$type": "timestamp", "value": n.to_string().to_json() }
    Float32Bits(n) =>
      { "$type": "float32-bits", "value": n.to_double().to_json() }
    Float64Bits(n) =>
      { "$type": "float64-bits", "value": n.to_string().to_json() }
    Decimal(scale, n) =>
      { "$type": "decimal", "scale": scale.to_json(), "value": n.to_json() }
    LongString(b) => { "$type": "longstr", "hex": hex(b).to_json() }
    ByteArray(b) => { "$type": "bytes", "hex": hex(b).to_json() }
    ArrayValue(a) => a.map(field_json).to_json()
    TableValue(t) => table_json(t)
    Void => Json::null()
  }
}

///|
fn table_parse(
  value : Json,
  depth : Int,
) -> Array[(String, @lib.FieldValue)] raise {
  let out = []
  for k, v in obj(value) {
    out.push((k, field_parse(v, depth + 1)))
  }
  out
}

///|
fn field_parse(value : Json, depth : Int) -> @lib.FieldValue raise {
  if depth > 32 {
    raise Failure("table nesting limit")
  }
  match value {
    Null => Void
    True => Boolean(true)
    False => Boolean(false)
    String(s) => LongString(@utf8.encode(s))
    Number(_) => Signed32(int(value))
    Array(a) => ArrayValue(a.map(v => field_parse(v, depth + 1)))
    Object(o) =>
      match o.get("$type") {
        Some(String("int64")) => Signed64(@json.from_json(required(o, "value")))
        Some(String("timestamp")) =>
          Timestamp(@json.from_json(required(o, "value")))
        Some(String("float32-bits")) => Float32Bits(uint(required(o, "value")))
        Some(String("float64-bits")) =>
          Float64Bits(@json.from_json(required(o, "value")))
        Some(String("decimal")) =>
          Decimal(int(required(o, "scale")), int(required(o, "value")))
        Some(String("longstr")) =>
          LongString(unhex(str(required(o, "hex")), max_length=2097152))
        Some(String("bytes")) =>
          ByteArray(unhex(str(required(o, "hex")), max_length=2097152))
        Some(_) => raise Failure("unknown table type")
        None => TableValue(table_parse(value, depth))
      }
  }
}

///|
fn argument_json(a : @lib.Argument) -> Json {
  match a {
    Bit(b) => b.to_json()
    Octet(n) | Short(n) => n.to_json()
    Long(n) => n.to_double().to_json()
    LongLong(n) => n.to_string().to_json()
    ShortString(s) => s.to_json()
    LongString(b) => hex(b).to_json()
    Table(t) => table_json(t)
  }
}

///|
fn argument_parse(
  kind : @lib.ArgumentKind,
  value : Json,
) -> @lib.Argument raise {
  match kind {
    BitKind =>
      match value {
        True => Bit(true)
        False => Bit(false)
        _ => raise Failure("expected boolean")
      }
    OctetKind => Octet(int(value))
    ShortKind => Short(int(value))
    LongKind => Long(uint(value))
    LongLongKind => LongLong(@json.from_json(value))
    ShortStringKind => ShortString(str(value))
    LongStringKind => LongString(unhex(str(value), max_length=2097152))
    TableKind => Table(table_parse(value, 0))
  }
}

///|
fn method_json(channel : Int, command : @lib.Method) -> Json {
  let spec = @lib.method_spec(command.class_id, command.method_id).unwrap()
  let args : Map[String, Json] = Map([])
  for i, (key, _) in spec.fields {
    args[key] = argument_json(command.arguments[i])
  }
  {
    "type": "method",
    "channel": channel.to_json(),
    "name": spec.name.to_json(),
    "args": Json::object(args),
  }
}

///|
fn event_json(e : @lib.SessionEvent) -> Json raise {
  match e {
    Ready => { "type": "ready" }
    AuthenticationRequested(index, mechanism) =>
      {
        "type": "authenticate",
        "index": index.to_json(),
        "mechanism": mechanism.to_json(),
      }
    Received(ch, command) => method_json(ch, command)
    MessageStart(ch, command, header) => {
      let o = obj(method_json(ch, command))
      o["type"] = "messageStart"
      o["bodySize"] = header.body_size.to_string().to_json()
      let props : Map[String, Json] = Map([])
      for (k, v) in header.properties {
        props[k] = argument_json(v)
      }
      o["properties"] = Json::object(props)
      Json::object(o)
    }
    MessageData(ch, data) =>
      {
        "type": "messageData",
        "channel": ch.to_json(),
        "bodyHex": hex(data).to_json(),
      }
    MessageEnd(ch) => { "type": "messageEnd", "channel": ch.to_json() }
    ChannelClosed(ch, code, reason) =>
      {
        "type": "channelClosed",
        "channel": ch.to_json(),
        "code": code.to_json(),
        "reason": reason.to_json(),
      }
    Closed(code, reason) =>
      { "type": "closed", "code": code.to_json(), "reason": reason.to_json() }
    Message(c) => {
      let o = obj(
        method_json(
          c.channel,
          @lib.Method::decode({
            kind: 1,
            channel: c.channel,
            payload: c.method_payload,
          }),
        ),
      )
      o["type"] = "message"
      o["bodyHex"] = hex(c.body).to_json()
      let props : Map[String, Json] = Map([])
      for (k, v) in c.basic_header().properties {
        props[k] = argument_json(v)
      }
      o["properties"] = Json::object(props)
      Json::object(o)
    }
  }
}

///|
fn result(s : @lib.Session, events : Array[@lib.SessionEvent]) -> String raise {
  let (channels, frame, heartbeat) = s.limits()
  (
    {
      "state": s.status().to_json(),
      "authenticationMechanism": s.authentication_mechanism().to_json(),
      "channelMax": channels.to_json(),
      "frameMax": frame.to_json(),
      "heartbeat": heartbeat.to_json(),
      "output": s.take_output().map(hex).to_json(),
      "events": events.map(event_json).to_json(),
    } : Json).stringify()
}

///|
pub fn session_open(
  key : String,
  user : String,
  password : String,
  vhost : String,
  channel_max : Int,
  frame_max : Int,
  heartbeat : Int,
) -> String {
  try {
    if key.length() > 128 || sessions.contains(key) || sessions.length() >= 64 {
      raise Failure("session limit or duplicate")
    }
    let s = @lib.Session::new(
      user,
      password,
      vhost~,
      channel_max~,
      frame_max~,
      heartbeat~,
    )
    sessions[key] = s
    result(s, [])
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}

///|
pub fn session_drop(key : String) -> Unit {
  sessions.remove(key)
}

///|
pub fn session_feed(key : String, input : String) -> String {
  try {
    let s = session(key)
    result(s, s.feed(unhex(input, max_length=2097152)))
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}

///|
pub fn session_send(
  key : String,
  channel : Int,
  name : String,
  arguments : String,
) -> String {
  try {
    if arguments.length() > 2097152 {
      raise Failure("argument size limit")
    }
    let spec = @lib.method_spec_by_name(name).unwrap_or_else(() => {
      raise Failure("unknown method")
    })
    let values = match @json.parse(arguments) {
      Array(a) => a
      _ => raise Failure("expected array")
    }
    if values.length() != spec.fields.length() {
      raise Failure("argument count")
    }
    let args = []
    for i, (_, kind) in spec.fields {
      args.push(argument_parse(kind, values[i]))
    }
    let s = session(key)
    s.send(channel, @lib.Method::new(name, args))
    result(s, [])
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}

///|
pub fn session_publish(
  key : String,
  channel : Int,
  exchange : String,
  routing_key : String,
  body : String,
  properties : String,
  mandatory : Bool,
) -> String {
  session_publish_flags(
    key, channel, exchange, routing_key, body, properties, mandatory, false,
  )
}

///|
pub fn session_publish_flags(
  key : String,
  channel : Int,
  exchange : String,
  routing_key : String,
  body : String,
  properties : String,
  mandatory : Bool,
  immediate : Bool,
) -> String {
  try {
    if properties.length() > 2097152 {
      raise Failure("property size limit")
    }
    let props = []
    for k, v in obj(@json.parse(properties)) {
      let kind = @lib.basic_property_spec()
        .iter()
        .find_first(pair => pair.0 == k)
        .unwrap_or_else(() => raise Failure("unknown property")).1
      props.push((k, argument_parse(kind, v)))
    }
    let s = session(key)
    s.publish(
      channel,
      exchange,
      routing_key,
      unhex(body, max_length=2097152),
      properties=props,
      mandatory~,
      immediate~,
    )
    result(s, [])
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}

///|
pub fn session_heartbeat(key : String) -> String {
  hex(session(key).heartbeat()) catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}

///|
pub fn session_finish(key : String) -> String {
  try {
    session(key).finish()
    ""
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}
