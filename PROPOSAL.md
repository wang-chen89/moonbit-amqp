# AMQP 发布结果判定与连接恢复客户端 · 修订申报草稿

本项目仓库：https://github.com/wang-chen89/moonbit-amqp
模块 / 本地版本：`wang-chen89/amqp` / `0.25.0`；MIT AND BSD-3-Clause AND BSD-2-Clause。
状态：审核结果未知，本轮预防性本地整改，未推送、发布或提交表单。

## 任务与实现
连接中断时，区分已经确认和结果未知的任务，恢复队列/消费者后继续处理新任务，并拒绝属于旧通道的投递标签。
MoonBit处理帧、方法、属性、认证、Session、分块发布和确认账本；Node负责TCP/TLS、流式I/O、确认Promise及重连调度。0.25.0将确认状态与顺序通知落到可复用的纯MoonBit核心，宿主实际调用同一实现。修复先单条ack再批量nack会覆盖已确认通知的问题，新增明确的unknown结果和完整UInt64序号边界。详见[确认契约](docs/CONFIRM-LEDGER.md)。
主例打开发布与消费两条通道，声明exchange、服务端命名队列、binding和QoS；第一条发布收到确认，第二条被测试端接收但在确认前断线。恢复后第二条标为unknown且不自动重发；队列别名随恢复更新；旧delivery tag被拒绝，新tag可以确认，第三条新发布获得确认。

## 已有生态与扩展范围
承认DDD12345-D/moon-amqp已有MoonBit协议编解码和真实broker示例，Zcxssxx/MoonMQ已有内存broker核心。固定提交的moon-amqp文档未提供confirms、TLS和自动恢复；本项目侧重这些失败语义及有界流式传输，但没有直接基于对方代码扩展，不把协议基础、Node宿主或测试脚本称为首创。
固定来源与检索边界见DUPLICATION.md；没有声称生态空白、真实用户、上游认可或协议算法首创。

## 可复现证据
准备README/WORKFLOW中的依赖，构建后运行node examples/run-recovery-workflow.mjs。
主例使用现有手写TCP测试端，按规范独立构造字节，不是独立RabbitMQ。未知结果故障由测试端可控注入；9月23日另重跑过真实RabbitMQ4.0.5恢复检查（历史基线），不能据此称为集群或生产验收。
0.25.0当前源码已通过JS144/Wasm-GC142项核心测试、22组独立线协议端确认检查、23组发送流检查及双后端纯MoonBit例子，证据见[evidence/ledger-20260927](evidence/ledger-20260927/LOCAL-CHECKS.json)。本轮真实RabbitMQ4.0.5的9个确认/恢复场景与固定amqp091-go原生参考一致；另6条受控协议序列一致，保留2项既有差异（zero-tag与非法future-tag处理），详见[native](evidence/ledger-20260927/native.json)。9月23日恢复记录仅为历史基线。没有重跑全部历史原生对照或性能基准。
report.json包含confirmed/unknown/confirmed、automaticallyReplayed=false、oldTagRejected=true和新队列别名。

## 边界和交付
发布Promise在断线时失败不等于消息没有送达。示例不提供持久化outbox、业务ID对账、消费幂等或exactly-once；应用自行决定是否重试。恢复受配置预算、拓扑错误和broker状态限制；生产环境和真实使用方仍未证实。
交付MoonBit核心、Node宿主、可运行任务及原始证据；功能不等于业务采用，测试通过不代表初审通过。
由申报人将公开源码、报名表正文和附件同步为同一版本，避免沿用超过实现范围的旧承诺。

**验收复现与交付状态（2026-09-28 本地）**：以 moonc 0.10.14+7d59c7ec9 通过 `--deny-warn` 检查、JS/Wasm-GC 测试和构建、最小样例和离线 `moon package`；同一代码在 Ubuntu-D 26.04 WSL2 全新解包后通过格式、接口生成、严格双后端检查及 Node 24.21.0 宿主入口。追加的 CI 宿主复核修正了流式背压测试的固定时间假设，以及认证向量生成器与测试源文件不一致的问题；重新生成的 30 组原生向量与测试文件逐字节吻合，MoonBit 库实现及公开接口未变。截至 2026-09-29，公开 Git HEAD 为本地提交祖先；Mooncakes 最新版号 `0.24.0` 较本地 `0.25.0` 仍旧；本次文档、包内容与远端 CI 尚需核对。命令与能力边界见 [README](README.md)，自动检查见 [CI](.github/workflows/ci.yml)；本地通过不代表赛事审核通过。
