///|
test "heartbeat golden bytes" {
  let frame : @amqp.Frame = { kind: 8, channel: 0, payload: b"", }
  assert_eq(frame.encode(), b"\x08\x00\x00\x00\x00\x00\x00\xce")
  let d = @amqp.Decoder::new()
  assert_eq(d.feed(frame.encode()), [frame])
  d.finish()
  assert_eq(@amqp.protocol_header(), b"AMQP\x00\x00\x09\x01")
}

///|
test "method golden vector and all split positions" {
  let f : @amqp.Frame = { kind: 1, channel: 3, payload: b"\x00\x3c\x00\x28", }
  let wire = b"\x01\x00\x03\x00\x00\x00\x04\x00\x3c\x00\x28\xce"
  assert_eq(f.encode(), wire)
  assert_eq(f.method_ids(), Some((60, 40)))
  for split in 0..<=wire.length() {
    let d = @amqp.Decoder::new()
    let frames = d.feed(wire[:split].to_owned())
    for frame in d.feed(wire[split:].to_owned()) {
      frames.push(frame)
    }
    assert_eq(frames, [f])
    d.finish()
  }
}

///|
test "coalesced frames and bytewise input" {
  let f : @amqp.Frame = { kind: 3, channel: 65535, payload: b"hello", }
  let d = @amqp.Decoder::new()
  let frames = []
  for b in f.encode() {
    for item in d.feed(Bytes::from_array([b])) {
      frames.push(item)
    }
  }
  assert_eq(frames, [f])
  d.finish()
  assert_eq(d.feed(f.encode() + f.encode()), [f, f])
}

///|
test "malformed lengths terminators and channels" {
  for
    wire in [
      b"\x08\x00\x00\xff\xff\xff\xff", b"\x08\x00\x00\x00\x00\x00\x00\x00", b"\x08\x00\x01\x00\x00\x00\x00\xce",
      b"\x09\x00\x00\x00\x00\x00\x00\xce",
    ] {
    let d = @amqp.Decoder::new()
    assert_true(
      try {
        ignore(d.feed(wire))
        false
      } catch {
        _ => true
      },
    )
    assert_true(
      try {
        ignore(d.feed(b""))
        false
      } catch {
        _ => true
      },
    )
  }
  let d = @amqp.Decoder::new()
  ignore(d.feed(b"\x01"))
  assert_true(
    try {
      d.finish()
      false
    } catch {
      _ => true
    },
  )
}
