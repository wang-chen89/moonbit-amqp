# AMQP 发布结果判定与连接恢复客户端的可运行任务

连接中断时，区分已经确认和结果未知的任务，恢复队列/消费者后继续处理新任务，并拒绝属于旧通道的投递标签。

先按 [README](README.md) 构建并准备依赖，再运行 `node examples/run-recovery-workflow.mjs`，或使用已更新的通用入口 `node examples/run-use-case.mjs`。后者只负责保存stdout和回执，不将运行器本身计为协议贡献。

主例打开发布与消费两条通道，声明exchange、服务端命名队列、binding和QoS；第一条发布收到确认，第二条被测试端接收但在确认前断线。恢复后第二条标为unknown且不自动重发；队列别名随恢复更新；旧delivery tag被拒绝，新tag可以确认，第三条新发布获得确认。

report.json包含confirmed/unknown/confirmed、automaticallyReplayed=false、oldTagRejected=true和新队列别名。

主例使用现有手写TCP测试端，按规范独立构造字节，不是独立RabbitMQ。未知结果故障由测试端可控注入；本轮另重跑真实RabbitMQ4.0.5恢复检查，不能据此称为集群或生产验收。

发布Promise在断线时失败不等于消息没有送达。示例不提供持久化outbox、业务ID对账、消费幂等或exactly-once；应用自行决定是否重试。恢复受配置预算、拓扑错误和broker状态限制；生产环境和真实使用方仍未证实。

完整参数、环境、失败语义及参考实现差异见 [WORKFLOW](WORKFLOW.md)。旧离线报文仍留作解析器小例子，不再作为主任务完成的唯一证据。
