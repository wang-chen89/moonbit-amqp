> 2026-09-27当前0.25.0：新增纯MoonBit ConfirmLedger负责ACK/NACK集合、通道世代及未知结果；Node继续负责网络和Promise。已修混合累计/乱序确认错误，并以RabbitMQ和原生Go参考核对。以下0.24.1描述是历史范围，当前证据见evidence/ledger-20260927。

# 既有生态关系与本轮范围 · 2026-09-23

承认DDD12345-D/moon-amqp已有MoonBit协议编解码和真实broker示例，Zcxssxx/MoonMQ已有内存broker核心。固定提交的moon-amqp文档未提供confirms、TLS和自动恢复；本项目侧重这些失败语义及有界流式传输，但没有直接基于对方代码扩展，不把协议基础、Node宿主或测试脚本称为首创。

MoonBit处理帧、方法、属性、认证、Session和分块发布状态；Node负责TCP/TLS、流式I/O、确认Promise及重连调度。0.24.1没有新造协议层，增加的是现有公开客户端能力的可运行故障主例。

主例使用现有手写TCP测试端，按规范独立构造字节，不是独立RabbitMQ。未知结果故障由测试端可控注入；本轮另重跑真实RabbitMQ4.0.5恢复检查，不能据此称为集群或生产验收。

发布Promise在断线时失败不等于消息没有送达。示例不提供持久化outbox、业务ID对账、消费幂等或exactly-once；应用自行决定是否重试。恢复受配置预算、拓扑错误和broker状态限制；生产环境和真实使用方仍未证实。

旧定位和固定来源保留于 [历史检索](docs/before-workflow/DUPLICATION.md)。本轮实施前读取对应原文/API与既有代码；注册表20组检索在总交付台账。公开索引不包括全部报名表、私有仓库或未公开分支，不支持“没有对应库”的断言。

固定一手来源：[moon-amqp 57daed7](https://github.com/DDD12345-D/moon-amqp/blob/57daed7d0c8a6b069b1d043ba76e0b9e9af5979c/README.mbt.md)、[MoonMQ 234acf4](https://github.com/Zcxssxx/MoonMQ/blob/234acf400738192f4ddd93d09a038929c144c5bd/README.md)。本轮重新读取公开说明，未宣称实际运行这两个上游项目。
