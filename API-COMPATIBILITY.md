# 原库接口对应与剩余差距 · 0.23

基准为已核验的 amqp091-go 提交 `a0195c6baf35db642d13651cb28938f899062e7c`。下表来自根目录非测试 Go 源文件的 106 条导出命名函数/方法声明，排除非导出接收者，包含构建标签下的 Fuzz。它不是 106 项独立功能，也不涵盖所有结构体字段、常量、接口或运行行为；不能据此计算“追平百分比”。逐条源位置、构建标签和文件 SHA-256 见 [接口清单](evidence/api-surface-audit.json)。

“有入口”仅指已有对应操作及所注明的有限验证，不代表完整兼容。当前优先差距包括：完整 context/Go channel 通知语义、完整 TLS 状态/网络截止时间、自定义 ConnectionRecovery 策略、完整关闭期限与恢复控制交错，以及完整恢复/长期/多版本/性能验证。

0.13 为 11 个宿主方法补 noWait 选项，队列与交换机被动声明复用原方法选项。15 条原库报文逐字节一致；8 个真实 broker 场景结果一致。另有一个明确差异：固定 Go 的 Confirm(true) 仍等待 RabbitMQ 按 no-wait 抑制的回复，本实现不等待且能继续获得发布确认。该项单独记录，未计为行为一致。其余 8 个 Go broker 场景使用 Confirm(false) 隔离此限制。

0.14 补齐 QoS prefetchSize、消费 noLocal、普通/流式发布 immediate、主动 flow 与服务器通知。18 条原库方法报文、1 组通知/自动回复与 9 个 broker 结果一致。QoS 超出线路范围时拒绝（Go 截断），服务器暂停时自动阻止新发布（Go 交由应用），这 2 项差异未计为一致。RabbitMQ 4.0.5 拒绝非零 size、immediate、flow(false)，noLocal 不隔离本连接投递。

0.15 新增独立消费者 AbortSignal，21 组线路/恢复检查通过。两个序列 6 条方法报文、9 个真实 broker 场景一致；并发 RPC 调度、标签复用、离线取消 3 项差异另列。离线取消只移除消费者意图，保留未确认删除的拓扑。原库正常重连后取消也有效。

0.16 补齐确认句柄、排序 confirm/ack/nack 事件及下一发布序号。21 组线路检查、19 条原库方法报文、6 个 peer 结果和 9 个真实 broker 结果通过。零标签 multiple 与非法未来标签的 2 项既有差异另列，不计匹配；保留原有发送取消和等待确认的本地契约。

0.17 补 URI 解析、格式化、凭证转换及实际连接入口；623 个原生解析结果与 18 个 broker 结果一致。6 个输入边界差异样本另列；URI TLS 字节快照恢复单独计为本地能力。精确默认值和优先级见 [URI.md](URI.md)。

0.18 新增属性/地址/TLS/版本查询与属性配置：7 个原生 peer 元数据结果、5 个自定义属性表和 7 个 broker 结果一致；1 个本地 TLS 1.3 恢复。库身份与调用方属性别名差异单列。修复 URI 机制名大小写，详见 [连接元数据](CONNECTION-METADATA.md)。结构字段不在这 106 个声明计数内，新增字段查询也没有计入完成百分比。

0.19 新增自定义拨号、Open 和默认拨号器：6 原生传输结果、7 broker 结果一致，2 本地 TLS 场景；22 本地检查覆盖内存流、背压、期限、所有权和恢复。见 [自定义传输](TRANSPORT.md)。

0.20 新增恢复配置与拓扑快照：14 本地组、7 peer/7 broker 一致，3 本地真实恢复；修复关闭通道残留登记。嵌套参数别名差异见 [拓扑查询](TOPOLOGY.md)；当时的耗尽查询风险已在 0.21 实测并修正。

0.21 补显式重连、耗尽查询和取消通知：14 本地组；每侧 7 查询/取消序列一致、4 完整结果一致；3 类差异单列。见 [恢复控制](RECOVERY-CONTROL.md)。

0.22 补绝对期限关闭：17 本地组，9 peer/11 broker 的返回类别和资源状态一致，1 本地真实投递关闭；两类通知/调度差异见 [限时关闭](CLOSE-DEADLINE.md)。

