///|
fn method_frame(channel : Int) -> @amqp.Frame {
  { kind: 1, channel, payload: b"\x00\x3c\x00\x28", }
}

///|
fn header(channel : Int, size : Byte) -> @amqp.Frame {
  {
    kind: 2,
    channel,
    payload: b"\x00\x3c\x00\x00\x00\x00\x00\x00\x00\x00\x00" +
    Bytes::from_array([size]) +
    b"\x00\x00",
  }
}

///|
test "interleaved channels fragmented bodies and heartbeat" {
  let a = @amqp.Assembler::new()
  ignore(a.push(method_frame(1)))
  ignore(a.push(method_frame(2)))
  ignore(a.push(header(1, 5)))
  ignore(a.push(header(2, 2)))
  ignore(a.push({ kind: 3, channel: 1, payload: b"hel", }))
  ignore(a.push({ kind: 8, channel: 0, payload: b"", }))
  assert_eq(
    a.push({ kind: 3, channel: 2, payload: b"ok", }).unwrap().body,
    b"ok",
  )
  let content = a.push({ kind: 3, channel: 1, payload: b"lo", }).unwrap()
  assert_eq(content.body, b"hello")
  assert_eq(content.channel, 1)
  a.finish()
}

///|
test "zero body and channel reuse" {
  let a = @amqp.Assembler::new()
  for _ in 0..<3 {
    ignore(a.push(method_frame(1)))
    assert_eq(a.push(header(1, 0)).unwrap().body, b"")
  }
  a.finish()
}

///|
test "reject missing header oversized and interrupted content" {
  let a = @amqp.Assembler::new()
  ignore(a.push(method_frame(1)))
  assert_true(
    try {
      ignore(a.push({ kind: 3, channel: 1, payload: b"x", }))
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      a.finish()
      false
    } catch {
      _ => true
    },
  )
  let b = @amqp.Assembler::new(max_body=2)
  ignore(b.push(method_frame(1)))
  assert_true(
    try {
      ignore(b.push(header(1, 3)))
      false
    } catch {
      _ => true
    },
  )
  let c = @amqp.Assembler::new()
  ignore(c.push(method_frame(1)))
  assert_true(
    try {
      ignore(c.push(method_frame(1)))
      false
    } catch {
      _ => true
    },
  )
}

///|
test "aggregate buffer bound and exact declared length" {
  let a = @amqp.Assembler::new(max_body=3)
  for ch in [1, 2] {
    ignore(a.push(method_frame(ch)))
    ignore(a.push(header(ch, 3)))
  }
  ignore(a.push({ kind: 3, channel: 1, payload: b"ab", }))
  assert_true(
    try {
      ignore(a.push({ kind: 3, channel: 2, payload: b"cd", }))
      false
    } catch {
      _ => true
    },
  )
  let b = @amqp.Assembler::new()
  ignore(b.push(method_frame(1)))
  ignore(b.push(header(1, 1)))
  assert_true(
    try {
      ignore(b.push({ kind: 3, channel: 1, payload: b"ab", }))
      false
    } catch {
      _ => true
    },
  )
}
