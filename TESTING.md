# Validation contract

- Explicit Wasm-GC and JS targets: no inference from the toolchain default.
- Public API tests plus compiled browser engine, CLI stdin/file/argument and failure exit-code checks.
- 307 seeded bounded malformed inputs including UTF-16 surrogates. The worker has a 20-second limit.
- Local code coverage: `moon coverage analyze -p localreview/amqp -- -f summary`. No coverage upload is configured. Coverage is evidence about current code, not upstream feature coverage.
- Benchmark: 5 warmups and 30 measured documented-example executions; median and p95 recorded locally.
- Generated API and browser artifact must match the same source revision.

CI files are prepared locally; remote CI has not run because this repository has not been uploaded. Compatibility beyond README scope remains unverified.


## 0.3 历史定向验证记录（并非当前状态）

本次只运行受影响 AMQP 项目的 JS 测试、构建和检查入口，没有重复运行 20 项合集验证。80 项测试通过（包含已存的 220 组独立 Pika 字节向量），7 个新增 CLI 场景通过。新版 Wasm-GC 尚未重跑。

```sh
moon test --target js --deny-warn
moon build --target js --deny-warn
# 将本次 cmd/web 构建产物复制到 web/engine.mjs 后：
node tools/test-inspect.mjs
```

需要重新产生独立向量时，单独安装 `pika==1.3.2` 或用 PYTHONPATH 指向解开的 wheel，再运行 `python tools/generate-pika-vectors.py` 和上述测试。普通用户运行测试不需安装 Pika，黄金向量已经保存在仓库。

`python tools/generate-schema.py` 使用随仓库提供的 BSD XML 重新生成方法表；随后运行 `moon fmt`。生成器不会下载文件、上传材料或启动 broker。保留字段/命名域断言、Pika 非共享整数方言、真实 RabbitMQ 网络行为不在这些向量的证明范围内。


## 0.4 历史验证与基础 broker 复现

2026-09-16：核心 JS/Wasm-GC 各 91 项、18 组故障宿主场景、22 项独立 RabbitMQ 4.0.5 流程通过；普通 engine/CLI 与 7 项 inspect CLI 也通过。提交前执行 verify.ps1，包括原有示例微基准和 307 个畸形输入；没有重跑覆盖率或其它 19 项目，较早证据保持原日期和范围。远程 CI 未运行。

```sh
moon fmt
moon info
moon check --target js --deny-warn
moon test --target js --deny-warn
moon test --target wasm-gc --deny-warn
moon build --target js --deny-warn
# 复制当前 _build/js/debug/build/cmd/web/web.js 到 web/engine.mjs
node tools/test-client.mjs
node tools/test-demo.mjs
node tools/test-cli.mjs
node tools/test-inspect.mjs
```

`test-client.mjs` 用规格构造独立线路数据，不调用生产编解码器来伪造服务器。覆盖配置拒绝、分片握手、超时/取消、各通道挂起 RPC 失败、半消息 EOF、broker 关闭回复、乱序/批量/否定/非法确认、丢心跳、坏帧、调参限长、错误属性与阻塞发布。

真实服务器用 Ubuntu 发行包的原始 RabbitMQ 4.0.5/Erlang 27 二进制，未修改实现。提取包而不安装服务，启动单独的 epmd 和 broker，AMQP、TLS、EPMD、分布式端口全部绑定回环地址。临时目录提供证书、配置、数据库和插件解压位置；测试结束杀死进程组并清理临时目录。`erl` 启动包装只把原 erlexec 指向提取目录，因 Debian 自带脚本硬编码了 /usr/lib/erlang。没有更改系统服务、账户或 /usr 配置。

Linux/WSL 准备目录及包（本机实测 Ubuntu resolute，具体版本/包 SHA256 存在 evidence/rabbitmq-validation.json；其它版本依赖可能不同）：

```sh
mkdir -p /tmp/codex-amqp-parity-20260916/packages /tmp/codex-amqp-parity-20260916/root
cd /tmp/codex-amqp-parity-20260916/packages
apt-get download rabbitmq-server erlang-base erlang-asn1 erlang-crypto erlang-eldap erlang-inets erlang-mnesia erlang-os-mon erlang-parsetools erlang-public-key erlang-runtime-tools erlang-snmp erlang-ssl erlang-syntax-tools erlang-tools erlang-xmerl libsctp1
for f in *.deb; do dpkg-deb -x "$f" ../root; done
```

在项目目录运行 Windows PowerShell：

```powershell
$env:RABBITMQ_ROOT='/tmp/codex-amqp-parity-20260916/root'
$env:WSL_DISTRO='Ubuntu-D'
node tools/test-rabbitmq.mjs
```

Linux 直接设置 `RABBITMQ_ROOT` 后运行相同 Node 命令。宿主脚本会启动 Python 临时服务器，等待 WSL localhost 转发就绪，执行 TCP/TLS、队列/交换机/确认/重投/消费取消/事务/错误隔离、证书/主机名和消息 CLI 验证，并自动结束服务器。下载缓存保留以便复现，没有持久运行的 broker。

`rabbitmq-validation.json` 中的计时仅有 4 个预热批次、16 个测量批次，每批并行 8 条 4 KiB 非持久消息，记录全部确认后耗时并检查队列 160 条消息。一个 Windows Node/WSL 本机样本，不证明生产峰值或优于成熟库；没有多 broker 版本、长期断网/磁盘故障、集群或全面压力测试。

