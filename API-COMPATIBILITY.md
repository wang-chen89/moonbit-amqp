# 原库接口对应与剩余差距 · 0.16

基准为已核验的 amqp091-go 提交 `a0195c6baf35db642d13651cb28938f899062e7c`。下表来自根目录非测试 Go 源文件的 106 条导出命名函数/方法声明，排除非导出接收者，包含构建标签下的 Fuzz。它不是 106 项独立功能，也不涵盖所有结构体字段、常量、接口或运行行为；不能据此计算“追平百分比”。逐条源位置、构建标签和文件 SHA-256 见 [接口清单](evidence/api-surface-audit.json)。

“有入口”仅指已有对应操作及所注明的有限验证，不代表完整兼容。当前优先差距包括：完整 context/Go channel 通知语义、连接属性/地址/TLS 状态/自定义传输/URL、显式重连与可读拓扑快照，以及完整恢复/长期/多版本/性能验证。

0.13 为 11 个宿主方法补 noWait 选项，队列与交换机被动声明复用原方法选项。15 条原库报文逐字节一致；8 个真实 broker 场景结果一致。另有一个明确差异：固定 Go 的 Confirm(true) 仍等待 RabbitMQ 按 no-wait 抑制的回复，本实现不等待且能继续获得发布确认。该项单独记录，未计为行为一致。其余 8 个 Go broker 场景使用 Confirm(false) 隔离此限制。

0.14 补齐 QoS prefetchSize、消费 noLocal、普通/流式发布 immediate、主动 flow 与服务器通知。18 条原库方法报文、1 组通知/自动回复与 9 个 broker 结果一致。QoS 超出线路范围时拒绝（Go 截断），服务器暂停时自动阻止新发布（Go 交由应用），这 2 项差异未计为一致。RabbitMQ 4.0.5 拒绝非零 size、immediate、flow(false)，noLocal 不隔离本连接投递。

0.15 新增独立消费者 AbortSignal，21 组线路/恢复检查通过。两个序列 6 条方法报文、9 个真实 broker 场景一致；并发 RPC 调度、标签复用、离线取消 3 项差异另列。离线取消只移除消费者意图，保留未确认删除的拓扑。原库正常重连后取消也有效。

0.16 补齐确认句柄、排序 confirm/ack/nack 事件及下一发布序号。21 组线路检查、19 条原库方法报文、6 个 peer 结果和 9 个真实 broker 结果通过。零标签 multiple 与非法未来标签的 2 项既有差异另列，不计匹配；保留原有发送取消和等待确认的本地契约。

