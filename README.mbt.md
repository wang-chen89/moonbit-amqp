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

MoonBit 核心提供方法参数、字段表、Basic 属性和 Session 会话 API；Node 宿主提供 TCP/TLS、RPC、心跳、消息确认、自动恢复、多种认证及流式消息收发。恢复不自动重发旧消息或重放旧正文源，完整生产规模验证仍未完成。各功能的使用方式、实测范围和剩余限制见 [README.md](README.md) 与 [FEATURES.md](FEATURES.md)。