0.23 提供自定义 TopologyRecovery 及默认委托：25 本地组，10 peer/12 broker 已测结果一致；原生发现的单通道失败重试边界已修正，详见 [自定义拓扑策略](TOPOLOGY-STRATEGY.md)。

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
| `TopologyConfiguration.Clone` | structuredClone(topologyConfiguration()) | 每次查询已深复制，可再复制；原库嵌套 Args 共享引用的差异单列 |
| `Channel.Close` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Channel.IsClosed` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Channel.NotifyStateChange` | 恢复对象 stateChange / ready / recovered | 部分；普通物理对象无同形状态事件 |
| `Channel.NotifyClose` | close / return / cancel / blocked / unblocked 事件 | 事件接口不同于 Go channel；监听者阻塞/关闭语义不相同 |
| `Channel.NotifyRecoveryCancel` | notifyRecoveryCancel() | 当前生命周期的共享 Promise；关闭/耗尽完成，普通断线不完成；不同于 Go channel 调度 |
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
| `Channel.Reconnect` | reconnect() | 加入现有恢复或重放活跃拓扑；有效消费者保留，原库重复标签差异单列；已关闭通道需新建 |
| `Channel.TopologyConfiguration` | topologyConfiguration(global=false) | 本地/全局实体及通道最后 QoS；7 peer/7 broker 一致，3 本地恢复；未覆盖所有恢复交错 |
| `DeferredConfirmation.Done` | 句柄 done / acked / wait({signal, timeout}) | 局部等待独立取消；nack/关闭为 false，关闭另保留 error；预取消优先拒绝，非 Go select 调度复刻 |
| `DeferredConfirmation.Acked` | 句柄 done / acked / wait({signal, timeout}) | 局部等待独立取消；nack/关闭为 false，关闭另保留 error；预取消优先拒绝，非 Go select 调度复刻 |
| `DeferredConfirmation.Wait` | 句柄 done / acked / wait({signal, timeout}) | 局部等待独立取消；nack/关闭为 false，关闭另保留 error；预取消优先拒绝，非 Go select 调度复刻 |
| `DeferredConfirmation.WaitContext` | 句柄 done / acked / wait({signal, timeout}) | 局部等待独立取消；nack/关闭为 false，关闭另保留 error；预取消优先拒绝，非 Go select 调度复刻 |
| `NewConnectionProperties` | MoonBit new_connection_properties / Node newConnectionProperties | 新默认身份表；product/version/platform 标识本库，值不同于 Go；连接时统一覆盖 capabilities |
| `DefaultDial` | defaultDial(timeout)(network, address, {signal}) | TCP/IPv4/IPv6/Windows 命名管道已验证；握手期限完成后清除；异步 Promise 与总期限有差异，Unix-domain socket 平台执行仍待验证 |
| `Dial` | connect(uri, options) / connect({uri, ...options}) | 支持 URI、TLS/EXTERNAL、自定义 properties/dial 与恢复重新拨号；默认值/资源/属性别名、总期限和 Go 完整调度仍有差异 |
| `DialTLS` | connect(uri, options) / connect({uri, ...options}) | 支持 URI、TLS/EXTERNAL、自定义 properties/dial 与恢复重新拨号；默认值/资源/属性别名、总期限和 Go 完整调度仍有差异 |
| `DialTLS_ExternalAuth` | connect(uri, options) / connect({uri, ...options}) | 支持 URI、TLS/EXTERNAL、自定义 properties/dial 与恢复重新拨号；默认值/资源/属性别名、总期限和 Go 完整调度仍有差异 |
| `DialConfig` | connect(uri, options) / connect({uri, ...options}) | 支持 URI、TLS/EXTERNAL、自定义 properties/dial 与恢复重新拨号；默认值/资源/属性别名、总期限和 Go 完整调度仍有差异 |
| `Open` | open(stream, options) / Connection.open | 已连接二进制 Duplex/已有 TLS；库接管关闭；单次物理连接，不自动推断重建方式；总期限与 Node 流校验不同于 Go |
| `Connection.UpdateSecret` | updateSecret | 有入口；原版报文和 OAuth broker 有限对照 |
| `Connection.LocalAddr` | localAddress / connectionInfo.localAddress | 真实 IPv4/IPv6 端点副本；关闭后保留最后物理快照，重连更新 |
| `Connection.RemoteAddr` | remoteAddress / connectionInfo.remoteAddress | 真实 IPv4/IPv6 端点副本；已与独立 peer 两端地址及 Go 核对 |
| `Connection.ConnectionState` | tlsState / connectionInfo.tlsState | 证书/协议/密码套件/授权/ALPN/恢复等 Node 快照；有 TLS 1.2 对照和本地 TLS 1.3 恢复；缺完整 VerifiedChains/OCSP/SCT/exporter 语义 |
| `Connection.NotifyStateChange` | 恢复对象 stateChange / ready / recovered | 部分；普通物理对象无同形状态事件 |
| `Connection.NotifyClose` | close / return / cancel / blocked / unblocked 事件 | 事件接口不同于 Go channel；监听者阻塞/关闭语义不相同 |
| `Connection.NotifyRecoveryCancel` | notifyRecoveryCancel() | 当前生命周期的共享 Promise；关闭/耗尽完成，普通断线不完成；不同于 Go channel 调度 |
| `Connection.NotifyBlocked` | close / return / cancel / blocked / unblocked 事件 | 事件接口不同于 Go channel；监听者阻塞/关闭语义不相同 |
| `Connection.Close` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Connection.CloseDeadline` | closeDeadline(Date / integer Unix milliseconds / null) | 17 本地组、9 peer/11 broker 返回类别及关闭/取消状态一致；通知与恢复拨号等待差异单列；毫秒精度，非完整 Go I/O deadline 等价 |
| `Connection.IsClosed` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Connection.Channel` | close / closed / openChannel | 有入口；关闭、编号重用和恢复已有有限验证 |
| `Connection.Reconnect` | reconnect() | 活跃连接不拨号；并发加入当前恢复；耗尽后可显式重试；原库新建通道 panic 的差异单列 |
| `Connection.IsRecoveryEnabled` | recoveryEnabled | 活动、耗尽、显式关闭及耗尽后重连已原生对照；反映配置和关闭意图，间隔毫秒；不代表所有恢复交错 |
| `Connection.IsTopologyRecoveryEnabled` | topologyRecoveryEnabled | 活动、耗尽、显式关闭及耗尽后重连已原生对照；反映配置和关闭意图，间隔毫秒；不代表所有恢复交错 |
| `Connection.IsConnectionRecoveryEnabled` | connectionRecoveryEnabled | 活动、耗尽、显式关闭及耗尽后重连已原生对照；反映配置和关闭意图，间隔毫秒；不代表所有恢复交错 |
| `Connection.MaxRetryCount` | maxRetryCount | 活动、耗尽、显式关闭及耗尽后重连已原生对照；反映配置和关闭意图，间隔毫秒；不代表所有恢复交错 |
| `Connection.RetryInterval` | retryInterval | 活动、耗尽、显式关闭及耗尽后重连已原生对照；反映配置和关闭意图，间隔毫秒；不代表所有恢复交错 |
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
| `ReconnectionConfig.Clone` | connection.reconnectionConfig | 每次取得独立配置副本，毫秒间隔；终止后保留配置，未提供动态写回 |
| `DefaultConnectionRecovery.OnConnectionClose` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `DefaultConnectionRecovery.OnChannelClose` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `DefaultTopologyRecovery.RecoverTopology` | DefaultTopologyRecovery.recoverTopology(context) / context.restoreDefault() | 25 本地组、10 peer/12 broker 的调用/重建/返回结果等已测字段一致；受限异步上下文，非完整 Go 对象/调度等价 |
| `Error.Error` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Error.Recoverable` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Error.Temporary` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Error.GoString` | 无等价公开入口 | 待补齐或逐项验证；不是已完成能力 |
| `Table.Validate` | MoonBit 字段表编码校验 | 部分；字段类型方言和验证契约仍有明确差异 |
| `Table.SetClientConnectionName` | properties.connection_name | 配置同名字段并发到 start-ok；快照不原地修改调用方表 |
| `ParseURI` | MoonBit parse_uri / Node parseURI | 623 解析/格式化结果一致，6 输入边界差异另列；文本必须有效 UTF-8，输入限 64 KiB |
| `URI.PlainAuth` | URI::plain_auth | 产生 MoonBit PLAIN 初始凭证；仍拒绝嵌入 NUL |
| `URI.AMQPlainAuth` | URI::amqplain_auth | 产生 MoonBit AMQPLAIN LOGIN/PASSWORD 凭证 |
| `URI.String` | URI::to_string / parseURI(...).canonical | 包含密码，仅序列化 TLS 查询；提供 redacted；并非完整配置往返 |

此外，Go Config 的全部拨号/期限行为、属性别名、完整 TLS 状态、若干默认值和无限制参数约定尚未完整对齐。服务端 Properties/Locales/Major/Minor 与配置查询已通过新增字段入口提供有限对照。当前资源上限、Promise/回调、文本/字节表示及异常形态均有本地契约，不能只按方法名称宣布兼容。Go 的日志与 String/Error 辅助方法可用目标语言惯用形式设计，但仍需逐项确定可观察行为。所有 20 项完整追平目标保持未完成。
