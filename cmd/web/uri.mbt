///|
/// Structured URI data contains credentials. The host must not log this result.
pub fn uri_parse(input : String) -> String {
  try {
    let uri = @lib.parse_uri(input)
    let heartbeat : Json = match uri.heartbeat_seconds {
      Some(value) => value.to_string().to_json()
      None => Json::null()
    }
    let ns : Json = match uri.heartbeat_seconds {
      Some(value) => (value * 1000000000L).to_string().to_json()
      None => Json::null()
    }
    (
      {
        "ok": true,
        "scheme": uri.scheme.to_json(),
        "host": uri.host.to_json(),
        "port": uri.port.to_json(),
        "username": uri.username.to_json(),
        "password": uri.password.to_json(),
        "vhost": uri.vhost.to_json(),
        "certFile": uri.cert_file.to_json(),
        "keyFile": uri.key_file.to_json(),
        "caCertFile": uri.ca_cert_file.to_json(),
        "serverName": uri.server_name.to_json(),
        "authMechanism": uri.auth_mechanism.to_json(),
        "heartbeatSeconds": heartbeat,
        "heartbeatNs": ns,
        "connectionTimeout": uri.connection_timeout.to_string().to_json(),
        "channelMax": uri.channel_max.to_json(),
        "canonical": uri.to_string().to_json(),
        "redacted": uri.redacted().to_json(),
      } : Json).stringify()
  } catch {
    _ => "ERROR: invalid AMQP URI"
  }
}
