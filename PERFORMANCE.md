# 0.24 性能补丁：有限收尾

按 2026-09-20 最新要求，AMQP 达到常见流程可用后结束专项扩展。本补丁只优化已测出的字节/十六进制桥接分配；保留全部协议、长度限制、空白和错误优先级。公开 API 和版本身份不变。

初始 V8 采样显示数组 push、hex/unhex 与数组 join 是主要热点；改为预验证后定长 Bytes 分配，并以 ASCII 字节构造十六进制文本。原始诊断与热点见 evidence/performance-initial.json、performance-profile-initial.json；带 profiler 的诊断不计入下表。

固定旧版 `518a96c7e64e3fb2ddb96cf7dc8f38548c1fff07`、固定 Go 原库和当前实现，在同一 Windows 主机、同一 WSL RabbitMQ 实例上轮换顺序运行，3 组负载各 3 轮，27 个独立客户端进程。下表为三轮总耗时中位数之比，越低越快：

| 本机负载 | 发布耗时/旧版 | 接收耗时/旧版 | 发布耗时/Go | 接收耗时/Go |
|---|---:|---:|---:|---:|
| tcp-128-1-get | 1.00× | 0.83× | 151.01× | 2.35× |
| tcp-65536-32-get | 0.64× | 0.65× | 4.77× | 7.98× |
| tls-4096-32-consume | 1.00× | 0.77× | 3.96× | 11.17× |

128 字节为单条确认后继续；64 KiB 为 32 条确认窗口；TLS 4 KiB 为 32 条窗口并使用 consumer 接收。非持久消息、独占 classic 队列、自动确认接收、协商帧 8192 字节。发布计时等到所有确认；接收计时包含逐条正文和有序 message-id 校验，最后检查队列为空。预热和连接初始化不计时。消费者接收包含订阅、排除取消。窗口大于 1 的 p95 是批次延迟，不是单消息延迟。

此为三个有限负载，不代表生产、集群或全面性能追平。原始各轮、极值、批次分布、运行时、源码/二进制/软件包哈希保存在 [性能证据](evidence/performance-native.json)。基线运行时全文件与固定 Git 提交核验。

完整本地 verify 已通过：JS 140 项（138 核心加 2 个桥接边界测试）、Wasm-GC 138 项，全部宿主/CLI/流式/恢复夹具和 307 个异常输入。真实 broker 的本次验证以三个计时负载中的确认、正文、数量、顺序和 TLS 消费为范围；以前 27 份原生/broker 报告未重新运行，仍保留历史日期与源码哈希。

复现：设置 RABBITMQ_ROOT、AMQP_PERFORMANCE_REFERENCE、AMQP_PERFORMANCE_BASELINE 为已有解包 broker、固定 Go 适配程序及旧版 tools/web 导出目录；设置 AMQP_PERFORMANCE_SUITE=bounded，执行 node tools/benchmark-native.mjs。省略 suite 可运行更大的预定义矩阵，本轮未运行该矩阵。
