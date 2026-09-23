# AMQP 发布结果判定与连接恢复客户端：当前流程与边界

本地版本0.24.1；源码中的网络、存储编排在Node宿主。先按README构建实际引擎，执行 `node examples/run-recovery-workflow.mjs`。

主例打开发布与消费两条通道，声明exchange、服务端命名队列、binding和QoS；第一条发布收到确认，第二条被测试端接收但在确认前断线。恢复后第二条标为unknown且不自动重发；队列别名随恢复更新；旧delivery tag被拒绝，新tag可以确认，第三条新发布获得确认。

主例使用现有手写TCP测试端，按规范独立构造字节，不是独立RabbitMQ。未知结果故障由测试端可控注入；本轮另重跑真实RabbitMQ4.0.5恢复检查，不能据此称为集群或生产验收。

report.json包含confirmed/unknown/confirmed、automaticallyReplayed=false、oldTagRejected=true和新队列别名。

发布Promise在断线时失败不等于消息没有送达。示例不提供持久化outbox、业务ID对账、消费幂等或exactly-once；应用自行决定是否重试。恢复受配置预算、拓扑错误和broker状态限制；生产环境和真实使用方仍未证实。


## 独立 broker 检查

本轮 `node tools/test-rabbitmq-recovery.mjs` 实跑RabbitMQ4.0.5 / Erlang27，共6组。通过提取既有17个Ubuntu依赖包运行临时服务，无系统安装或服务注册；包指纹见 `evidence/workflow-20260923/reports/rabbitmq-recovery.json`。历史脚本和依赖准备方式见 `docs/before-workflow/TESTING.md` 与 `tools/rabbitmq-reference.py`。

`RABBITMQ_ROOT`应指向匹配的已解包Linux依赖根，Windows额外使用WSL；此依赖不会打入源码包。主例不需要RabbitMQ；不能把主例中的确定性“接收后扣留确认”故障冒充为独立broker同样注入。真实broker6组覆盖内容按该报告原样列出。

## 业务决策

失败的发布Promise表示没有拿到成功确认，不足以判定broker拒收。应用应结合业务ID和持久化状态对账；本例仅给出“结果未知”及不自动重发的证据，没有实现对账或消费幂等。重连成功也不能证明业务完成。旧tag检查保护恢复后通道，不是全局重复消费屏障。

新增主例不改变既有核心接口；原23组流式发送与恢复失败测试本轮重跑，旧性能和原生对照没有升级成当前全量结论。
