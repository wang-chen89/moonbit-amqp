# AMQP 可靠消息发布与恢复客户端

本地申报候选材料，2026-09-22；模块 `wang-chen89/amqp`，版本 `0.24.0`。团队的公开仓库可能还是先前提交，本次没有推送；最终表单必须指向团队实际上传版本。

## 要解决的任务

连接中断和发布确认交错时，应用需要知道哪些消息已确认、哪些结果未知，恢复拓扑和消费者时不能把旧 delivery tag 发送到新通道。大消息发布还需要处理背压及中途断连。

以下是目标任务和可复现工程证据，不虚构客户、存量部署或采用人数。

## 现有工作与新增贡献

[DDD12345-D/moon-amqp；Zcxssxx/MoonMQ](https://github.com/DDD12345-D/moon-amqp)。承认 DDD12345-D/moon-amqp 已有编解码与 JS broker 会话，MoonMQ 已有 broker 核心。对照固定提交的文档，前者明确不提供 TLS、心跳和 confirms。本项目重点是有界流式发送、确认状态、恢复拓扑和旧 tag 拒绝，不能把所有差异都称作 MoonBit 原生网络实现。未证明对方完全不能通过二次开发实现这些任务。

MoonBit 的 Session::publish_start / publish_body 管理发布状态、协商帧上限和剩余长度；认证协商、增量帧/方法/属性解析和通道状态也在 MoonBit。Node 负责 TCP/TLS、时钟、流式 I/O、确认 Promise 和重连调度。

- [DDD12345-D/moon-amqp 固定提交](https://github.com/DDD12345-D/moon-amqp/tree/57daed7d0c8a6b069b1d043ba76e0b9e9af5979c)：依据该版本的公开说明对照，不冒充本轮运行了对方全部实现。
- [Zcxssxx/MoonMQ 固定提交](https://github.com/Zcxssxx/MoonMQ/tree/234acf400738192f4ddd93d09a038929c144c5bd)：依据该版本的公开说明对照，不冒充本轮运行了对方全部实现。

## 可复现路径

仓库附编译引擎；修改源码后先构建。参考工具的额外依赖与环境变量见 TESTING.md；测试创建的网络服务仅在本机。

```sh
node tools/test-recovery.mjs
node tools/test-stream.mjs
```

本轮独立编码的本机 TCP peer 复现断连、恢复、旧标签、12 MiB 数据散列、队列背压及部分发布失败；23 组流式检查通过。不是本轮新跑的 RabbitMQ 集群验收。 本轮 JS/WasmGC 核心测试及 JS 构建通过，原始日志见 [本轮验证](evidence/innovation-review-20260922/results.json)。测试数量证明所列范围，不能代替创新性论证或推断正式审核通过。

## 边界与来源

不是新协议，也不是 RabbitMQ 完整客户端等价物。断连时未确认消息可能已到达 broker，不能宣称 exactly-once；部分独立测试使用手写 TCP peer，其结果与真实 RabbitMQ 的历史报告分开。

许可证与来源沿用仓库现有 LICENSE/第三方说明，不将标准、算法、词库或参考软件写成本项目发明。查重不是对全生态不存在的证明，日期、相邻项与未覆盖范围见 [DUPLICATION.md](DUPLICATION.md)。
