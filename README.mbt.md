# 可执行 API 示例

按协商帧上限拆分消息体，完整帧长度包含 8 字节开销。这些例子调用公开 API，并随 `moon test` 执行。

```mbt check
///|
test "outbound body frames respect negotiated full frame size" {
  let frames = @amqp.body_frames(1, b"hello world", 12)
  assert_eq(frames.length(), 3)
  let d = @amqp.Decoder::new()
  let out = []
  for f in frames {
    let wire = f.encode()
    assert_true(wire.length() <= 12)
    for x in d.feed(wire) {
      out.push(x.payload)
    }
  }
  assert_eq(out, [b"hell", b"o wo", b"rld"])
  d.finish()
  assert_eq(@amqp.body_frames(1, b"", 12), [])
  assert_true(
    try {
      ignore(@amqp.body_frames(0, b"x", 12))
      false
    } catch {
      _ => true
    },
  )
}
```

0.3 另提供 64 种方法参数、字段表和 Basic 属性 API，完整消息流程见 README.md 与 codec_test.mbt。限制：尚无连接协商、认证、channel/RPC 状态机及真实 RabbitMQ 互操作。
