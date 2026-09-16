///|
fn server_method(
  name : String,
  args : Array[Argument],
  channel? : Int = 0,
) -> Bytes raise {
  Method::new(name, args).encode(channel).encode()
}

///|
fn start_frame() -> Bytes raise {
  server_method("connection.start", [
    Octet(0),
    Octet(9),
    Table([]),
    LongString(b"AMQPLAIN PLAIN"),
    LongString(b"en_US"),
  ])
}

///|
fn ready_session() -> Session raise {
  let s = Session::new("demo", "test")
  ignore(s.take_output())
  ignore(s.feed(start_frame()))
  ignore(s.take_output())
  ignore(
    s.feed(server_method("connection.tune", [Short(16), Long(8192U), Short(4)])),
  )
  ignore(s.take_output())
  ignore(s.feed(server_method("connection.open-ok", [ShortString("")])))
  s.send(1, Method::new("channel.open", [ShortString("")]))
  ignore(s.take_output())
  ignore(s.feed(server_method("channel.open-ok", [LongString(b"")], channel=1)))
  s
}

///|
test "session fragmented handshake authenticates once and negotiates limits" {
  let s = Session::new(
    "demo",
    "test",
    channel_max=20,
    frame_max=65536,
    heartbeat=30,
  )
  assert_eq(s.take_output(), [b"AMQP\x00\x00\x09\x01"])
  for byte in start_frame() {
    assert_eq(s.feed(Bytes::from_array([byte])), [])
  }
  let frames = Decoder::new().feed(s.take_output()[0])
  let auth = Method::decode(frames[0])
  assert_eq(auth.arguments[2], LongString(b"\x00demo\x00test"))
  assert_eq(s.take_output(), [])
  ignore(
    s.feed(server_method("connection.tune", [Short(16), Long(8192U), Short(4)])),
  )
  assert_eq(s.limits(), (16, 8192, 4))
  let out = s.take_output()
  assert_eq(out.length(), 2)
  assert_eq(Method::decode(Decoder::new().feed(out[0])[0]).arguments, [
    Short(16),
    Long(8192U),
    Short(4),
  ])
  assert_eq(s.feed(server_method("connection.open-ok", [ShortString("")])), [
    Ready,
  ])
}

///|
test "session zero tune settings use bounded client maxima and larger heartbeat" {
  let s = Session::new("u", "p", channel_max=8, frame_max=4096, heartbeat=5)
  ignore(s.take_output())
  ignore(s.feed(start_frame()))
  ignore(s.take_output())
  ignore(
    s.feed(server_method("connection.tune", [Short(0), Long(0U), Short(0)])),
  )
  assert_eq(s.limits(), (8, 4096, 5))
}

