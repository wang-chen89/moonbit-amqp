# 显式重连与恢复取消通知

0.21.0 为 Node 连接/通道提供 `reconnect()` 与 `notifyRecoveryCancel()`，并修正恢复耗尽后的配置查询。

```js
import {connect} from './tools/client.mjs';
// 配置方式及凭证/TLS 入口与 connect 相同。
const connection = await connect(process.env.AMQP_URI, {recovery: true});
const cancelled = connection.notifyRecoveryCancel();
// 已打开时不重新拨号；正在自动恢复时等待同一恢复过程。
await connection.reconnect();
const channel = await connection.openChannel();
await channel.declareQueue('jobs');
await channel.reconnect(); // 对活跃通道重放登记拓扑，保留有效消费者。
await connection.close();
await cancelled; // 只观察取消，不会主动取消连接。
```

## 重连接口

`connection.reconnect()` 返回 Promise<void>。连接打开时直接成功；正在恢复时等待当前过程，共享重试预算和结果，不额外拨号。自动恢复耗尽后，连接/旧通道为 closed，旧登记已清空；恢复配置仍启用，此时可以显式再次尝试。成功后创建新通道和所需拓扑，旧通道对象、未确认发布、消费者和事务不会复活或重发。再次失败则拒绝 Promise，保留配置供下一次显式尝试；不会无限自动重试。

`channel.reconnect()` 加入正在执行的单通道恢复；全连接恢复期间先等待连接恢复。活跃通道会按当前模式重放登记拓扑，保持物理通道、有效确认状态和仍在线的消费者，不重复注册消费者标签。不同通道的恢复串行执行，避免拓扑恢复操作相互干扰。已关闭通道拒绝重连，需重新 openChannel。匿名队列和跨通道依赖仍按本库原有规则处理，已有原库差异见 FEATURES.md。

`close()`、`destroy()` 和连接级 AbortSignal 表达终止意图，永久阻止该连接再次重连，包括在耗尽后调用。未启用恢复的物理连接/通道也拒绝 reconnect。此类拒绝的 Error.code 为 `AMQP_RECOVERY_CLOSED`；真正的拨号/恢复耗尽错误保留错误原因。需要取消整个恢复时使用上述终止入口；单个等待者需要独立取消时仍使用 waitForReady。

耗尽后的 `recoveryEnabled` / `connectionRecoveryEnabled` 仍为 true，topologyRecoveryEnabled 继续取决于模式，maxRetryCount/retryInterval 保留已配置值。这些字段反映配置与显式关闭意图，不代表当前连接可用。查询 closed/state 或等待 reconnect 完成后再发送。显式关闭后 enabled 为 false，次数/间隔为 0，配置副本保留。0.20 的待验证终止查询边界已由本轮原生执行确认并修正。

## 取消通知

`notifyRecoveryCancel()` 返回一个只会成功完成的 Promise<void>。连接或通道显式关闭、销毁或恢复最终失败时完成；普通断线及成功自动恢复不会完成它。已关闭对象的调用立即返回已完成 Promise。连接耗尽后显式成功重连创建新生命周期，旧 Promise 保持已完成，重新调用取得新通知。

同一生命周期内共享一个 Promise，反复取得通知不会不断给连接添加事件监听器。用户自己的 `.then()` 回调仍由用户负责管理。物理连接/通道支持相同通知，即使未启用恢复。该接口是 Go NotifyRecoveryCancel 的 Promise 对应接口，不复制 Go channel 的阻塞与调度模型。连接级外部 AbortSignal 在耗尽后保留一个监听器，以允许用户禁止再次重连；显式终止时释放。

## 证据与明确差异

14 组本地故障/并发检查通过。独立 peer 与真实 RabbitMQ 各执行 7 个配置、查询和取消阶段序列，均一致；其中每侧 4 个场景的完整操作结果一致。另有 1 个真实 broker 活跃消费者对照，以及 3 个本地真实恢复检查。见 [原生报告](evidence/recovery-control-native.json) 和 [当前清单](evidence/recovery-control-upgrade.json)。

以下 3 类差异没有计入完整结果匹配：

1. 对已关闭连接 close：固定 Go 返回 ErrClosed，本库保留原来的幂等成功契约。中断恢复的 Go Close 还可能在最终清理前返回，因此取消场景在最终 StateClosed 后比较，不能用该检查证明 Close 返回时的状态相同。
2. 固定 Go 在恢复耗尽后 Reconnect 返回成功，但随后 Channel 因清空后的登记表发生 panic。适配器捕获该 panic。本库重建可用会话，真实确认发布/get 证明新通道可用。
3. 固定 Go 对活跃消费者再次执行通道 Reconnect，会重复订阅同一标签，触发 broker 拒绝与跳过；实测后续 Confirm 返回 ErrClosed，观察窗口内无投递。本库保留有效消费者，确认发布和实际投递均成功。这是明确改进。

CloseDeadline 已由 0.22 提供，详见 [限时关闭](CLOSE-DEADLINE.md)。仍缺自定义 ConnectionRecovery/TopologyRecovery 策略、完整通知/Go context 调度、所有恢复交错、跨平台/多版本/集群和长期性能验证。已关闭通道重新进入原库恢复流程的全部边界没有验证；本库要求新建通道。本轮没有代表性原生吞吐或性能追平结论。
