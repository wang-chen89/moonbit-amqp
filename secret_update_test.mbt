///|
test "credential update stays on connection channel and accepts one matching reply" {
  let s = ready_session()
  s.send(
    0,
    Method::new("connection.update-secret", [
      LongString(b"\x00new\xff"),
      ShortString("refresh"),
    ]),
  )
  let frame = Decoder::new().feed(s.take_output()[0])[0]
  assert_eq(frame.channel, 0)
  assert_eq(Method::decode(frame).arguments, [
    LongString(b"\x00new\xff"),
    ShortString("refresh"),
  ])
  assert_eq(s.feed(server_method("connection.update-secret-ok", [])), [
    Received(0, Method::new("connection.update-secret-ok", [])),
  ])
  s.send(
    0,
    Method::new("connection.update-secret", [
      LongString(b"again"),
      ShortString(""),
    ]),
  )
  assert_eq(s.status(), "ready")
}

///|
test "duplicate credential update is rejected without replacing the pending exchange" {
  let s = ready_session()
  let command = Method::new("connection.update-secret", [
    LongString(b"first"),
    ShortString("reason"),
  ])
  s.send(0, command)
  ignore(s.take_output())
  assert_true(
    try {
      s.send(0, command)
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.take_output(), [])
  ignore(s.feed(server_method("connection.update-secret-ok", [])))
  s.send(0, command)
  assert_eq(s.take_output().length(), 1)
}

///|
test "unsolicited credential update acknowledgement fails the session" {
  let s = ready_session()
  assert_true(
    try {
      ignore(s.feed(server_method("connection.update-secret-ok", [])))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.status(), "failed")
}

///|
test "credential update does not consume connection flow control or channel replies" {
  let s = ready_session()
  s.send(
    0,
    Method::new("connection.update-secret", [
      LongString(b"new"),
      ShortString(""),
    ]),
  )
  ignore(s.take_output())
  assert_eq(
    s.feed(server_method("connection.blocked", [ShortString("memory")])),
    [Received(0, Method::new("connection.blocked", [ShortString("memory")]))],
  )
  assert_eq(s.feed(server_method("queue.purge-ok", [Long(3U)], channel=1)), [
    Received(1, Method::new("queue.purge-ok", [Long(3U)])),
  ])
  ignore(s.feed(server_method("connection.update-secret-ok", [])))
  assert_eq(s.status(), "ready")
}

///|
test "invalid credential update frame leaves pending state unused" {
  let s = ready_session()
  let oversized = Method::new("connection.update-secret", [
    LongString(Bytes::make(8192, b'x')),
    ShortString("reason"),
  ])
  assert_true(
    try {
      s.send(0, oversized)
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      s.send(
        1,
        Method::new("connection.update-secret", [
          LongString(b"x"),
          ShortString(""),
        ]),
      )
      false
    } catch {
      _ => true
    },
  )
  s.send(
    0,
    Method::new("connection.update-secret", [
      LongString(b"valid"),
      ShortString(""),
    ]),
  )
  assert_eq(s.take_output().length(), 1)
}
