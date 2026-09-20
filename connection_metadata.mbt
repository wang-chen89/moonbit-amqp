///|
/// Fresh client identity table. Values identify this implementation, not Go.
pub fn new_connection_properties() -> Array[(String, FieldValue)] {
  [
    ("product", LongString(b"moonbit-amqp")),
    ("version", LongString(b"0.22.0")),
    ("platform", LongString(b"moonbit")),
  ]
}

///|
/// Encode once to validate and snapshot every nested mutable container.
pub fn normalize_connection_properties(
  properties : Array[(String, FieldValue)],
) -> Bytes raise FrameError {
  let source = if properties.is_empty() {
    new_connection_properties()
  } else {
    properties
  }
  let entries = source.filter(entry => entry.0 != "capabilities")
  entries.push(
    (
      "capabilities",
      TableValue([
        ("publisher_confirms", Boolean(true)),
        ("consumer_cancel_notify", Boolean(true)),
        ("connection.blocked", Boolean(true)),
        ("basic.nack", Boolean(true)),
      ]),
    ),
  )
  encode_table(entries)
}

///|
/// Independent deep copy; changing it cannot alter this connection or recovery.
pub fn Session::client_properties(
  self : Session,
) -> Array[(String, FieldValue)] raise FrameError {
  decode_table(self.client_properties_wire)
}

///|
/// Independent deep copy, available after connection.start; empty before start.
pub fn Session::server_properties(
  self : Session,
) -> Array[(String, FieldValue)] raise FrameError {
  decode_table(self.server_properties_wire)
}

///|
pub fn Session::server_locales(self : Session) -> Array[String] {
  self.server_locales.copy()
}

///|
pub fn Session::server_version(self : Session) -> (Int, Int)? {
  self.server_version
}

///|
pub fn Session::virtual_host(self : Session) -> String {
  self.vhost
}

///|
pub fn Session::locale(self : Session) -> String {
  self.locale
}
