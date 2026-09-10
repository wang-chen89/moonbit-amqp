///|
test "typed methods bit packing exact integers and strict channels" {
  let command = @amqp.Method::new("basic.nack", [
    LongLong(18446744073709551615UL),
    Bit(true),
    Bit(false),
  ])
  let frame = command.encode(7)
  assert_eq(
    frame.payload,
    b"\x00\x3c\x00\x78\xff\xff\xff\xff\xff\xff\xff\xff\x01",
  )
  assert_eq(@amqp.Method::decode(frame), command)
  assert_true(
    try {
      ignore(command.encode(0))
      false
    } catch {
      _ => true
    },
  )
  let wrong = @amqp.Method::new("basic.ack", [LongLong(1UL), Octet(1)])
  assert_true(
    try {
      ignore(wrong.encode(1))
      false
    } catch {
      _ => true
    },
  )
  let invalid : @amqp.Frame = {
    kind: 1,
    channel: 1,
    payload: frame.payload + b"\x00",
  }
  assert_true(
    try {
      ignore(@amqp.Method::decode(invalid))
      false
    } catch {
      _ => true
    },
  )
  for size in 0..<frame.payload.length() {
    assert_true(
      try {
        ignore(
          @amqp.Method::decode({
            kind: 1,
            channel: 7,
            payload: frame.payload[:size].to_owned(),
          }),
        )
        false
      } catch {
        _ => true
      },
    )
  }
  assert_eq(@amqp.method_names().length(), 64)
}

///|
test "all RabbitMQ table tags retain exact width bits and order" {
  let values : Array[(String, @amqp.FieldValue)] = [
    ("t", Boolean(true)),
    ("b", Signed8(-128)),
    ("B", Unsigned8(255)),
    ("s", Signed16(-32768)),
    ("u", Unsigned16(65535)),
    ("I", Signed32(-2147483648)),
    ("i", Unsigned32(4294967295U)),
    ("l", Signed64(-9223372036854775808L)),
    ("f", Float32Bits(2143289345U)),
    ("d", Float64Bits(9223372036854775808UL)),
    ("D", Decimal(255, -2147483648)),
    ("S", LongString(b"\xff\x00")),
    ("x", ByteArray(b"\x00\xff")),
    ("T", Timestamp(18446744073709551615UL)),
    ("A", ArrayValue([Void, TableValue([("x", Boolean(false))])])),
    ("V", Void),
    ("V", Signed32(1)),
    ("\uFEFF键", LongString(b"value")),
  ]
  assert_eq(@amqp.decode_table(@amqp.encode_table(values)), values)
  assert_eq(
    @amqp.encode_table([("n", Signed16(-2))]),
    b"\x00\x00\x00\x05\x01ns\xff\xfe",
  )
  assert_true(
    try {
      ignore(@amqp.encode_table([("n", Signed8(128))]))
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      ignore(@amqp.encode_table([("n", Decimal(-1, 0))]))
      false
    } catch {
      _ => true
    },
  )
}

///|
test "table truncation nested lengths UTF8 and resource limits" {
  let bytes = @amqp.encode_table([
    ("x", ArrayValue([TableValue([("n", Signed32(7))]), Void])),
  ])
  for size in 0..<bytes.length() {
    assert_true(
      try {
        ignore(@amqp.decode_table(bytes[:size].to_owned()))
        false
      } catch {
        _ => true
      },
    )
  }
  for
    bad in [
      b"\x00\x00\x00\x03\x01xZ",
      b"\xff\xff\xff\xff",
      b"\x00\x00\x00\x07\x01xA\x00\x00\x00\x01V",
      b"\x00\x00\x00\x03\x01\xffV",
      bytes + b"\x00",
    ] {
    assert_true(
      try {
        ignore(@amqp.decode_table(bad))
        false
      } catch {
        _ => true
      },
    )
  }
  let mut deep : @amqp.FieldValue = Void
  for _ in 0..<34 {
    deep = ArrayValue([deep])
  }
  assert_true(
    try {
      ignore(@amqp.encode_table([("x", deep)]))
      false
    } catch {
      _ => true
    },
  )
  assert_true(
    try {
      ignore(@amqp.encode_table([("x", ArrayValue(Array::make(65536, Void)))]))
      false
    } catch {
      _ => true
    },
  )
  let long_key = Array::make(86, "中").join("")
  assert_true(
    try {
      ignore(@amqp.encode_table([(long_key, Void)]))
      false
    } catch {
      _ => true
    },
  )
}

