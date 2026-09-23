# AMQP 发布结果判定与连接恢复客户端

**本项目仓库：[https://github.com/wang-chen89/moonbit-amqp](https://github.com/wang-chen89/moonbit-amqp)**

模块 `wang-chen89/amqp`，本地 **0.24.1**，MIT AND BSD-3-Clause AND BSD-2-Clause。本轮为预防性整改；审核结果未知，没有把本地修订写成已通过。未推送、发布或提交表单。

## 具体任务

连接中断时，区分已经确认和结果未知的任务，恢复队列/消费者后继续处理新任务，并拒绝属于旧通道的投递标签。

MoonBit处理帧、方法、属性、认证、Session和分块发布状态；Node负责TCP/TLS、流式I/O、确认Promise及重连调度。0.24.1没有新造协议层，增加的是现有公开客户端能力的可运行故障主例。

## 可运行主例

无需额外broker即可运行故障主例；真实RabbitMQ复测的依赖和17个包指纹另见下文。

```sh
moon build --target js
node -e "require('node:fs').copyFileSync('_build/js/debug/build/cmd/web/web.js','web/engine.mjs')"
node examples/run-recovery-workflow.mjs
```

主例打开发布与消费两条通道，声明exchange、服务端命名队列、binding和QoS；第一条发布收到确认，第二条被测试端接收但在确认前断线。恢复后第二条标为unknown且不自动重发；队列别名随恢复更新；旧delivery tag被拒绝，新tag可以确认，第三条新发布获得确认。

主例使用现有手写TCP测试端，按规范独立构造字节，不是独立RabbitMQ。未知结果故障由测试端可控注入；本轮另重跑真实RabbitMQ4.0.5恢复检查，不能据此称为集群或生产验收。

运行成功会打印新的系统临时目录。report.json包含confirmed/unknown/confirmed、automaticallyReplayed=false、oldTagRejected=true和新队列别名。 输出位置每次不同，不要求运行标识完全确定。[保存的本轮产物](evidence/workflow-20260923/example-output/report.json)与[全部本轮检查](evidence/workflow-20260923/LOCAL-CHECKS.json)可直接核对。

## 验证与交付边界

JS140/Wasm-GC138项核心测试、恢复与23组流式宿主检查、RabbitMQ6组恢复、引擎和CLI均通过。真实broker流程包括拓扑恢复、未确认消费重投递、旧tag拒绝、事务重建和TLS重连；没有重跑全部历史原生对照或性能基准。

发布Promise在断线时失败不等于消息没有送达。示例不提供持久化outbox、业务ID对账、消费幂等或exactly-once；应用自行决定是否重试。恢复受配置预算、拓扑错误和broker状态限制；生产环境和真实使用方仍未证实。

已有核心API见 [pkg.generated.mbti](pkg.generated.mbti)；完整宿主接口仍见 [先前使用说明](README-BEFORE-VALUE-REWORK.md)。本轮主例/依赖/失败语义见 [WORKFLOW](WORKFLOW.md)。新主例已接入CI配置，但本任务没有运行远程CI。

## 与已有生态关系

承认DDD12345-D/moon-amqp已有MoonBit协议编解码和真实broker示例，Zcxssxx/MoonMQ已有内存broker核心。固定提交的moon-amqp文档未提供confirms、TLS和自动恢复；本项目侧重这些失败语义及有界流式传输，但没有直接基于对方代码扩展，不把协议基础、Node宿主或测试脚本称为首创。

[DUPLICATION](DUPLICATION.md)保留固定来源及检索范围。没有查到相同关键词不构成生态空白证明，也没有编造使用方或上游认可。当前 [申报草稿](PROPOSAL.md)与 [复核说明](REVIEW-RESPONSE.md)对齐实际流程；[此前材料](docs/before-workflow/README.md)仅为历史。

CI固定的编译器与标准库版本见 [TOOLCHAIN.md](TOOLCHAIN.md)；升级时需同时核对生成产物。
