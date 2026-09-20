///|
test "metadata default and custom properties have mandatory capabilities" {
  let defaults = new_connection_properties()
  assert_eq(defaults.length(), 3)
  defaults.clear()
  assert_eq(new_connection_properties().length(), 3)
  let s = Session::new("u", "p")
  assert_eq(s.client_properties().length(), 4)
  let custom = Session::new("u", "p", properties=[
    ("connection_name", LongString(b"example")),
    ("capabilities", Boolean(false)),
  ])
  let props = custom.client_properties()
  assert_eq(props.length(), 2)
  assert_eq(props[0], ("connection_name", LongString(b"example")))
  assert_eq(props[1].0, "capabilities")
  assert_true(
    props[1].1 is TableValue(entries) &&
    entries.length() == 4 &&
    entries.all(entry => entry.1 == Boolean(true)),
  )
  assert_eq(auth_reply(custom, b"PLAIN").arguments[0], Table(props))
}

///|
test "metadata client property snapshots isolate nested containers and getters" {
  let child : Array[(String, FieldValue)] = [("n", Signed32(1))]
  let values : Array[FieldValue] = [TableValue(child)]
  let source : Array[(String, FieldValue)] = [("nested", ArrayValue(values))]
  let s = Session::new("u", "p", properties=source)
  source.clear()
  child.clear()
  values.clear()
  let snapshot = s.client_properties()
  assert_eq(
    snapshot[0],
    ("nested", ArrayValue([TableValue([("n", Signed32(1))])])),
  )
  if snapshot[0].1 is ArrayValue(a) {
    a.clear()
  }
  assert_eq(
    s.client_properties()[0],
    ("nested", ArrayValue([TableValue([("n", Signed32(1))])])),
  )
}

///|
test "metadata validates keys containers and frame bound before session use" {
  let invalid : Array[Array[(String, FieldValue)]] = [
    [("x".repeat(256), Void)],
    [("x", Signed8(128))],
    [("x", LongString(Bytes::make(8192, b'x')))],
  ]
  for props in invalid {
    assert_true(
      try {
        ignore(Session::new("u", "p", frame_max=4096, properties=props))
        false
      } catch {
        _ => true
      },
    )
  }
  // All supplied capability entries are replaced, even invalid values.
  let only = Session::new("u", "p", properties=[
    ("capabilities", Signed8(999)),
    ("capabilities", Void),
  ])
  assert_eq(only.client_properties().length(), 1)
}

///|
test "metadata before start has no invented server identity" {
  let s = Session::new("u", "p", vhost="tenant")
  assert_eq(s.server_properties(), [])
  assert_eq(s.server_locales(), [])
  assert_eq(s.server_version(), None)
  assert_eq(s.virtual_host(), "tenant")
  assert_eq(s.locale(), "en_US")
}

///|
test "metadata server properties preserve bytes tags duplicates and locales" {
  let s = Session::new("u", "p")
  let props : Array[(String, FieldValue)] = [
    ("product", LongString(b"peer")),
    ("duplicate", Signed32(1)),
    ("duplicate", Signed32(2)),
    ("opaque", LongString(b"\xff\x00")),
    ("nested", TableValue([("flag", Boolean(true))])),
  ]
  ignore(s.take_output())
  ignore(
    s.feed(
      server_method("connection.start", [
        Octet(0),
        Octet(9),
        Table(props),
        LongString(b"PLAIN"),
        LongString(b"en_US  fr_FR"),
      ]),
    ),
  )
  assert_eq(s.server_properties(), props)
  assert_eq(s.server_locales(), ["en_US", "", "fr_FR"])
  assert_eq(s.server_version(), Some((0, 9)))
  let snapshot = s.server_properties()
  if snapshot[4].1 is TableValue(entries) {
    entries.clear()
  }
  assert_eq(s.server_properties(), props)
  s.server_locales().clear()
  assert_eq(s.server_locales().length(), 3)
}

///|
test "metadata remains queryable after broker rejects authentication" {
  let s = Session::new("u", "p")
  ignore(auth_reply(s, b"PLAIN"))
  ignore(
    s.feed(
      server_method("connection.close", [
        Short(403),
        ShortString("denied"),
        Short(10),
        Short(11),
      ]),
    ),
  )
  assert_eq(s.status(), "closed")
  assert_eq(s.server_version(), Some((0, 9)))
  assert_eq(s.client_properties().length(), 4)
}
