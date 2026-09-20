///|
test "URI defaults distinguish missing and empty credentials" {
  let a = parse_uri("amqp://")
  assert_eq(a.host, "localhost")
  assert_eq(a.port, 5672)
  assert_eq(a.username, "guest")
  assert_eq(a.password, "guest")
  assert_eq(a.vhost, "/")
  assert_eq(a.to_string(), "amqp://localhost/")
  let b = parse_uri("amqps://:@/")
  assert_eq(b.username, "")
  assert_eq(b.password, "")
  assert_eq(b.port, 5671)
  assert_eq(parse_uri("amqp://user@host").password, "guest")
}

///|
test "URI percent decoding preserves Unicode BOM plus and slash boundaries" {
  let u = parse_uri("amqp://%E4%B8%AD:p%2Bass@host/%EF%BB%BFx%2Fy+z")
  assert_eq(u.username, "中")
  assert_eq(u.password, "p+ass")
  assert_eq(u.vhost, "\uFEFFx/y+z")
  assert_eq(u.to_string(), "amqp://%E4%B8%AD:p+ass@host/%EF%BB%BFx%2Fy%2Bz")
}

///|
test "URI canonicalization preserves dot segments and Go path fallback" {
  assert_eq(
    parse_uri("amqp://host/a/../b").to_string(),
    "amqp://host/a%2F..%2Fb",
  )
  assert_eq(parse_uri("amqp://host/a%20b/c").to_string(), "amqp://host/a%20b/c")
  assert_eq(parse_uri("amqp:////vhost").vhost, "/vhost")
  assert_eq(parse_uri("amqp://///vhost").vhost, "vhost")
  assert_eq(parse_uri("amqp:opaque").to_string(), "amqp://localhost/")
}

///|
test "URI IPv6 zones and custom ports retain endpoint identity" {
  let u = parse_uri("amqps://[fe80::1%25ethernet%20one]:5678/")
  assert_eq(u.host, "fe80::1%ethernet one")
  assert_eq(u.port, 5678)
  assert_eq(u.to_string(), "amqps://[fe80::1%25ethernet%20one]:5678/")
  assert_eq(parse_uri("amqp://[::ffff:127.0.0.1]").host, "::ffff:127.0.0.1")
}

///|
test "URI query first value repeated authentication and malformed pair rules" {
  let u = parse_uri(
    "amqps://host/?heartbeat=%xx&heartbeat=2&heartbeat=4&auth_mechanism=amqplain&auth_mechanism=plain&certfile=a+b&keyfile=k;bad&channel_max=8",
  )
  assert_eq(u.heartbeat_seconds, Some(2L))
  assert_eq(u.channel_max, 8)
  assert_eq(u.auth_mechanism, ["amqplain", "plain"])
  assert_eq(u.cert_file, "a b")
  assert_eq(u.key_file, "")
  assert_eq(u.to_string(), "amqps://host/?certfile=a+b")
}

///|
test "URI integer parsing preserves signed 64-bit limits independently of transport" {
  let u = parse_uri(
    "amqp://host:2147483647?heartbeat=-9223372036854775808&connection_timeout=9223372036854775807&channel_max=65535",
  )
  assert_eq(u.port, 2147483647)
  assert_eq(u.heartbeat_seconds, Some(-9223372036854775808L))
  assert_eq(u.connection_timeout, 9223372036854775807L)
  assert_eq(u.channel_max, 65535)
  assert_eq(parse_uri("amqp://host?heartbeat=0").heartbeat_seconds, Some(0L))
  assert_eq(parse_uri("amqp://host").heartbeat_seconds, None)
}

///|
test "URI malformed input errors do not disclose credentials" {
  for
    input in [
      "amqp://u:secret@host:%xx/", "amqp://u:secret@host/%FF", "amqp://u:secret@host?heartbeat=no",
      "amqp://u:secret@host?channel_max=65536", "amqp://u:secret@[bad]", "amqp://u:secret@host\n",
    ] {
    let error = try {
      ignore(parse_uri(input))
      "accepted"
    } catch {
      e => Repr(e).to_string()
    }
    assert_false(error.contains("secret"))
    assert_false(error == "accepted")
  }
}

///|
test "URI input and integer limits reject before transport" {
  for
    input in [
      "amqp://host/" + "a".repeat(65536),
      "amqp://host?heartbeat=9223372036854775808",
      "amqp://host?channel_max=+1",
      "amqp://host:-1",
      "amqp://[1:2:3:4:5:6:7:8:9]",
      "amqp://[::ffff:127.00.0.1]",
    ] {
    assert_true(
      try {
        ignore(parse_uri(input))
        false
      } catch {
        _ => true
      },
    )
  }
}

///|
test "URI redaction is explicit and ordinary formatting retains credentials" {
  let u = parse_uri("amqp://user:fake-secret@host/%2F")
  assert_eq(u.to_string(), "amqp://user:fake-secret@host/")
  assert_eq(u.redacted(), "amqp://user:xxxxx@host/")
}

///|
test "URI authentication helpers emit actual protocol credentials" {
  let u = parse_uri("amqp://demo:p%2Bass@host/")
  let s = Session::with_authentication([u.plain_auth()])
  assert_eq(
    auth_reply(s, b"PLAIN").arguments[2],
    LongString(b"\x00demo\x00p+ass"),
  )
  let amq = Session::with_authentication([u.amqplain_auth()])
  assert_eq(auth_reply(amq, b"AMQPLAIN").arguments[1], ShortString("AMQPLAIN"))
  assert_true(
    try {
      ignore(parse_uri("amqp://u:%00@host").plain_auth())
      false
    } catch {
      _ => true
    },
  )
}
