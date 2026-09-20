///|
pub fn session_open_auth(
  key : String,
  authentication : String,
  vhost : String,
  locale : String,
  channel_max : Int,
  frame_max : Int,
  heartbeat : Int,
) -> String {
  open_auth(
    key, authentication, vhost, locale, channel_max, frame_max, heartbeat, false,
  )
}

///|
pub fn session_open_stream_auth(
  key : String,
  authentication : String,
  vhost : String,
  locale : String,
  channel_max : Int,
  frame_max : Int,
  heartbeat : Int,
) -> String {
  open_auth(
    key, authentication, vhost, locale, channel_max, frame_max, heartbeat, true,
  )
}

///|
pub fn session_open_auth_properties(
  key : String,
  authentication : String,
  vhost : String,
  locale : String,
  channel_max : Int,
  frame_max : Int,
  heartbeat : Int,
  stream_bodies : Bool,
  properties : String,
) -> String {
  open_auth(
    key,
    authentication,
    vhost,
    locale,
    channel_max,
    frame_max,
    heartbeat,
    stream_bodies,
    properties~,
  )
}

///|
fn open_auth(
  key : String,
  authentication : String,
  vhost : String,
  locale : String,
  channel_max : Int,
  frame_max : Int,
  heartbeat : Int,
  stream_bodies : Bool,
  properties? : String = "{}",
) -> String {
  try {
    if key.length() > 128 ||
      sessions.contains(key) ||
      sessions.length() >= 64 ||
      authentication.length() > 4194304 ||
      properties.length() > 2097152 {
      raise Failure("session or authentication size limit")
    }
    let candidates = match @json.parse(authentication) {
      Array(values) =>
        values.map(value => {
          let o = obj(value)
          let mechanism = str(required(o, "mechanism"))
          match str(required(o, "kind")) {
            "plain" =>
              @lib.Authentication::plain(
                str(required(o, "username")),
                str(required(o, "password")),
              )
            "amqplain" =>
              @lib.Authentication::amqplain(
                str(required(o, "username")),
                str(required(o, "password")),
              )
            "external" => @lib.Authentication::external()
            "deferred" => @lib.Authentication::deferred(mechanism)
            _ => raise Failure("unknown authentication kind")
          }
        })
      _ => raise Failure("expected authentication array")
    }
    let s = @lib.Session::with_authentication(
      candidates,
      vhost~,
      locale~,
      channel_max~,
      frame_max~,
      heartbeat~,
      stream_bodies~,
      properties=parse_client_properties(properties),
    )
    sessions[key] = s
    result(s, [])
  } catch {
    // JSON diagnostics can echo credential input; keep this boundary redacted.
    _ => "ERROR: invalid authentication or connection options"
  }
}

///|
pub fn session_auth_response(key : String, response : String) -> String {
  try {
    let s = session(key)
    s.respond_authentication(unhex(response, max_length=2097152))
    result(s, [])
  } catch {
    _ => "ERROR: invalid or unexpected authentication response"
  }
}
