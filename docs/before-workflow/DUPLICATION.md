> 2026-09-22 三份初审反馈后的当前判断：**条件复审**。同类实现重叠；尚需由接入方确认恢复/大消息场景与宿主分工足以构成独立贡献。 本次差异说明：承认 DDD12345-D/moon-amqp 已有编解码与 JS broker 会话，MoonMQ 已有 broker 核心。对照固定提交的文档，前者明确不提供 TLS、心跳和 confirms。本项目重点是有界流式发送、确认状态、恢复拓扑和旧 tag 拒绝，不能把所有差异都称作 MoonBit 原生网络实现。未证明对方完全不能通过二次开发实现这些任务。 以下保留之前检索的固定提交与来源；此前“补足场景”不能理解为本次已解除价值异议。

# amqp 查重与定位 · 2026-09-22

[DDD12345-D/moon-amqp；Zcxssxx/MoonMQ](https://github.com/DDD12345-D/moon-amqp)。承认 DDD12345-D/moon-amqp 已有编解码与 JS broker 会话，MoonMQ 已有 broker 核心。对照固定提交的文档，前者明确不提供 TLS、心跳和 confirms。本项目重点是有界流式发送、确认状态、恢复拓扑和旧 tag 拒绝，不能把所有差异都称作 MoonBit 原生网络实现。未证明对方完全不能通过二次开发实现这些任务。

- [DDD12345-D/moon-amqp 固定提交](https://github.com/DDD12345-D/moon-amqp/tree/57daed7d0c8a6b069b1d043ba76e0b9e9af5979c)：依据该版本的公开说明对照，不冒充本轮运行了对方全部实现。
- [Zcxssxx/MoonMQ 固定提交](https://github.com/Zcxssxx/MoonMQ/tree/234acf400738192f4ddd93d09a038929c144c5bd)：依据该版本的公开说明对照，不冒充本轮运行了对方全部实现。

本轮材料采用定位：**AMQP 可靠消息发布与恢复客户端**。

MoonBit 与宿主分工：MoonBit 的 Session::publish_start / publish_body 管理发布状态、协商帧上限和剩余长度；认证协商、增量帧/方法/属性解析和通道状态也在 MoonBit。Node 负责 TCP/TLS、时钟、流式 I/O、确认 Promise 和重连调度。

本轮证据：本轮独立编码的本机 TCP peer 复现断连、恢复、旧标签、12 MiB 数据散列、队列背压及部分发布失败；23 组流式检查通过。不是本轮新跑的 RabbitMQ 集群验收。 具体输入、脚本、已执行与历史对照分开记录在 [PROPOSAL.md](PROPOSAL.md) 和 evidence/innovation-review-20260922/。

边界：不是新协议，也不是 RabbitMQ 完整客户端等价物。断连时未确认消息可能已到达 broker，不能宣称 exactly-once；部分独立测试使用手写 TCP peer，其结果与真实 RabbitMQ 的历史报告分开。

检索覆盖 Mooncakes 官方关键词/别名、GitHub 仓库查询、GitLink 公开索引、直接来源文档；没有完整赛事报名表、私有仓库、未公开分支或 GitHub 全代码索引。GitLink 索引也不完整。未找到同范围项目不等于生态空白；已有相关项目不自动等于无独立贡献。完整查询和固定提交快照在总交付目录 innovation-review-20260922/。

初次复核风险为“高”。本次补足差异和可复现工作流，没有自行将重叠归零，也不替评委作创新性认定。最终公开代码与表单附件须使用一致版本。