| 原库声明 | 本版入口/对应能力 | 边界 |
|---|---|---|
| `PlainAuth.String` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `PlainAuth.Mechanism` | sasl 提供器 / Authentication | 有限认证响应/协商对照；表示形式与对象 API 不同 |
| `PlainAuth.Response` | sasl 提供器 / Authentication | 有限认证响应/协商对照；表示形式与对象 API 不同 |
| `AMQPlainAuth.String` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `AMQPlainAuth.Mechanism` | sasl 提供器 / Authentication | 有限认证响应/协商对照；表示形式与对象 API 不同 |
| `AMQPlainAuth.Response` | sasl 提供器 / Authentication | 有限认证响应/协商对照；表示形式与对象 API 不同 |
| `ExternalAuth.Mechanism` | sasl 提供器 / Authentication | 有限认证响应/协商对照；表示形式与对象 API 不同 |
| `ExternalAuth.Response` | sasl 提供器 / Authentication | 有限认证响应/协商对照；表示形式与对象 API 不同 |
| `TopologyConfiguration.Clone` | 恢复对象内部 topology | 部分；没有等价的只读配置快照/Clone API，不建议依赖内部可变 Map |
| `Channel.Close` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Channel.IsClosed` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Channel.NotifyStateChange` | 恢复对象 stateChange / ready / recovered | 部分；普通物理对象无同形状态事件 |
| `Channel.NotifyClose` | close / return / cancel / blocked / unblocked 事件 | 事件接口不同于 Go channel；监听者阻塞/关闭语义不相同 |
| `Channel.NotifyRecoveryCancel` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Channel.NotifyFlow` | flow 事件 | 服务器请求自动回复；已有核心在 false 后拒绝新发布，原库仅通知，差异单列 |
| `Channel.NotifyReturn` | close / return / cancel / blocked / unblocked 事件 | 事件接口不同于 Go channel；监听者阻塞/关闭语义不相同 |
| `Channel.NotifyCancel` | close / return / cancel / blocked / unblocked 事件 | 事件接口不同于 Go channel；监听者阻塞/关闭语义不相同 |
| `Channel.NotifyConfirm` | confirm / ack / nack 事件 | 按发布顺序通知，句柄可先乱序结束；恢复保留监听并重置序号，代数区分新旧；事件不是 Go channel 阻塞契约 |
| `Channel.NotifyPublish` | confirm / ack / nack 事件 | 按发布顺序通知，句柄可先乱序结束；恢复保留监听并重置序号，代数区分新旧；事件不是 Go channel 阻塞契约 |
| `Channel.Qos` | qos(count, global, {prefetchSize}) | 有入口；合法 UInt16/UInt32 报文已对照，拒绝越界而原库截断；RabbitMQ 4.0.5 拒绝非零 size |
| `Channel.Cancel` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.QueueDeclare` | declareQueue / passive | 有入口；含 noWait 的有限 broker 对照，非全量域断言验证 |
| `Channel.QueueDeclarePassive` | declareQueue / passive | 有入口；含 noWait 的有限 broker 对照，非全量域断言验证 |
| `Channel.QueueInspect` | declareQueue / passive | 有入口；含 noWait 的有限 broker 对照，非全量域断言验证 |
| `Channel.QueueBind` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.QueueUnbind` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.QueuePurge` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.QueueDelete` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.Consume` | consume(queue, callback, options) | 支持 noWait/noLocal；固定 RabbitMQ 接受 noLocal 但仍投递本连接消息，回调与 Go delivery channel 契约不同 |
| `Channel.ConsumeWithContext` | consume(queue, callback, {signal}) | 有独立 AbortSignal 生命周期；6 报文/9 broker 对照一致；RPC 排队、标签复用、离线取消的 3 项差异单列，非完整 Go context 契约 |
| `Channel.ExchangeDeclare` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.ExchangeDeclarePassive` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.ExchangeDelete` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.ExchangeBind` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.ExchangeUnbind` | 队列/交换机对应操作 | 有入口；适用方法已支持 noWait，恢复仅覆盖已登记实体 |
| `Channel.Publish` | publish / publishStream | 支持 mandatory/immediate；确认模式等待确认而 Go 普通 Publish 只等待发送；发送 signal 可中断 I/O，非完整 context 等价 |
| `Channel.PublishWithContext` | publish / publishStream | 支持 mandatory/immediate；确认模式等待确认而 Go 普通 Publish 只等待发送；发送 signal 可中断 I/O，非完整 context 等价 |
| `Channel.PublishWithDeferredConfirm` | publishWithDeferredConfirm / publishStreamWithDeferredConfirm | 发送后返回只读确认句柄；非确认模式为 null；signal 取消仍按本地发送契约 |
| `Channel.PublishWithDeferredConfirmWithContext` | publishWithDeferredConfirm / publishStreamWithDeferredConfirm | 发送后返回只读确认句柄；非确认模式为 null；signal 取消仍按本地发送契约 |
| `Channel.Get` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.Tx` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.TxCommit` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.TxRollback` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.Flow` | flow(active) | 有入口，返回实际 flow-ok 布尔值；不在恢复配置重放；固定 RabbitMQ 只接受 true |
| `Channel.Confirm` | confirmSelect({noWait}) | 有入口且有意差异：原库 Confirm(true) 等待被抑制回复，本版真正不等待；单独计数 |
| `Channel.Recover` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.Ack` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.Nack` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.Reject` | cancel / get / txSelect / txCommit / txRollback / recover / ack / nack / reject | 有入口；有限线路与 broker 对照，不代表全部交错 |
| `Channel.GetNextPublishSeqNo` | nextPublishSeqNo | 实际发送开始时分配的 BigInt 序号快照，不预留；恢复通道离线时不能查询 |
| `Channel.Reconnect` | 自动恢复 / waitForReady | 部分；没有用户显式重连入口 |
| `Channel.TopologyConfiguration` | 恢复对象内部 topology | 部分；没有等价的只读配置快照/Clone API，不建议依赖内部可变 Map |
| `DeferredConfirmation.Done` | 句柄 done / acked / wait({signal, timeout}) | 局部等待独立取消；nack/关闭为 false，关闭另保留 error；预取消优先拒绝，非 Go select 调度复刻 |
| `DeferredConfirmation.Acked` | 句柄 done / acked / wait({signal, timeout}) | 局部等待独立取消；nack/关闭为 false，关闭另保留 error；预取消优先拒绝，非 Go select 调度复刻 |
| `DeferredConfirmation.Wait` | 句柄 done / acked / wait({signal, timeout}) | 局部等待独立取消；nack/关闭为 false，关闭另保留 error；预取消优先拒绝，非 Go select 调度复刻 |
| `DeferredConfirmation.WaitContext` | 句柄 done / acked / wait({signal, timeout}) | 局部等待独立取消；nack/关闭为 false，关闭另保留 error；预取消优先拒绝，非 Go select 调度复刻 |
| `NewConnectionProperties` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `DefaultDial` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Dial` | connect(options) | 部分；有 TCP/TLS/EXTERNAL 配置，尚缺 URL 解析等价入口和全部配置项 |
| `DialTLS` | connect(options) | 部分；有 TCP/TLS/EXTERNAL 配置，尚缺 URL 解析等价入口和全部配置项 |
| `DialTLS_ExternalAuth` | connect(options) | 部分；有 TCP/TLS/EXTERNAL 配置，尚缺 URL 解析等价入口和全部配置项 |
| `DialConfig` | connect(options) | 部分；有 TCP/TLS/EXTERNAL 配置，尚缺 URL 解析等价入口和全部配置项 |
| `Open` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Connection.UpdateSecret` | updateSecret | 有入口；原版报文和 OAuth broker 有限对照 |
| `Connection.LocalAddr` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Connection.RemoteAddr` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Connection.ConnectionState` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Connection.NotifyStateChange` | 恢复对象 stateChange / ready / recovered | 部分；普通物理对象无同形状态事件 |
| `Connection.NotifyClose` | close / return / cancel / blocked / unblocked 事件 | 事件接口不同于 Go channel；监听者阻塞/关闭语义不相同 |
| `Connection.NotifyRecoveryCancel` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Connection.NotifyBlocked` | close / return / cancel / blocked / unblocked 事件 | 事件接口不同于 Go channel；监听者阻塞/关闭语义不相同 |
| `Connection.Close` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Connection.CloseDeadline` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Connection.IsClosed` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Connection.Channel` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Connection.Reconnect` | 自动恢复 / waitForReady | 部分；没有用户显式重连入口 |
| `Connection.IsRecoveryEnabled` | connect 的 recovery 选项 | 配置能力部分对应；无全部同形只读查询入口 |
| `Connection.IsTopologyRecoveryEnabled` | connect 的 recovery 选项 | 配置能力部分对应；无全部同形只读查询入口 |
| `Connection.IsConnectionRecoveryEnabled` | connect 的 recovery 选项 | 配置能力部分对应；无全部同形只读查询入口 |
| `Connection.MaxRetryCount` | connect 的 recovery 选项 | 配置能力部分对应；无全部同形只读查询入口 |
| `Connection.RetryInterval` | connect 的 recovery 选项 | 配置能力部分对应；无全部同形只读查询入口 |
| `Delivery.Ack` | channel.ack/nack/reject(message.args.delivery-tag) | 能力通过通道提供；消息不是绑定确认方法的 Go Delivery 对象 |
| `Delivery.Reject` | channel.ack/nack/reject(message.args.delivery-tag) | 能力通过通道提供；消息不是绑定确认方法的 Go Delivery 对象 |
| `Delivery.Nack` | channel.ack/nack/reject(message.args.delivery-tag) | 能力通过通道提供；消息不是绑定确认方法的 Go Delivery 对象 |
| `Fuzz` | 原库构建标签下的模糊测试入口 | 不是普通运行期入口；本版已有独立有界异常输入工具，未声称相同 fuzz 契约 |
| `LifeCycleState.String` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `StateChanged.String` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `SetLogger` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `NullLogger.Printf` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `TopologyRecoveryEntityType.String` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `TopologyRecoveryEntity.Error` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `TopologyRecoveryEntity.Unwrap` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `ReconnectionConfig.Clone` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `DefaultConnectionRecovery.OnConnectionClose` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `DefaultConnectionRecovery.OnChannelClose` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `DefaultTopologyRecovery.RecoverTopology` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Error.Error` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Error.Recoverable` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Error.Temporary` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Error.GoString` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Table.Validate` | MoonBit 字段表编码校验 | 部分；字段类型方言和验证契约仍有明确差异 |
| `Table.SetClientConnectionName` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `ParseURI` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `URI.PlainAuth` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `URI.AMQPlainAuth` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `URI.String` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |

此外，Go Config 的自定义 Properties/Dial、服务端属性、若干默认值和无限制参数约定尚未完整对齐。当前资源上限、Promise/回调、文本/字节表示及异常形态均有本地契约，不能只按方法名称宣布兼容。Go 的日志与 String/Error 辅助方法可用目标语言惯用形式设计，但仍需逐项确定可观察行为。所有 20 项完整追平目标保持未完成。
