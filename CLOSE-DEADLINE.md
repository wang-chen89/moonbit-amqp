# 限时关闭连接

0.22.0 为普通物理连接及恢复连接提供 `closeDeadline(deadline)`，返回 Promise<void>。

```js
import {connect} from './tools/client.mjs';
const connection = await connect(process.env.AMQP_URI, {recovery: true});
try {
  const channel = await connection.openChannel();
  await channel.declareQueue('jobs');
  await channel.confirmSelect();
  await channel.publish('', 'jobs', 'confirmed before close');
} finally {
  await connection.closeDeadline(new Date(Date.now() + 2000));
}
```

接受有效 Date、整数 Unix 毫秒或 null。Date 会立即复制时间值，后续修改不影响已开始的关闭。null 对应 Go 的零值 time.Time，表示不设置关闭期限；数字 0 是 Unix 纪元，属于已过期期限。字符串、非整数、NaN、无效 Date 和超出 Date 范围的数字拒绝，且不改变连接或取消通知。精度为毫秒，不提供 Go 纳秒时间类型。

## 完成与失败

有效调用立即表达关闭意图，触发恢复取消通知并禁止恢复连接再次 reconnect。正常状态下先完成已排队的字节发送，再发送 connection.close，等待 close-ok。与原库 CloseDeadline 相同，不等待尚未收到的发布确认；若业务需要确认，请先等待 publish 或确认句柄。未完成确认在连接关闭后失败，不自动重发。

期限同时约束本库排队/流式输出等待和关闭握手；在期限前仍可能因网络、心跳、既有 RPC 或发送进度错误失败。关闭握手自己的等待可超过连接普通 timeout，null 不设关闭计时器；既有操作的独立 timeout 不因此改写。超时 Error.code 为 `AMQP_CLOSE_DEADLINE`，timeout 为 true。即使立即过期也会终止连接、通道、输入流和排队输出，并销毁库接管的传输。

成功 close-ok 后也会销毁接管的传输，不依赖自定义 Duplex 的 final 回调结束。该行为修复了本轮开发阶段发现的“逻辑连接已关闭而自定义流未销毁”问题。自定义流本身的 destroy 实现仍需履行 Node 流契约。

已关闭或正在关闭的连接再次调用 closeDeadline，会以 `AMQP_CONNECTION_CLOSED` 拒绝；已耗尽的恢复连接也会记录显式关闭意图，使 recoveryEnabled 为 false。后来的 deadline 调用不修改先前的关闭期限。原有 close() 入口保留原来的确认等待、默认超时与重复调用行为。

## 恢复及对照边界

恢复期间关闭会取消当前传输生命周期，终止逻辑对象并拒绝尚在等待的 reconnect。对于忽略 AbortSignal 的自定义异步拨号器，关闭可能先返回；工厂以后给出的流仍被销毁。固定 Go 的 CloseDeadline 会先等待占有恢复锁的拨号过程，期限只约束后续握手。因此 50 ms 期限遇到 350 ms 的阻塞拨号时，Go 实测等到拨号完成，本库先完成取消。这项调度差异单列。

另一项差异是关闭通知。Node 始终发出 close 事件并提供终止原因，过期期限也会报告错误；固定 Go 在已过期的写期限场景没有 NotifyClose 错误值，在无回复的读超时场景实测报告了 frame-error 501。不能把其注释“超时不通知”当作所有路径的实际结果。两个接口的事件载荷和 Go channel 调度没有计为一致。

17 组本地检查覆盖输入、过去/远期/清除期限、Date 隔离、确认、卡住的源/接收流、自定义流背压及 final、重复关闭、EOF 和恢复取消。固定原库的 9 个独立 peer 场景与 11 个真实 RabbitMQ 场景，在返回结果类别、关闭状态、通道状态、取消通知及恢复禁用状态方面一致；broker 包含被代理扣留的 close-ok 和 TLS。另有 1 个本地真实确认发布/get 后关闭检查。完整原始通知和耗时保留在 [原生证据](evidence/close-deadline-native.json)，两类差异没有被隐藏或算成完整 API 等价。

当前证据范围见 [本轮清单](evidence/close-deadline-upgrade.json)。没有完整 Go 时间精度/网络期限/调度、所有并发恢复交错或代表性性能追平结论。
