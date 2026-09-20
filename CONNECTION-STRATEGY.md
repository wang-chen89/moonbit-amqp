# 自定义连接恢复决策

0.24.0 支持 `recovery.connectionRecovery`，对象必须同时提供 `onConnectionClose(connection, error, context)` 与 `onChannelClose(channel, error, context)`。方法在 connect 时绑定，保留原对象为 this；之后替换方法不影响已有连接。未配置时继续原来的自动恢复。`DefaultConnectionRecovery` 从 `tools/client.mjs` 导出，供回调委托默认处理。

```js
import {connect, DefaultConnectionRecovery} from './tools/client.mjs';
const defaults = new DefaultConnectionRecovery();
const connection = await connect(process.env.AMQP_URI, {
  recovery: {
    connectionRecovery: {
      onConnectionClose(connection, error, context) {
        return defaults.onConnectionClose(connection, error, context);
      },
      onChannelClose(channel, error, context) {
        // This application chooses to discard a channel after a missing queue.
        if (error.code === 404) return context.close();
        return defaults.onChannelClose(channel, error, context);
      }
    }
  }
});
// Use the connection and close it in the application's finally block.
```

## 决策与状态

回调只针对异常物理会话丢失。初始拨号失败、应用主动关闭、已经由连接/拓扑恢复持有的内部故障，不会重复启动策略；整条连接断开可分别通知连接与受影响通道，两个种类的顺序不构成契约。

不调用任何恢复方法即不自动重连。此时逻辑对象进入 `disconnected`，保留期望拓扑、消费者与取消观察器，普通业务操作拒绝，waitForReady 等待后续恢复。`closed` 表示逻辑对象已终止，因而 disconnected 对象的 closed 仍为 false；这不同于 Go IsClosed 的物理传输语义。原生对照使用物理关闭状态，不能把它当作逻辑生命周期完全相同。

应用随后可调用 connection.reconnect 或 channel.reconnect；原逻辑通道/消费者继续使用。recoveryEnabled 反映配置与显式关闭意图，回调不做动作不会把它改为 false。notifyRecoveryCancel 在 disconnected 时不完成，关闭、终止或耗尽时才完成。

异步回调可等待自身的外部条件后决定动作。新物理会话替换、连接关闭、通道关闭或新的损失事件会使旧决策上下文过期；不会因为迟到的旧回调再启动一轮恢复。直接持有的逻辑 connection/channel 仍服从其公开 API 的当前状态约束。

## 上下文和默认委托

- context.connection 为逻辑连接；context.signal 在该回调结束、被替换或取消时中止。库不能终止任意 JavaScript，外部请求与定时器应观察 signal。
- context.reconnect() 采用默认恢复所有权：连接恢复重建原通道；通道恢复在整条连接正在恢复/已失效时不竞争，在局部失败时只重建该通道，致命错误由自动恢复拥有者清理。多个显式调用会加入已开始的任务。
- context.close() 关闭对应逻辑资源。连接开始关闭时就取消尚在等待的策略，不必等 close-ok。
- DefaultConnectionRecovery 的两个方法使用框架传入的第三个参数委托 context.reconnect。应用直接调用默认方法时也应传入当前有效上下文。

结束或被替换后的上下文方法以 `AMQP_RECOVERY_CONTEXT_EXPIRED` 拒绝；回调返回后再安排动作，应改用公开 reconnect，或让回调 await 完整等待过程。回调抛错/拒绝会发出 callbackError，保留应用的手动恢复或关闭选择，不偷偷改成自动重试。这是 Node 异步宿主契约，不等同 Go panic/goroutine 行为。

## 验证和已知差异

22 组独立线路检查覆盖配置、无动作、延迟、默认委托、手动恢复、拓扑/消费者保留、关闭、回调错误、上下文过期、16 通道同时断开、取消与恢复所有权。固定原库 10 个 peer 与 12 个真实 RabbitMQ 场景在回调次数、拨号次数、物理关闭状态、策略标志、取消通知和拓扑登记等已测字段一致；真实 broker 还比较确认发布和取回，含 TLS。另有本地延迟决策后服务器命名队列与原消费者投递流程。

有一类清理差异，在 peer 和 broker 各复现两个路径：策略关闭已经失效的连接/通道时，固定 Go 早退并保留部分拓扑；关闭已失效连接还会留下未完成的通道取消通知。本库保持既有显式关闭契约，清除所属拓扑并完成受影响资源的取消。四个结果单独保留，不计入一致数量。源码依据为 Connection.beginClose / Channel.Close 对已关闭传输的早退路径。原始错误码和 Node 逻辑状态也保留在报告中，不算 Go 通知或调度等价。

实现前配置被忽略的复现见 connection-strategy-initial.json。原生差异的首次失败日志见 connection-strategy-native-initial-failure.txt，完整比较见 connection-strategy-native.json。当前源码、回归与历史报告边界见 connection-strategy-upgrade.json。

仍未完成所有恢复/取消/关闭交错、完整 Go context/通知/网络期限/TLS、跨平台/版本/集群、长期与代表性原生性能追平。
