///|
fn streaming_session() -> Session raise {
  let s = Session::new("demo", "test", stream_bodies=true)
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
fn incoming_delivery(channel : Int, tag : UInt64) -> Bytes raise {
  server_method(
    "basic.deliver",
    [
      ShortString("consumer"),
      LongLong(tag),
      Bit(false),
      ShortString(""),
      ShortString("q"),
    ],
    channel~,
  )
}

///|
fn incoming_header(channel : Int, size : UInt64) -> Bytes raise {
  (
    { body_size: size, properties: [("content-type", ShortString("binary"))], } :
    BasicHeader)
  .encode(channel)
  .encode()
}

///|
fn incoming_body(channel : Int, data : Bytes) -> Bytes raise {
  ({ kind: 3, channel, payload: data, } : Frame).encode()
}

///|
test "stream receiver exposes uint64 metadata and fragments without whole body" {
  let s = streaming_session()
  assert_eq(s.feed(incoming_delivery(1, 9UL)), [])
  let command = Method::decode(
    Decoder::new().feed(incoming_delivery(1, 9UL))[0],
  )
  let header : BasicHeader = {
    body_size: 18446744073709551615UL,
    properties: [("content-type", ShortString("binary"))],
  }
  assert_eq(s.feed(incoming_header(1, header.body_size)), [
    MessageStart(1, command, header),
  ])
  assert_eq(s.feed(incoming_body(1, b"abc")), [MessageData(1, b"abc")])
  assert_true(
    try {
      s.finish()
      false
    } catch {
      _ => true
    },
  )
}

///|
test "stream receiver ends empty and nonempty bodies at the exact frame boundary" {
  let s = streaming_session()
  ignore(s.feed(incoming_delivery(1, 1UL)))
  let empty = s.feed(incoming_header(1, 0UL))
  assert_eq(empty.length(), 2)
  assert_eq(empty[1], MessageEnd(1))
  ignore(s.feed(incoming_delivery(1, 2UL)))
  ignore(s.feed(incoming_header(1, 3UL)))
  assert_eq(s.feed(incoming_body(1, b"ab")), [MessageData(1, b"ab")])
  assert_eq(s.feed(incoming_body(1, b"c")), [
    MessageData(1, b"c"),
    MessageEnd(1),
  ])
}

///|
test "stream receiver rejects overruns empty fragments duplicate headers and early body" {
  for bad in [0, 1, 2, 3, 4] {
    let s = streaming_session()
    ignore(s.feed(incoming_delivery(1, 1UL)))
    if bad != 3 {
      ignore(s.feed(incoming_header(1, 1UL)))
    }
    let wire = match bad {
      0 => incoming_body(1, b"xx")
      1 => incoming_body(1, b"")
      2 => incoming_header(1, 1UL)
      3 => incoming_body(1, b"x")
      _ => incoming_delivery(1, 2UL)
    }
    assert_true(
      try {
        ignore(s.feed(wire))
        false
      } catch {
        _ => true
      },
    )
    assert_eq(s.status(), "failed")
  }
}

///|
test "stream receiver interleaves channels and permits heartbeats" {
  let s = streaming_session()
  s.send(2, Method::new("channel.open", [ShortString("")]))
  ignore(s.take_output())
  ignore(s.feed(server_method("channel.open-ok", [LongString(b"")], channel=2)))
  for ch in [1, 2] {
    ignore(s.feed(incoming_delivery(ch, 1UL)))
    ignore(s.feed(incoming_header(ch, 2UL)))
  }
  assert_eq(s.feed(incoming_body(2, b"x")), [MessageData(2, b"x")])
  assert_eq(s.feed(({ kind: 8, channel: 0, payload: b"", } : Frame).encode()), [])
  assert_eq(s.feed(incoming_body(1, b"ab")), [
    MessageData(1, b"ab"),
    MessageEnd(1),
  ])
  assert_eq(s.feed(incoming_body(2, b"y")), [
    MessageData(2, b"y"),
    MessageEnd(2),
  ])
}

///|
test "stream receiver discards closed channel state before reuse" {
  let s = streaming_session()
  ignore(s.feed(incoming_delivery(1, 1UL)))
  ignore(s.feed(incoming_header(1, 100UL)))
  ignore(s.feed(incoming_body(1, b"partial")))
  ignore(
    s.feed(
      server_method(
        "channel.close",
        [Short(404), ShortString("gone"), Short(60), Short(70)],
        channel=1,
      ),
    ),
  )
  ignore(s.take_output())
  s.send(1, Method::new("channel.open", [ShortString("")]))
  ignore(s.take_output())
  ignore(s.feed(server_method("channel.open-ok", [LongString(b"")], channel=1)))
  ignore(s.feed(incoming_delivery(1, 2UL)))
  let events = s.feed(incoming_header(1, 0UL))
  assert_eq(events[1], MessageEnd(1))
}
