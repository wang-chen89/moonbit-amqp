# AMQP 发布结果判定与连接恢复客户端

**本项目仓库：[https://github.com/wang-chen89/moonbit-amqp](https://github.com/wang-chen89/moonbit-amqp)**

模块 `wang-chen89/amqp`，本地 **0.25.0**，MIT AND BSD-3-Clause AND BSD-2-Clause。本轮为预防性整改；审核结果未知，没有把本地修订写成已通过。未推送、发布或提交表单。

## 具体任务

连接中断时，区分已经确认和结果未知的任务，恢复队列/消费者后继续处理新任务，并拒绝属于旧通道的投递标签。

MoonBit处理帧、方法、属性、认证、Session、分块发布和确认账本；Node负责TCP/TLS、流式I/O、确认Promise及重连调度。0.25.0将确认状态与顺序通知落到可复用的纯MoonBit核心，宿主实际调用同一实现。修复先单条ack再批量nack会覆盖已确认通知的问题，新增明确的unknown结果和完整UInt64序号边界。详见[确认契约](docs/CONFIRM-LEDGER.md)。

## 可运行主例

无需额外broker即可运行故障主例；真实RabbitMQ复测的依赖和17个包指纹另见下文。

```sh
moon build --target js
node -e "require('node:fs').copyFileSync('_build/js/debug/build/cmd/web/web.js','web/engine.mjs')"
node examples/run-recovery-workflow.mjs
```

主例打开发布与消费两条通道，声明exchange、服务端命名队列、binding和QoS；第一条发布收到确认，第二条被测试端接收但在确认前断线。恢复后第二条标为unknown且不自动重发；队列别名随恢复更新；旧delivery tag被拒绝，新tag可以确认，第三条新发布获得确认。

主例使用现有手写TCP测试端，按规范独立构造字节，不是独立RabbitMQ。未知结果故障由测试端可控注入；9月23日另重跑过真实RabbitMQ4.0.5恢复检查（历史基线），不能据此称为集群或生产验收。

运行成功会打印新的系统临时目录。report.json包含confirmed/unknown/confirmed、automaticallyReplayed=false、oldTagRejected=true和新队列别名。 输出位置每次不同，不要求运行标识完全确定。[保存的本轮产物](evidence/workflow-20260923/example-output/report.json)与[全部本轮检查](evidence/workflow-20260923/LOCAL-CHECKS.json)可直接核对。

## 验证与交付边界

0.25.0当前源码已通过JS144/Wasm-GC142项核心测试、22组独立线协议端确认检查、23组发送流检查及双后端纯MoonBit例子，证据见[evidence/ledger-20260927](evidence/ledger-20260927/LOCAL-CHECKS.json)。本轮真实RabbitMQ4.0.5的9个确认/恢复场景与固定amqp091-go原生参考一致；另6条受控协议序列一致，保留2项既有差异（zero-tag与非法future-tag处理），详见[native](evidence/ledger-20260927/native.json)。9月23日恢复记录仅为历史基线。没有重跑全部历史原生对照或性能基准。

发布Promise在断线时失败不等于消息没有送达。示例不提供持久化outbox、业务ID对账、消费幂等或exactly-once；应用自行决定是否重试。恢复受配置预算、拓扑错误和broker状态限制；生产环境和真实使用方仍未证实。

已有核心API见 [pkg.generated.mbti](pkg.generated.mbti)；完整宿主接口仍见 [先前使用说明](README-BEFORE-VALUE-REWORK.md)。本轮主例/依赖/失败语义见 [WORKFLOW](WORKFLOW.md)。新主例已接入CI配置，但本任务没有运行远程CI。

## 与已有生态关系

承认DDD12345-D/moon-amqp已有MoonBit协议编解码和真实broker示例，Zcxssxx/MoonMQ已有内存broker核心。固定提交的moon-amqp文档未提供confirms、TLS和自动恢复；本项目侧重这些失败语义及有界流式传输，但没有直接基于对方代码扩展，不把协议基础、Node宿主或测试脚本称为首创。

[DUPLICATION](DUPLICATION.md)保留固定来源及检索范围。没有查到相同关键词不构成生态空白证明，也没有编造使用方或上游认可。当前 [申报草稿](PROPOSAL.md)与 [复核说明](REVIEW-RESPONSE.md)对齐实际流程；[此前材料](docs/before-workflow/README.md)仅为历史。

CI固定的编译器与标准库版本见 [TOOLCHAIN.md](TOOLCHAIN.md)；升级时需同时核对生成产物。

## 本地验收与公开交付（2026-09-28）

核心实现使用 MoonBit；[固定编译器](.moonbit-version)为 `moonc 0.10.14+7d59c7ec9`。先按本文安装宿主依赖、运行 `moon update`，再从仓库根目录执行以下与 [CI](.github/workflows/ci.yml) 对齐的检查；可运行任务和适用边界见本文前面的示例与说明。

```sh
moon check --deny-warn
moon test --target wasm-gc --deny-warn
moon test --target js --deny-warn
moon build --target js --deny-warn
moon package
```

跨平台复核（2026-09-28，本地 Ubuntu-D 26.04 WSL2）：从当时的源码归档全新解包，固定 `moonc 0.10.14+7d59c7ec9` 下通过 `moon update`、`moon fmt --check`、`moon info`、严格检查、JS/Wasm-GC 测试及 JS release 构建；Node 24.21.0 跑通本仓一条宿主入口。随后逐项复跑 CI 宿主步骤时，修正了流式发送测试依赖固定等待时间的断言，并使认证向量生成器适配显式 `@amqp` 调用、从固定原生参考重新生成 30 组向量及摘要；MoonBit 库实现、公开接口和 CI 配置未变。最终逐项结果及原始日志在本地交接包中，公开提交后的 GitHub Actions 仍须单独核对。

本地核验：JS/Wasm-GC 核心测试、确认账本和连接恢复检查、认证向量及无 broker 主例通过；真实 RabbitMQ 对照范围见现有证据。 `moon package` 已完成离线打包预检，它不等于已发布到 Mooncakes。

公开交付（2026-09-28 核对）：当日 [https://github.com/wang-chen89/moonbit-amqp](https://github.com/wang-chen89/moonbit-amqp) 可匿名读取 Git HEAD，Mooncakes 在线版本为 `0.24.0`；此处源码版本 `0.25.0` 仍需由团队同步到公开仓库，检查新提交的 GitHub Actions，再由对应账号发布 Mooncakes 新版。相关远端 CI 与赛事结果仍需以实际记录核对。项目许可见 [LICENSE](LICENSE)；如使用第三方材料，其来源和许可见仓内相应说明。
