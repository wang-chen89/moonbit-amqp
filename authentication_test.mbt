///|
fn auth_start(mechanisms : Bytes, locales? : Bytes = b"en_US") -> Bytes raise {
  server_method("connection.start", [
    Octet(0),
    Octet(9),
    Table([]),
    LongString(mechanisms),
    LongString(locales),
  ])
}

///|
fn auth_reply(s : Session, offered : Bytes) -> Method raise {
  ignore(s.take_output())
  ignore(s.feed(auth_start(offered)))
  Method::decode(Decoder::new().feed(s.take_output()[0])[0])
}

///|
test "authentication client preference wins over server ordering" {
  let s = Session::with_authentication([
    Authentication::amqplain("u", "p"),
    Authentication::plain("u", "p"),
  ])
  let reply = auth_reply(s, b"PLAIN EXTERNAL AMQPLAIN")
  assert_eq(reply.arguments[1], ShortString("AMQPLAIN"))
  assert_eq(s.authentication_mechanism(), "AMQPLAIN")
}

///|
test "authentication picks later supported candidate without substring matches" {
  let s = Session::with_authentication([
    Authentication::external(),
    Authentication::plain("u", "p"),
  ])
  let reply = auth_reply(s, b"XEXTERNAL PLAINPLUS PLAIN")
  assert_eq(reply.arguments[1], ShortString("PLAIN"))
  assert_eq(reply.arguments[2], LongString(b"\x00u\x00p"))
}

///|
test "authentication credentials and candidate array can be reused" {
  let candidates = [Authentication::plain("u", "p")]
  let a = Session::with_authentication(candidates)
  let b = Session::with_authentication(candidates)
  candidates.clear()
  assert_eq(auth_reply(a, b"PLAIN").arguments[2], LongString(b"\x00u\x00p"))
  assert_eq(auth_reply(b, b"PLAIN").arguments[2], LongString(b"\x00u\x00p"))
}

///|
test "authentication deferred initial response is requested only once after selection" {
  let s = Session::with_authentication([
    Authentication::deferred("UNUSED"),
    Authentication::deferred("TOKEN"),
  ])
  ignore(s.take_output())
  assert_eq(s.feed(auth_start(b"TOKEN")), [AuthenticationRequested(1, "TOKEN")])
  assert_eq(s.status(), "authenticate")
  assert_eq(s.take_output(), [])
  s.respond_authentication(b"\x00\xfftoken")
  assert_eq(
    Method::decode(Decoder::new().feed(s.take_output()[0])[0]).arguments[2],
    LongString(b"\x00\xfftoken"),
  )
  assert_true(
    try {
      s.respond_authentication(b"again")
      false
    } catch {
      _ => true
    },
  )
}

///|
test "authentication validates configured locale without silently substituting" {
  let s = Session::with_authentication(
    [Authentication::external()],
    locale="fr_FR",
  )
  ignore(s.take_output())
  ignore(s.feed(auth_start(b"EXTERNAL", locales=b"en_US fr_FR")))
  assert_eq(
    Method::decode(Decoder::new().feed(s.take_output()[0])[0]).arguments[3],
    ShortString("fr_FR"),
  )
  let missing = Session::with_authentication(
    [Authentication::external()],
    locale="fr_FR",
  )
  assert_true(
    try {
      ignore(missing.feed(auth_start(b"EXTERNAL")))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(missing.status(), "failed")
}

///|
test "authentication rejects unsupported candidate and malformed mechanism names" {
  for name in ["", "A B", "A\nB", "认证"] {
    assert_true(
      try {
        ignore(Authentication::custom(name, b""))
        false
      } catch {
        _ => true
      },
    )
  }
  assert_true(
    try {
      ignore(Session::with_authentication([]))
      false
    } catch {
      _ => true
    },
  )
  let s = Session::with_authentication([Authentication::external()])
  ignore(s.take_output())
  assert_true(
    try {
      ignore(s.feed(auth_start(b"PLAIN")))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.take_output(), [])
}

///|
test "authentication PLAIN rejects delimiters while AMQPLAIN preserves zero bytes" {
  assert_true(
    try {
      ignore(Authentication::plain("u\u0000x", "p"))
      false
    } catch {
      _ => true
    },
  )
  let s = Session::with_authentication([
    Authentication::amqplain("u\u0000x", "p\u0000q"),
  ])
  assert_eq(
    auth_reply(s, b"AMQPLAIN").arguments[2],
    LongString(
      b"\x05LOGINS\x00\x00\x00\x03u\x00x\x08PASSWORDS\x00\x00\x00\x03p\x00q",
    ),
  )
}

///|
test "authentication initial response observes configured frame and credential bounds" {
  assert_true(
    try {
      ignore(Authentication::custom("TOKEN", Bytes::make(1048577, b'x')))
      false
    } catch {
      _ => true
    },
  )
  let s = Session::with_authentication(
    [Authentication::custom("TOKEN", Bytes::make(4096, b'x'))],
    frame_max=4096,
  )
  assert_true(
    try {
      ignore(auth_reply(s, b"TOKEN"))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.status(), "failed")
}

///|
test "authentication does not treat an unsolicited secure challenge as a tune frame" {
  let s = Session::with_authentication([Authentication::external()])
  ignore(auth_reply(s, b"EXTERNAL"))
  assert_true(
    try {
      ignore(
        s.feed(server_method("connection.secure", [LongString(b"challenge")])),
      )
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.status(), "failed")
}
