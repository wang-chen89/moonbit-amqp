# AMQP 发布结果判定与连接恢复客户端：预防性材料修订 · 2026-09-27

本项目仓库：https://github.com/wang-chen89/moonbit-amqp

未收到该项目的具体驳回信，当前审核结果未知。本轮举一反三处理其它项目暴露的“能力表述与仓库证据不一致”风险，不把审查意见先行定性为误审。

MoonBit处理帧、方法、属性、认证、Session、分块发布和确认账本；Node负责TCP/TLS、流式I/O、确认Promise及重连调度。0.25.0将确认状态与顺序通知落到可复用的纯MoonBit核心，宿主实际调用同一实现。修复先单条ack再批量nack会覆盖已确认通知的问题，新增明确的unknown结果和完整UInt64序号边界。详见[确认契约](docs/CONFIRM-LEDGER.md)。

此前主入口只演示离线协议片段，无法直接展示申报中描述的使用流程。现已替换为 `examples/run-recovery-workflow.mjs`：主例打开发布与消费两条通道，声明exchange、服务端命名队列、binding和QoS；第一条发布收到确认，第二条被测试端接收但在确认前断线。恢复后第二条标为unknown且不自动重发；队列别名随恢复更新；旧delivery tag被拒绝，新tag可以确认，第三条新发布获得确认。

主例使用现有手写TCP测试端，按规范独立构造字节，不是独立RabbitMQ。未知结果故障由测试端可控注入；9月23日另重跑过真实RabbitMQ4.0.5恢复检查（历史基线），不能据此称为集群或生产验收。

0.25.0当前源码已通过JS144/Wasm-GC142项核心测试、22组独立线协议端确认检查、23组发送流检查及双后端纯MoonBit例子，证据见[evidence/ledger-20260927](evidence/ledger-20260927/LOCAL-CHECKS.json)。本轮真实RabbitMQ4.0.5的9个确认/恢复场景与固定amqp091-go原生参考一致；另6条受控协议序列一致，保留2项既有差异（zero-tag与非法future-tag处理），详见[native](evidence/ledger-20260927/native.json)。9月23日恢复记录仅为历史基线。没有重跑全部历史原生对照或性能基准。

承认DDD12345-D/moon-amqp已有MoonBit协议编解码和真实broker示例，Zcxssxx/MoonMQ已有内存broker核心。固定提交的moon-amqp文档未提供confirms、TLS和自动恢复；本项目侧重这些失败语义及有界流式传输，但没有直接基于对方代码扩展，不把协议基础、Node宿主或测试脚本称为首创。

发布Promise在断线时失败不等于消息没有送达。示例不提供持久化outbox、业务ID对账、消费幂等或exactly-once；应用自行决定是否重试。恢复受配置预算、拓扑错误和broker状态限制；生产环境和真实使用方仍未证实。

本地版本0.25.0包含修订后的README、PROPOSAL、WORKFLOW和证据入口，旧材料单独归档。不因增加示例就声称创新性异议已解除，也不编造用户。申报人需要同步表单与实际公开提交；本任务没有代申报人发送、推送或提交复审。
