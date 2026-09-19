///|
test "publication flags preserve the legacy default and agree across body APIs" {
  for mandatory in [false, true] {
    for immediate in [false, true] {
      let buffered = ready_session()
      buffered.publish(1, "", "q", b"data", mandatory~, immediate~)
      let streamed = ready_session()
      streamed.publish_start(1, "", "q", 4UL, mandatory~, immediate~)
      streamed.publish_body(1, b"data")
      let out = buffered.take_output()
      assert_eq(streamed.take_output(), out)
      let wire = out[0]
      // Protocol method bytes end with mandatory bit 0 and immediate bit 1.
      assert_eq(
        wire[wire.length() - 2].to_int(),
        (if mandatory { 1 } else { 0 }) + (if immediate { 2 } else { 0 }),
      )
    }
  }
  let old = ready_session()
  old.publish(1, "", "q", b"data")
  let explicit = ready_session()
  explicit.publish_start(1, "", "q", 4UL, mandatory=false, immediate=false)
  explicit.publish_body(1, b"data")
  assert_eq(old.take_output(), explicit.take_output())
}

///|
test "client flow and server flow have independent directions and preserve content ordering" {
  let s = ready_session()
  s.send(1, Method::new("channel.flow", [Bit(false)]))
  assert_eq(s.take_output(), [
    server_method("channel.flow", [Bit(false)], channel=1),
  ])
  ignore(s.feed(server_method("channel.flow-ok", [Bit(false)], channel=1)))
  // Asking the broker to pause deliveries does not disable local publication.
  s.publish_start(1, "", "q", 1UL)
  ignore(s.take_output())
  assert_true(
    try {
      s.send(1, Method::new("channel.flow", [Bit(true)]))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.take_output(), [])
  s.publish_body(1, b"x")
  ignore(s.take_output())
  s.send(1, Method::new("channel.flow", [Bit(true)]))
  ignore(s.take_output())
  ignore(s.feed(server_method("channel.flow-ok", [Bit(true)], channel=1)))
  ignore(s.feed(server_method("channel.flow", [Bit(false)], channel=1)))
  assert_eq(s.take_output(), [
    server_method("channel.flow-ok", [Bit(false)], channel=1),
  ])
  assert_true(
    try {
      s.publish(1, "", "q", b"x")
      false
    } catch {
      _ => true
    },
  )
  assert_eq(s.take_output(), [])
  ignore(s.feed(server_method("channel.flow", [Bit(true)], channel=1)))
  assert_eq(s.take_output(), [
    server_method("channel.flow-ok", [Bit(true)], channel=1),
  ])
  s.publish(1, "", "q", b"x", immediate=true)
  assert_eq(s.take_output().length(), 3)
}
