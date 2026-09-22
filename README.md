# AMQP 可靠消息发布与恢复客户端

**本项目仓库：[https://github.com/wang-chen89/moonbit-amqp](https://github.com/wang-chen89/moonbit-amqp)**

模块 `wang-chen89/amqp`，本地版本 **0.24.0**，MIT。当前评审状态：**条件复审**。本文件是当前入口，旧轮次说明与详细用法保存在 [历史/完整使用说明](README-BEFORE-VALUE-REWORK.md)。

## 解决什么任务

连接中断和发布确认交错时，应用需要知道哪些消息已确认、哪些结果未知，恢复拓扑和消费者时不能把旧 delivery tag 发送到新通道。大消息发布还需要处理背压及中途断连。

需要从 MoonBit 维护协议状态、并由 JS 宿主处理可靠发布时可评估；如果项目只需现成 Node 客户端，没有必要为“原生”再造一套。

## 直接复现

安装 MoonBit 和 Node.js 24，在本仓库根目录运行：

```sh
moon build --target js
node -e "require('node:fs').copyFileSync('_build/js/debug/build/cmd/web/web.js','web/engine.mjs')"
node examples/run-use-case.mjs
```

流程：**诊断抓取的 AMQP 帧**。运行器创建新的系统临时目录，保留每一步的 stdout/stderr、产物及 `report.json`，打印实际目录；重复运行不会覆盖之前产物。它只执行仓库内的本地样例，不连接公网或发送消息。`report.json` 的 `expected` 是应观察的结果，实际结果在各步输出中；成功退出不替代内容核对。

输入性质：离线合成 heartbeat 帧；完整发布确认/恢复的范围另见证据，不能由本例推断真实 broker 互通。

应观察：输出一条 channel 0 的 heartbeat；不连接 broker。

具体命令和输入路径见 [使用任务](USE-CASE.md) 与 [机器可读流程](examples/use-case.json)。只把这个脚本当复现入口，不把通用运行器计作核心技术贡献。

## 实现与已有项目的关系

MoonBit 的 Session::publish_start / publish_body 管理发布状态、协商帧上限和剩余长度；认证协商、增量帧/方法/属性解析和通道状态也在 MoonBit。Node 负责 TCP/TLS、时钟、流式 I/O、确认 Promise 和重连调度。

承认 DDD12345-D/moon-amqp 已有编解码与 JS broker 会话，MoonMQ 已有 broker 核心。对照固定提交的文档，前者明确不提供 TLS、心跳和 confirms。本项目重点是有界流式发送、确认状态、恢复拓扑和旧 tag 拒绝，不能把所有差异都称作 MoonBit 原生网络实现。未证明对方完全不能通过二次开发实现这些任务。

同类项目和检索边界见 [DUPLICATION](DUPLICATION.md)。查重用于避免错误的首创表述；关键词零结果不能证明生态空白，Node 宿主能力也不计为 MoonBit 原生 I/O。

库使用从 [公共 API](pkg.generated.mbti) 和根包源码开始；可在本 checkout 的消费包中导入 `"wang-chen89/amqp"`。源码中的网络/文件宿主入口及完整参数仍见 [完整使用说明](README-BEFORE-VALUE-REWORK.md)。是否已发布到 Mooncakes 需另核实，本文不把 `moon add` 的下载成功作为已完成事项。

## 验证与边界

前一轮工程验证独立编码的本机 TCP peer 复现断连、恢复、旧标签、12 MiB 数据散列、队列背压及部分发布失败；23 组流式检查通过。不是前一轮工程验证新跑的 RabbitMQ 集群验收。

[上一轮工程验证](evidence/innovation-review-20260922/results.json) 与 [本轮最小任务回执](evidence/value-rework-20260922/use-case.json) 分开。历史参考版本、golden 重放、本机 peer、真实第三方服务端和本次样例是不同证据，不能合并成“全部生产验证”。

常规核心检查可运行 `moon check --target js`、`moon test --target js`、`moon test --target wasm-gc`。专项命令：

```sh
node tools/test-recovery.mjs
node tools/test-stream.mjs
```

专项所需的参考环境和历史版本见原使用说明及 TESTING 文档；本轮回执只记录实际执行项，不声称上面所有参考服务在任意环境即装即跑。

不是新协议，也不是 RabbitMQ 完整客户端等价物。断连时未确认消息可能已到达 broker，不能宣称 exactly-once；部分独立测试使用手写 TCP peer，其结果与真实 RabbitMQ 的历史报告分开。

## 复审材料状态

同类实现重叠；尚需由接入方确认恢复/大消息场景与宿主分工足以构成独立贡献。

2026-09-22 匿名新克隆成功；默认分支 `main`，核验公开提交 `010645e553e32ffcc9b419d4363db1754d367a02`。本轮源码修订仅在本地，尚未推送；此记录不证明当时报名表中的地址正确，也不证明新修订已上线。

[申报草稿](PROPOSAL.md) 已压缩为 30 行以内，并单独标明本项目仓库；[复核说明](REVIEW-RESPONSE.md) 区分材料错误、功能变化及尚未解决的问题。没有编造用户、设备接入、生产部署或评审认可。