## Node 字段表约定

普通对象的字符串自动编码为 UTF-8 longstr；数字只接受 signed int32，非整数用下面的浮点位标签。普通 boolean/null/数组/对象递归转换。`$type` 为保留键。对象形式不能保留重复表键、原始顺序或小整数原始位宽；收到 unsigned32 为 JS number，若超 signed32 范围需显式转换为 int64 标签才能再次编码。需要原始标签无损复发时使用 MoonBit 条目 API。

| 值 | 对象写法 |
|---|---|
| signed64 | `{$type:'int64', value:'-9007199254740993'}` |
| timestamp | `{$type:'timestamp', value:'18446744073709551615'}` |
| Float32 位 | `{$type:'float32-bits', value:1065353216}` |
| Float64 位 | `{$type:'float64-bits', value:'4607182418800017408'}` |
| Decimal | `{$type:'decimal', scale:2, value:1234}` |
| longstr 原始字节 | `{$type:'longstr', hex:'00ff'}` |
| byte array | `{$type:'bytes', hex:'00ff'}` |

接收 longstr 返回带 hex 的对象而非隐式文本转换。普通 Basic `content-type` / `message-id` 等 shortstr 属性直接是字符串，`timestamp` 属性是 uint64 十进制字符串。所有帧格式仍由 MoonBit 编解码。

设计依据：[RabbitMQ 协议符合性](https://www.rabbitmq.com/docs/specification)、[心跳协商](https://www.rabbitmq.com/docs/heartbeats)、[消费者确认与发布确认](https://www.rabbitmq.com/docs/confirms)。服务版本是上述独立实测对象，不据最新在线文档推定所有版本兼容。


## 0.5 恢复验证与复现

2026-09-19 最终源码：完整 `verify.ps1`，JS/Wasm-GC 各 91 项、18 组网络故障、25 组恢复故障、307 个有界异常输入与原有 CLI/引擎检查通过。恢复模块不改动 MoonBit 协议核心，25 组 Node 故障场景单独计数。其余 19 项本轮未重跑。

`node tools/test-recovery.mjs` 使用独立手写的 TCP 线路数据，覆盖重复断线、交叉通道拓扑顺序、旧标签、半完成发布/RPC、跳过或重试实体、消费取消、队列别名、三种恢复模式、资源上限、关闭/取消和重入生命周期。它不是完整 broker 模型。源码哈希在测试开始时记录、结束时复核，期间源文件变化会拒绝出具通过报告。

准备上文 RabbitMQ 运行目录后，设置同样的 `RABBITMQ_ROOT`/`WSL_DISTRO`：

```powershell
node tools/test-rabbitmq.mjs
node tools/test-rabbitmq-recovery.mjs
```

前者 22 项旧流程在当前源码重新运行；后者 6 组使用透明 TCP 代理主动切断真实 socket，覆盖跨通道拓扑/消费、未确认消息重投、真实 404 通道错误隔离、事务恢复、显式关闭和 TLS 重新握手。不是 broker 重启/集群故障测试。`evidence/rabbitmq-recovery.json` 保存每次恢复的实际延时，不把单进程观察推广为吞吐/长期生产性能。两脚本各自结束临时 broker 并清理证书/数据库。

独立 Go 对照固定原库提交 `a0195c6baf35db642d13651cb28938f899062e7c`，来源/归档指纹见 THIRD_PARTY.md。将原库解压到独立目录，在另一个目录建立以下 go.mod，复制 `tools/recovery-reference.go` 为 main.go：

```text
module localreview/recoveryoracle
go 1.20
require github.com/rabbitmq/amqp091-go v0.0.0
replace github.com/rabbitmq/amqp091-go => ../amqp091-go-a0195c6baf35
```

在该目录运行 `go build -o recovery-oracle .`；Windows 可在 WSL 使用 `GOOS=windows GOARCH=amd64 go build -o recovery-oracle.exe .`。本地实测编译器 Go 1.26.0 linux/amd64，产物 windows/amd64。在本项目目录设置 `AMQP_GO_REFERENCE` 为该产物绝对路径，运行 `node tools/test-recovery-native.mjs`。程序只调用未修改原库；三次确认投递和两次断线更名的 5 行轨迹，直接与 Node 实际报告比较。这是一个独立上游场景，不能当作完整上游套件。源码树、构建程序和二进制指纹另存 `evidence/recovery-reference-build.json`。

公开恢复事件：connection/channel `stateChange {from,to,error}`、`ready`、`recovering {attempt,error}`、`recovered {attempt}`、`close(error)`；连接 recovered 额外包含 `skipped`。连接额外发送 `queueNameChanged {queue,previous,current}`、`topologyError {type,name,channel,error}`，保留 blocked/unblocked；通道保留 return/cancel/callbackError。状态为 connecting/open/reconnecting/closing/closed，closed 是终态。通道 `id` 是稳定逻辑标识，不保证等于恢复后的线上 channel number。下划线成员、topology 登记对象为模块内部实现，应用不能修改。

`waitForReady` 默认 30000 ms，超时或局部 signal 取消只拒绝该 Promise。成功的被动声明不更改恢复登记；明确关闭通道停止该通道/消费者恢复，连接仍可恢复此前成功创建的拓扑。对于服务器隐式删除 autoDelete 的完整级联，当前尚未完全模拟。没有覆盖所有回调重入、多版本/多 OS、SASL/认证切换、集群及生产性能；不能宣称已追平。
