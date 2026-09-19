///|
/// Initial-response SASL credential. Credentials deliberately have no Debug impl.
pub struct Authentication {
  priv mechanism : String
  priv response : Bytes?
}

///|
fn check_mechanism(mechanism : String) -> Unit raise FrameError {
  if mechanism.is_empty() ||
    mechanism.length() > 255 ||
    mechanism.iter().any(c => c.to_int() < 33 || c.to_int() > 126) {
    raise Invalid("invalid SASL mechanism")
  }
}

///|
/// An initial response, preserved byte-for-byte. No Unicode normalization.
pub fn Authentication::custom(
  mechanism : String,
  response : Bytes,
) -> Authentication raise FrameError {
  check_mechanism(mechanism)
  if response.length() > 1048576 {
    raise Invalid("SASL response exceeds 1 MiB")
  }
  { mechanism, response: Some(response), }
}

///|
/// Ask the host for an initial response only if this candidate is selected.
pub fn Authentication::deferred(
  mechanism : String,
) -> Authentication raise FrameError {
  check_mechanism(mechanism)
  { mechanism, response: None, }
}

///|
pub fn Authentication::plain(
  username : String,
  password : String,
) -> Authentication raise FrameError {
  if username.contains("\u0000") || password.contains("\u0000") {
    raise Invalid("invalid PLAIN credentials")
  }
  Authentication::custom(
    "PLAIN",
    @utf8.encode("\u0000" + username + "\u0000" + password),
  )
}

///|
pub fn Authentication::amqplain(
  username : String,
  password : String,
) -> Authentication raise FrameError {
  let table = encode_table([
    ("LOGIN", LongString(@utf8.encode(username))),
    ("PASSWORD", LongString(@utf8.encode(password))),
  ])
  Authentication::custom("AMQPLAIN", table[4:].to_owned())
}

///|
/// RabbitMQ EXTERNAL response used by the pinned amqp091-go implementation.
pub fn Authentication::external() -> Authentication {
  { mechanism: "EXTERNAL", response: Some(b"\x00*\x00*"), }
}

///|
pub fn Authentication::mechanism(self : Authentication) -> String {
  self.mechanism
}

///|
fn Session::auth_response(
  self : Session,
  response : Bytes,
) -> Unit raise FrameError {
  if response.length() > 1048576 {
    raise Invalid("SASL response exceeds 1 MiB")
  }
  self.emit(
    "connection.start-ok",
    [
      Table([
        ("product", LongString(b"moonbit-amqp")),
        (
          "capabilities",
          TableValue([
            ("publisher_confirms", Boolean(true)),
            ("consumer_cancel_notify", Boolean(true)),
            ("connection.blocked", Boolean(true)),
            ("basic.nack", Boolean(true)),
          ]),
        ),
      ]),
      ShortString(self.selected_auth),
      LongString(response),
      ShortString(self.locale),
    ],
    0,
  )
  self.state = "tune"
}

///|
/// Supply a deferred initial response. This is not a connection.secure challenge.
pub fn Session::respond_authentication(
  self : Session,
  response : Bytes,
) -> Unit raise FrameError {
  if self.state != "authenticate" {
    raise Invalid("no initial SASL response is pending")
  }
  self.auth_response(response)
}

///|
pub fn Session::authentication_mechanism(self : Session) -> String {
  self.selected_auth
}
