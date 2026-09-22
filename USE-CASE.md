# 诊断抓取的 AMQP 帧

连接中断和发布确认交错时，应用需要知道哪些消息已确认、哪些结果未知，恢复拓扑和消费者时不能把旧 delivery tag 发送到新通道。大消息发布还需要处理背压及中途断连。

## 输入、操作、输出

离线合成 heartbeat 帧；完整发布确认/恢复的范围另见证据，不能由本例推断真实 broker 互通。

最简运行：先按 README 构建，然后 `node examples/run-use-case.mjs`。它自动创建输出目录并执行下面命令。下列 `{out}` 是运行器替换的实际目录，不是直接输入 shell 的变量；stdin 文件由运行器传递，以避免 Windows 与 POSIX 重定向差异。

```text
node tools/inspect.mjs --hex 08000000000000ce
```

观察：输出一条 channel 0 的 heartbeat；不连接 broker。

每一步输出见实际目录下 `step-N.stdout.txt` / `step-N.stderr.txt`；本轮已保存回执见 `evidence/value-rework-20260922/use-case.json`。

## 为什么保留这个实现

需要从 MoonBit 维护协议状态、并由 JS 宿主处理可靠发布时可评估；如果项目只需现成 Node 客户端，没有必要为“原生”再造一套。

承认 DDD12345-D/moon-amqp 已有编解码与 JS broker 会话，MoonMQ 已有 broker 核心。对照固定提交的文档，前者明确不提供 TLS、心跳和 confirms。本项目重点是有界流式发送、确认状态、恢复拓扑和旧 tag 拒绝，不能把所有差异都称作 MoonBit 原生网络实现。未证明对方完全不能通过二次开发实现这些任务。

## 不能由样例推出的结论

不是新协议，也不是 RabbitMQ 完整客户端等价物。断连时未确认消息可能已到达 broker，不能宣称 exactly-once；部分独立测试使用手写 TCP peer，其结果与真实 RabbitMQ 的历史报告分开。

该样例是可修改的使用入口，不能证明存在真实用户、全部兼容或性能领先。继续投入的依据应是明确的输入或接入需求；若对接任务用既有成熟库即可完成，应优先复用而不是为保留参赛数量扩张本项目。