///|
test "session rejects wrong handshake and poisons state" {
  let s = Session::new("u", "p")
  assert_true(
    try {
      ignore(s.feed(server_method("connection.open-ok", [ShortString("")])))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.status(), "failed")
  assert_eq(s.take_output(), [])
  assert_true(
    try {
      ignore(s.feed(start_frame()))
      false
    } catch {
      _ => true
    },
  )
}

///|
test "session rejects unavailable SASL and invalid server minimum" {
  let a = Session::new("u", "p")
  assert_true(
    try {
      ignore(
        a.feed(
          server_method("connection.start", [
            Octet(0),
            Octet(9),
            Table([]),
            LongString(b"EXTERNAL"),
            LongString(b"en_US"),
          ]),
        ),
      )
      false
    } catch {
      _ => true
    },
  )
  let b = Session::new("u", "p")
  ignore(b.take_output())
  ignore(b.feed(start_frame()))
  ignore(b.take_output())
  assert_true(
    try {
      ignore(
        b.feed(
          server_method("connection.tune", [Short(0), Long(4095U), Short(0)]),
        ),
      )
      false
    } catch {
      _ => true
    },
  )
}

///|
test "session channel allocation state and close isolate channels" {
  let s = ready_session()
  assert_true(
    try {
      s.send(1, Method::new("channel.open", [ShortString("")]))
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      s.send(17, Method::new("channel.open", [ShortString("")]))
      false
    } catch {
      _ => true
    },
  )
  s.send(2, Method::new("channel.open", [ShortString("")]))
  assert_true(
    try {
      s.publish(2, "", "q", b"x")
      false
    } catch {
      _ => true
    },
  )
  ignore(s.take_output())
  ignore(s.feed(server_method("channel.open-ok", [LongString(b"")], channel=2)))
  assert_eq(
    s.feed(
      server_method(
        "channel.close",
        [Short(404), ShortString("missing"), Short(50), Short(10)],
        channel=1,
      ),
    ),
    [ChannelClosed(1, 404, "missing")],
  )
  assert_eq(s.take_output().length(), 1)
  s.publish(2, "", "q", b"ok")
  assert_eq(s.take_output().length(), 3)
  s.send(1, Method::new("channel.open", [ShortString("")]))
}

///|
test "session broker flow control gates publishing and responds" {
  let s = ready_session()
  ignore(s.feed(server_method("channel.flow", [Bit(false)], channel=1)))
  assert_eq(
    Method::decode(Decoder::new().feed(s.take_output()[0])[0]).arguments,
    [Bit(false)],
  )
  assert_true(
    try {
      s.publish(1, "", "q", b"x")
      false
    } catch {
      _ => true
    },
  )
  ignore(s.feed(server_method("channel.flow", [Bit(true)], channel=1)))
  ignore(s.take_output())
  ignore(s.feed(server_method("connection.blocked", [ShortString("memory")])))
  assert_true(
    try {
      s.publish(1, "", "q", b"x")
      false
    } catch {
      _ => true
    },
  )
  ignore(s.feed(server_method("connection.unblocked", [])))
  s.publish(1, "", "q", b"x")
}

///|
test "session get-ok emitted only when all body bytes arrive" {
  let s = ready_session()
  let command = Method::new("basic.get-ok", [
    LongLong(9007199254740993UL),
    Bit(false),
    ShortString(""),
    ShortString("q"),
    Long(0U),
  ])
  let frames = content_frames(
    command,
    1,
    [("timestamp", LongLong(18446744073709551615UL))],
    b"hello",
  )
  assert_eq(s.feed(frames[0].encode()), [])
  assert_eq(s.feed(frames[1].encode()), [])
  let events = s.feed(frames[2].encode())
  guard events is [Message(c)] else { fail("expected one complete message") }
  assert_eq(c.body, b"hello")
  assert_eq(c.basic_header().properties, [
    ("timestamp", LongLong(18446744073709551615UL)),
  ])
}

///|
test "session publish splits at negotiated envelope and rejects atomically" {
  let s = ready_session()
  let body = Bytes::from_array(Array::make(20000, b'x'))
  s.publish(1, "", "q", body)
  let out = s.take_output()
  assert_eq(out.length(), 5)
  assert_true(out.all(b => b.length() <= 8192))
  assert_true(
    try {
      s.publish(1, "", "q", b"x", properties=[("unknown", Bit(true))])
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.take_output(), [])
}

///|
test "session rejects negotiated oversized frame and incomplete eof" {
  let s = ready_session()
  let oversized : Frame = {
    kind: 3,
    channel: 1,
    payload: Bytes::from_array(Array::make(8185, b'x')),
  }
  assert_true(
    try {
      ignore(s.feed(oversized.encode()))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.status(), "failed")
  let t = ready_session()
  ignore(t.feed(b"\x01"))
  assert_true(
    try {
      t.finish()
      false
    } catch {
      _ => true
    },
  )
  assert_eq(t.status(), "failed")
}

///|
test "session discards in-flight content while closing channel or connection" {
  let s = ready_session()
  let frames = content_frames(
    Method::new("basic.deliver", [
      ShortString("consumer"),
      LongLong(1UL),
      Bit(false),
      ShortString(""),
      ShortString("q"),
    ]),
    1,
    [],
    b"body",
  )
  ignore(s.feed(frames[0].encode()))
  s.send(
    1,
    Method::new("channel.close", [
      Short(200),
      ShortString("bye"),
      Short(0),
      Short(0),
    ]),
  )
  ignore(s.take_output())
  assert_eq(s.feed(frames[1].encode()), [])
  assert_eq(s.feed(frames[2].encode()), [])
  assert_eq(s.feed(server_method("channel.close-ok", [], channel=1)), [
    ChannelClosed(1, 200, "normal close"),
  ])
  s.send(
    0,
    Method::new("connection.close", [
      Short(200),
      ShortString("bye"),
      Short(0),
      Short(0),
    ]),
  )
  ignore(s.take_output())
  assert_eq(s.feed(frames[1].encode()), [])
  assert_eq(s.feed(server_method("connection.close-ok", [])), [
    Closed(200, "normal close"),
  ])
  s.finish()
}

///|
test "session simultaneous connection close acknowledges peer" {
  let s = ready_session()
  s.send(
    0,
    Method::new("connection.close", [
      Short(200),
      ShortString("bye"),
      Short(0),
      Short(0),
    ]),
  )
  ignore(s.take_output())
  assert_eq(
    s.feed(
      server_method("connection.close", [
        Short(320),
        ShortString("shutdown"),
        Short(0),
        Short(0),
      ]),
    ),
    [Closed(320, "shutdown")],
  )
  assert_eq(
    Method::decode(Decoder::new().feed(s.take_output()[0])[0]),
    Method::new("connection.close-ok", []),
  )
  s.finish()
}
