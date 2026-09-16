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

0.4 另提供 64 种方法参数、字段表、Basic 属性和 Session 会话 API；Node 宿主包含 TCP/TLS、RPC、心跳与消息确认。完整流程见 README.md、codec_test.mbt、session_test.mbt。已有 RabbitMQ 4.0.5 实测；尚缺自动恢复、更多认证、流式大消息与生产规模验证。
