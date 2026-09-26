# 可移植发布确认账本（0.25.0）

`ConfirmLedger` 是纯 MoonBit 核心，JS 与 Wasm-GC 均可消费。Node 客户端实际使用它，不再单独维护确认排序算法。传输、confirm.select 协商、事务互斥、超时和恢复仍属于宿主；它不是无网络依赖的完整客户端。

## 不变量与修复

- 一次物理通道生存期对应一个不可复用的 epoch；调用者将真实连接/通道生命周期绑定到 epoch。协议帧没有自带 epoch，库不能凭同一数字标签识别跨连接消息。
- 本地参数验证通过、即将写入已排序输出时才 `issue()`。序号从 1 开始，使用完整 UInt64；最大值发出后拒绝继续，不回绕。返回 `next_sequence=None` 表示关闭或序号耗尽。
- 单条确认只能完成待定条目。批量确认只改变仍待定的条目。先 ack(3)，再 nack(3,multiple=true)，结果应是 nack(1)、nack(2)、ack(3)；旧宿主代码会在排序事件中把第三条覆盖为 nack，现已修复。
- `settled` 立即通知对应句柄；`ordered` 在缺口补齐时按序交付。个别结果已经确定但等待排序，也占容量；默认 1024，最大 65536。Node 固定 1024，排队发送与排序缓存共同限额。
- `close()` 只把仍待定的条目返回为 Unknown，已确定的结果保持不变。缺口不会被伪造的 ack/nack 填补；关闭不会自动重放消息。close 幂等。
- 旧 epoch、越界标签、单条重复确认在改变状态前拒绝。批量重复确认可不产生新的结果。
- tag=0 的批量确认是明确兼容选项：核心默认拒绝，Node 为保持既有行为启用。这里不把消费端的 zero-tag 规则当作发布端无条件标准保证。

Node 的 `DeferredConfirmation.outcome` 新增 `pending | confirmed | nacked | unknown`。`wait()` 的旧布尔接口保持兼容：nacked 与 unknown 都返回 false，应结合 outcome/error 区分。等待者自己的超时或取消不会改变发布结果；连接/通道失效使未确认发布变为 unknown。unknown 不能被解释成未送达，业务重试仍需去重或对账。

## 使用与范围

```sh
moon run examples/confirm_core --target wasm-gc
```

预期输出为 `1:nacked`、`2:nacked`、`3:confirmed`、`4:unknown`。这个例子与核心测试无需 Node 网络宿主。核心不持久化，不是 outbox、exactly-once 或业务幂等系统；不替代连接恢复策略。Node 桥接最多保留 4096 个活动确认账本，通道终止时释放。

已有 RabbitMQ 客户端也提供发布确认。此次贡献是 MoonBit 可复用的有界状态语义与宿主真实接入，不宣称发明确认机制。完整旧协议范围见 README-BEFORE-VALUE-REWORK.md，当前验证见 TESTING.md。
