///|
pub fn session_publish_start(
  key : String,
  channel : Int,
  exchange : String,
  routing_key : String,
  body_size : String,
  properties : String,
  mandatory : Bool,
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
    let size : UInt64 = @json.from_json(body_size.to_json())
    let s = session(key)
    s.publish_start(
      channel,
      exchange,
      routing_key,
      size,
      properties=props,
      mandatory~,
    )
    result(s, [])
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}

///|
pub fn session_publish_body(
  key : String,
  channel : Int,
  input : String,
) -> String {
  try {
    let s = session(key)
    s.publish_body(channel, unhex(input, max_length=131072))
    result(s, [])
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}