///|
test "Basic properties distinguish absent empty and zero and reject invalid flags" {
  let header : @amqp.BasicHeader = {
    body_size: 18446744073709551615UL,
    properties: [
      ("content-type", ShortString("")),
      ("headers", Table([])),
      ("delivery-mode", Octet(0)),
      ("timestamp", LongLong(0UL)),
      ("cluster-id", ShortString("")),
    ],
  }
  let frame = header.encode(1)
  assert_eq(@amqp.BasicHeader::decode(frame), header)
  for flag in [1, 2] {
    let bad : @amqp.Frame = {
      kind: 2,
      channel: 1,
      payload: b"\x00\x3c\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00" +
      Bytes::from_array([flag.to_byte()]),
    }
    assert_true(
      try {
        ignore(@amqp.BasicHeader::decode(bad))
        false
      } catch {
        _ => true
      },
    )
  }
  let dup : @amqp.BasicHeader = {
    body_size: 0UL,
    properties: [("priority", Octet(1)), ("priority", Octet(2))],
  }
  assert_true(
    try {
      ignore(dup.encode(1))
      false
    } catch {
      _ => true
    },
  )
  let wrong : @amqp.BasicHeader = {
    body_size: 0UL,
    properties: [("timestamp", Long(0U))],
  }
  assert_true(
    try {
      ignore(wrong.encode(1))
      false
    } catch {
      _ => true
    },
  )
  for size in 0..<frame.payload.length() {
    assert_true(
      try {
        ignore(
          @amqp.BasicHeader::decode({
            kind: 2,
            channel: 1,
            payload: frame.payload[:size].to_owned(),
          }),
        )
        false
      } catch {
        _ => true
      },
    )
  }
}

///|
test "complete content workflow strict assembly and metadata validation" {
  let publish = @amqp.Method::new("basic.publish", [
    Short(0),
    ShortString(""),
    ShortString("jobs"),
    Bit(true),
    Bit(false),
  ])
  let properties : Array[(String, @amqp.Argument)] = [
    ("content-type", ShortString("text/plain")),
    ("delivery-mode", Octet(2)),
  ]
  let body = Bytes::from_array(Array::make(100, (65).to_byte()))
  let frames = @amqp.content_frames(
    publish,
    1,
    properties,
    body,
    max_frame_size=40,
  )
  let assembler = @amqp.Assembler::new(strict_methods=true)
  let decoder = @amqp.Decoder::new(max_size=40)
  let contents = []
  for frame in frames {
    for byte in frame.encode(max_size=40) {
      for parsed in decoder.feed(Bytes::from_array([byte])) {
        if assembler.push(parsed) is Some(content) {
          contents.push(content)
        }
      }
    }
  }
  decoder.finish()
  assembler.finish()
  assert_eq(contents.length(), 1)
  assert_eq(contents[0].body, body)
  assert_eq(contents[0].basic_header().properties, properties)
  let strict = @amqp.Assembler::new(strict_methods=true)
  assert_true(
    try {
      ignore(
        strict.push({ kind: 1, channel: 1, payload: b"\x00\x3c\x00\x28", }),
      )
      false
    } catch {
      _ => true
    },
  )
  let damaged = @amqp.Assembler::new()
  ignore(damaged.push(publish.encode(1)))
  assert_true(
    try {
      ignore(
        damaged.push({
          kind: 2,
          channel: 1,
          payload: b"\x00\x3c\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x80\x00",
        }),
      )
      false
    } catch {
      _ => true
    },
  )
}
