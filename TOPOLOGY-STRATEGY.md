# 自定义拓扑恢复策略

0.23.0 支持 `recovery.topologyRecovery: { recoverTopology(context) }`，并从 `tools/client.mjs` 导出 `DefaultTopologyRecovery`。未配置时继续使用默认恢复，`topology: 'none'` 时不调用策略。方法在 connect 时绑定，之后替换对象的方法不改变已连接对象；方法仍以原策略对象为 this，便于保存计数或外部状态。

```js
import {connect, DefaultTopologyRecovery} from './tools/client.mjs';
const defaults = new DefaultTopologyRecovery();
const connection = await connect(process.env.AMQP_URI, {
  recovery: {
    maxRetries: 3,
    topologyRecovery: {
      async recoverTopology(context) {
        const skipped = await defaults.recoverTopology(context);
        for (const channel of context.channels) {
          await channel.declareQueue('dynamic-jobs', {durable: true});
        }
        return skipped;
      }
    }
  }
});
// Use and finally close connection as usual.
```

策略在物理连接/通道打开、QoS 与确认/事务模式恢复后执行。连接恢复传入全部仍登记的逻辑通道；单通道恢复只传该通道。直接返回 undefined 或空数组会替换默认的交换机、队列、绑定和消费者重建，不会隐式调用默认策略。

## 上下文

- `connection`：逻辑连接，用于配置和拓扑查询；普通业务调用仍受恢复状态限制。不要在策略里等待该连接自身 reconnect/waitForReady，否则会等待当前策略完成。
- `channels`：冻结的通道操作视图，含物理 id、logicalId、topologyConfiguration 及公开的声明、绑定、消费、发布、确认、事务等通道操作。视图通过逻辑通道执行，新的声明和消费者会进入恢复登记，之后可交给默认策略继续恢复。策略运行以外的业务代码不会获得恢复期间的调用权限。
- `restoreDefault()`：调用内置声明及消费者恢复，返回跳过实体数组；同次调用上下文内重复调用会共享同一个 Promise，不重复重建。`new DefaultTopologyRecovery().recoverTopology(context)` 委托此方法。
- `resolveQueue(name)`：查询服务器生成队列的当前别名。
- `withChannel(async channel => ...)`：在没有登记通道时也可用临时物理通道声明拓扑。回调结束会关闭该临时通道，因此不要用它建立长期消费者；其声明不会进入逻辑通道登记。连接独占队列的生存期仍由 broker 决定。
- `signal`：本次策略结束、失败、连接关闭/丢失或所属单通道关闭时中止。`keepActive` 标识保留现有会话的手动重放；默认策略会避免重复订阅已有消费者。

上下文结束后，视图操作、restoreDefault 和 withChannel 都拒绝，错误码为 `AMQP_RECOVERY_CONTEXT_EXPIRED`。启动但未返回的通道操作、默认恢复或临时通道任务也会被等待，不会提前报告 ready。显式 await/then/catch 观察的操作错误由回调自行决定如何处理；策略捕获错误并返回成功后，不会被框架再次判为失败。未观察任务的失败仍会使恢复失败。一次普通操作的 RPC 超时仍有效；策略回调本身没有额外执行时限。关闭能中断库对它的等待，但不能终止任意 JavaScript，也不能回滚已经完成的 broker 操作；外部请求/定时器应主动观察 signal。

## 结果和失败

返回 undefined 或 `[{type, name, channel, error, ...}]`。type 为 exchange、queue、queue-binding、exchange-binding 或 consumer；name 是字符串，channel 是非负整数，error 是 Error。返回数组按条复制、冻结后附在 recovered 事件的 skipped 字段；不伪造 broker 错误，也不自动重放返回的跳过项。需要保留默认策略的跳过项时，应返回或扩展 restoreDefault 的返回数组。

连接恢复中策略抛错会关闭该物理尝试并进入配置的下一次重试。单通道重新打开有独立重试，但拓扑阶段抛错只执行一次：显式 channel.reconnect 将错误交还调用者并保留仍打开的通道；自动通道恢复由其拥有者终止失败通道。这一边界已按固定 Go 原库修正，失败不会影响健康兄弟通道。

## 验证范围

25 组独立线路检查覆盖替换/委托、动态声明和消费者后续恢复、返回值验证、重试、临时通道、未返回任务、外部调用隔离、取消、迟到操作及显式/自动通道失败。固定原库的 10 个 peer 场景与 12 个 RabbitMQ 场景比较策略次数、通道范围、拨号次数、返回类别、关闭状态、跳过项和拓扑登记；broker 额外检查实际队列是否存在，含两项 TLS。另有本地连续两次真实重连后的确认发布/原订阅投递。

开发前策略配置被静默忽略，证据见 topology-strategy-initial.json。开发阶段原生对照揭示单通道拓扑失败被重复尝试并终止打开通道，历史报告见 topology-strategy-native-initial.json；最终对照已修复此差异。开发阶段的已处理错误被再次判为致命错误，复现见 topology-strategy-handled-error-initial.json；最终两组捕获/回退测试已修复。当前报告 topology-strategy-native.json 没有未解释的已测结果差异，但受限上下文及 Promise/事件接口不等同 Go 可变对象与 goroutine/channel 调度，不宣称完整行为或性能追平。

自定义 ConnectionRecovery 已在 0.24 提供；完整通知/context/网络期限/TLS、多平台/版本、所有并发交错与代表性原生性能仍未完成。

本轮确认回归曾在固定 Go 的单通道恢复场景发生 504；channel StateOpen 早于后续拓扑恢复完成，原对照程序等待条件不足。现通过委托 DefaultTopologyRecovery 的完成信号再继续业务 RPC，未修改原库或以延时掩盖失败。初次日志与依据保留于 topology-strategy-confirmations-native-initial-failure.txt / topology-strategy-confirmations-wait-fix.json。
