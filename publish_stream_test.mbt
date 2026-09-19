///|
test "streaming publication encodes full uint64 size without body allocation" {
  let s = ready_session()
  s.publish_start(1, "", "q", 18446744073709551615UL)
  let out = s.take_output()
  assert_eq(out.length(), 2)
  assert_eq(
    Method::decode(Decoder::new().feed(out[0])[0]),
    Method::new("basic.publish", [
      Short(0),
      ShortString(""),
      ShortString("q"),
      Bit(false),
      Bit(false),
    ]),
  )
  assert_eq(
    BasicHeader::decode(Decoder::new().feed(out[1])[0]).body_size,
    18446744073709551615UL,
  )
  s.publish_body(1, b"a")
  assert_eq(Decoder::new().feed(s.take_output()[0])[0].payload, b"a")
}

///|
test "invalid stream metadata is atomic and empty body releases channel" {
  let s = ready_session()
  assert_true(
    try {
      s.publish_start(1, "", "q", 1UL, properties=[("unknown", Bit(true))])
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.take_output(), [])
  s.publish_start(1, "", "q", 0UL)
  assert_eq(s.take_output().length(), 2)
  s.send(1, Method::new("basic.ack", [LongLong(1UL), Bit(false)]))
  assert_eq(s.take_output().length(), 1)
  assert_true(
    try {
      s.publish_body(1, b"a")
      false
    } catch {
      _ => true
    },
  )
}

///|
test "stream fragments guard channel ordering and rejected lengths preserve remaining" {
  let s = ready_session()
  s.publish_start(1, "", "q", 3UL)
  ignore(s.take_output())
  assert_true(
    try {
      s.publish_start(1, "", "q", 0UL)
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      s.publish(1, "", "q", b"x")
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      s.send(1, Method::new("basic.ack", [LongLong(1UL), Bit(false)]))
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      s.publish_body(1, b"")
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      s.publish_body(1, b"over")
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.take_output(), [])
  s.publish_body(1, b"ab")
  s.publish_body(1, b"c")
  assert_eq(s.take_output().length(), 2)
  s.publish_start(1, "", "q", 0UL)
}

///|
test "stream frame bounds and independent channels" {
  let s = ready_session()
  s.send(2, Method::new("channel.open", [ShortString("")]))
  ignore(s.take_output())
  ignore(s.feed(server_method("channel.open-ok", [LongString(b"")], channel=2)))
  s.publish_start(1, "", "q", 9000UL)
  s.publish_start(2, "", "q", 1UL)
  ignore(s.take_output())
  assert_true(
    try {
      s.publish_body(1, Bytes::from_array(Array::make(8185, b'0')))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.take_output(), [])
  s.publish_body(2, b"x")
  s.publish_body(1, Bytes::from_array(Array::make(8184, b'0')))
  s.publish_body(1, Bytes::from_array(Array::make(816, b'0')))
  let output = s.take_output()
  assert_eq(output.length(), 3)
  assert_eq(output[1].length(), 8192)
}

///|
test "block and flow pause prevent new content but permit completing existing content" {
  let s = ready_session()
  s.publish_start(1, "", "q", 1UL)
  ignore(s.take_output())
  ignore(s.feed(server_method("connection.blocked", [ShortString("memory")])))
  ignore(s.feed(server_method("channel.flow", [Bit(false)], channel=1)))
  ignore(s.take_output())
  s.publish_body(1, b"a")
  assert_true(
    try {
      s.publish_start(1, "", "q", 0UL)
      false
    } catch {
      _ => true
    },
  )
  ignore(s.feed(server_method("connection.unblocked", [])))
  assert_true(
    try {
      s.publish_start(1, "", "q", 0UL)
      false
    } catch {
      _ => true
    },
  )
  ignore(s.feed(server_method("channel.flow", [Bit(true)], channel=1)))
  s.publish_start(1, "", "q", 0UL)
}

///|
test "broker channel close clears partial outgoing content before channel reuse" {
  let s = ready_session()
  s.publish_start(1, "", "q", 100UL)
  ignore(s.take_output())
  ignore(
    s.feed(
      server_method(
        "channel.close",
        [Short(404), ShortString("missing"), Short(60), Short(40)],
        channel=1,
      ),
    ),
  )
  assert_true(
    try {
      s.publish_body(1, b"a")
      false
    } catch {
      _ => true
    },
  )
  ignore(s.take_output())
  s.send(1, Method::new("channel.open", [ShortString("")]))
  ignore(s.take_output())
  ignore(s.feed(server_method("channel.open-ok", [LongString(b"")], channel=1)))
  s.publish_start(1, "", "q", 0UL)
  assert_eq(s.take_output().length(), 2)
}
