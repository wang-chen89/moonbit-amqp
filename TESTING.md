# Validation contract

- Explicit Wasm-GC and JS targets: no inference from the toolchain default.
- Public API tests plus compiled browser engine, CLI stdin/file/argument and failure exit-code checks.
- 307 seeded bounded malformed inputs including UTF-16 surrogates. The worker has a 20-second limit.
- Local code coverage: `moon coverage analyze -p localreview/amqp -- -f summary`. No coverage upload is configured. Coverage is evidence about current code, not upstream feature coverage.
- Benchmark: 5 warmups and 30 measured documented-example executions; median and p95 recorded locally.
- Generated API and browser artifact must match the same source revision.

CI files are prepared locally; remote CI has not run because this repository has not been uploaded. Compatibility beyond README scope remains unverified.


## 0.21 当前恢复控制验证

- `recovery-control-verify.txt`：JS/Wasm-GC 各 138 项与全部本地检查，含 14 新恢复控制组。
- `recovery-control-native.json`：7 peer/7 broker 查询/取消阶段一致；每侧 4 个完整结果一致；额外 1 个 broker 活跃消费者差异对照；3 个本地真实恢复场景。
- 共 3 类明确差异：幂等 close、耗尽后原库 Channel panic、活跃消费者重复订阅。后两项本库可用性由真实确认发布/get 或实际投递证明，不计为完整匹配。
- `recovery-control-native-initial.json` 及原始 Go 调用程序保留最初原生观察；`recovery-control-cancel-initial.json` 记录在 Go Close 返回瞬间读清理状态的竞态。最终取消比较等待最终 StateClosed，不声称关闭返回时的状态相同。
- 14 个原生/broker 命令和完整本地 fixture 共形成 32 份当前源码绑定报告；另 10 份历史原生/broker 报告未重跑。清单见 `recovery-control-upgrade.json`。
- 原库 72 文件及 17 broker 包核验未变；程序和编译产物指纹分别保存于 `recovery-control-reference-build.json`。无全量恢复策略/调度或代表性性能追平结论。

```powershell
./verify.ps1 -MoonPath /absolute/path/to/moon.exe
$env:AMQP_RECOVERY_CONTROL_REFERENCE='/absolute/path/to/recovery-control-oracle.exe'
$env:RABBITMQ_ROOT='/path/to/extracted/rabbitmq/root'
node tools/test-recovery-control-native.mjs
```

## 0.20 历史恢复查询/拓扑验证

- `topology-verify.txt`：JS/Wasm-GC 各 138 项，完整本地检查含 14 新拓扑组。
- `topology-close-initial.json`：0.19 源码复现显式关闭通道仍保留 idle 队列登记；固定 Go 已移除。新本地/原生检查验证修复。
- `topology-native.json`：7 peer/7 broker 完整分阶段结果一致；3 个本地真实恢复场景；原库嵌套 Args 别名单列 1 差异。
- `topology-reference-build.json`：原库 72 文件未修改，公开 API 调用程序与二进制分别记录指纹。
- 当前共 30 份源码绑定报告：完整本地 fixture 加 13 个原生/broker 命令。另 10 份历史原生/broker 报告未重跑，精确列表见 `topology-upgrade.json`。
- 本轮还重跑自动删除（9 一致/1 差异）、跨通道依赖（2 项明确改进）、本地恢复（6 组）与 Go 两次断线场景，保留各自证明边界。
- 异常终止后 enabled 查询尚无原生执行，源码审查风险见 `topology-terminal-query-audit.json`。无完整策略/恢复交错/代表性性能结论。

```powershell
./verify.ps1 -MoonPath /absolute/path/to/moon.exe
$env:AMQP_TOPOLOGY_REFERENCE='/absolute/path/to/topology-oracle.exe'
$env:RABBITMQ_ROOT='/path/to/extracted/rabbitmq/root'
node tools/test-topology-native.mjs
```

## 0.19 历史自定义传输验证

- `transport-verify.txt`：JS/Wasm-GC 各 138 项与全部本地 fixture/CLI/畸形输入检查；22 新传输组。
- `transport-native.json`：6 原生传输结果、7 broker 结果一致；另计 TLS 失败清理和自定义 TLS 恢复 2 个本地场景。
- 原库由 `transport-reference.go` 调用，72 文件未修改，适配器及二进制指纹见 `transport-reference-build.json`。
- 重跑 metadata-native、uri-reference-validation、uri-broker-validation、rabbitmq-validation、confirmations-native、stream-native、receive-native。其余 14 份历史原生/broker 报告保留旧指纹，不计为本轮执行。
- 无自定义传输/生产负载性能追平结论；Go 与 Node 的总期限、调度、网络和流校验范围见 TRANSPORT.md。

```powershell
./verify.ps1 -MoonPath /absolute/path/to/moon.exe
$env:AMQP_TRANSPORT_REFERENCE='/absolute/path/to/transport-oracle.exe'
$env:RABBITMQ_ROOT='/path/to/extracted/rabbitmq/root'
node tools/test-transport-native.mjs
```

## 0.18 历史连接元数据验证

- `metadata-verify.txt`：JS/Wasm-GC 各 138 项以及全部现有本地 fixture/CLI/异常输入回归；含 14 元数据组、14 URI 组。
- `metadata-native.json`：固定 Go 原库 7 个独立 peer 元数据结果、5 份自定义属性表、7 个真实 broker 结果一致；1 个本地 TLS 1.3 恢复。真实校对 IPv4/IPv6 客户端与服务器两端地址。TLS 1.2 两侧固定相同套件，不将不同协商结果当成属性读取错误。
- `metadata-uri-case-initial.*`：保留 0.17 仅接受小写的失败日志、测试增量及源指纹。原库 setSASL 使用不区分大小写的机制名，本轮 broker 对照证明修复。
- 当前重跑 `uri-reference-validation.json`、`uri-broker-validation.json`、`rabbitmq-validation.json`、`confirmations-native.json`；其它历史原生/broker 报告不作为当前源码新执行证据。
- 元数据比较归一化 Go map 顺序和公开数值/二进制表示；不归一化实际值差异。默认库身份与属性别名共 2 类差异另列。完整 TLS 验证链/OCSP/SCT/exporter 不在已实现范围。

```powershell
./verify.ps1 -MoonPath /absolute/path/to/moon.exe
$env:AMQP_METADATA_REFERENCE='/absolute/path/to/metadata-oracle.exe'
$env:RABBITMQ_ROOT='/path/to/extracted/rabbitmq/root'
node tools/test-metadata-native.mjs
```

原生适配器 `tools/metadata-reference.go` 使用固定且未修改的 Go 原库，构建信息/72 文件指纹保存在 `metadata-reference-build.json`。本轮只记录本机示例和基础确认计时，没有元数据/URI/整体原生性能追平证据。

## 0.17 历史 URI 验证

- `evidence/uri-verify.txt`：原有完整 verify 脚本通过，JS/Wasm-GC 各 132 项；新增 URI 线路检查由 `uri-fixture-log.txt` 单独记录。现 verify.ps1 已纳入该入口。
- `uri-reference-validation.json`：623 条固定 Go 解析/规范化对照，6 条明确差异；原库 72 文件哈希与适配器/二进制哈希见 `uri-reference-build.json`。
- `uri-broker-validation.json`：18 个真实连接结果与原库一致；成功用确认发布/get 验证，拒绝覆盖密码、虚拟主机、客户端证书、服务器身份/信任。1 个本地 TLS 文件快照恢复场景单独计数。
- `rabbitmq-validation.json` 与 `confirmations-native.json` 按当前入口重跑；其它历史原生/broker 报告保留原源码指纹，本轮未重新证明其对当前版本成立。全量本地 fixture 回归通过。
- `uri-broker-forwarding-initial.txt` 保留首次 WSL localhost 转发未就绪错误；该次没有执行连接场景，清理后独立重试退出 0。
- 性能仅有示例和基础确认样本，不是 URI 性能或全库吞吐追平。

```powershell
./verify.ps1 -MoonPath /absolute/path/to/moon.exe
$env:AMQP_URI_REFERENCE='/absolute/path/to/uri-oracle.exe'
node tools/test-uri-reference.mjs
$env:RABBITMQ_ROOT='/path/to/extracted/rabbitmq/root'
node tools/test-uri-broker.mjs
```

URI 参考适配器 `tools/uri-reference.go` 通过 go.mod 的 replace 指向固定、未修改的原库源码，再使用记录的 `GOOS=windows GOARCH=amd64 go build` 编译。只用新适配器调用 ParseURI/DialConfig 等公开入口；Heartbeat 的私有值通过只读 reflect 取数。测试 binary 不随源码分发。临时 broker 使用独立数据目录和端口，结束后关闭并清理；证书文件仅属于测试临时目录。

以下各版本段落是各自执行时的记录，以对应源码指纹为准。

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


## 0.5 恢复验证与复现（历史基线）

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

`waitForReady` 默认 30000 ms，超时或局部 signal 取消只拒绝该 Promise。成功的被动声明不更改恢复登记；明确关闭通道停止该通道/消费者恢复，连接仍可恢复此前成功创建的拓扑。此为 0.5 历史边界，0.8 的关联删除补充见末节。没有覆盖所有回调重入、多版本/多 OS、SASL/认证切换、集群及生产性能；不能宣称已追平。


## 0.6 认证验证与复现（历史基线）

最终 `verify.ps1`：JS/Wasm-GC 各 104 项（原有 91，加 9 个认证契约组及 4 个原库向量组），18 组网络故障、25 组恢复故障、12 组认证故障，原有 CLI/引擎/307 异常输入通过。`tools/generate-auth-vectors.py --check` 验证保存的 30 个原库响应对应当前后端 fixture。其它 19 项未重跑，远程 CI 未运行。

固定原库仍是 `a0195c6baf35db642d13651cb28938f899062e7c`。用上节方法创建另一个 Go 模块，复制 `tools/authentication-reference.go` 为 main.go，保持相同 replace 原库路径，编译原生可执行文件。源码树 72 个文件逐字节保持原样；本地 Go 1.26.0 编译 windows/amd64，指纹见 `evidence/auth-reference-build.json`。本项目没有复制 Go 生产实现。

设置 `AMQP_AUTH_REFERENCE` 为该程序绝对路径后：

```powershell
python tools/generate-auth-vectors.py
node tools/test-auth-native.mjs
node tools/test-authentication.mjs
```

生成器真正执行 Go 的 Authentication.Response，保存完整原始响应；AMQPLAIN 字段顺序来自 Go map，独立解析后按字段名排序，仅为语义对照。共 30 个响应：12 PLAIN、14 AMQPLAIN、1 EXTERNAL、3 自定义二进制/空响应，覆盖 Unicode 非归一化、控制字符、超原先 1024 字符限制、NUL 字段与任意原始字节。生成的 MoonBit fixture 在两个后端重放。9 个协商场景则分别让原生 Go 与 Node 连接同一个独立手写 TCP peer，比较选择、响应/locale 或共同拒绝；不是完整上游测试集。

12 组宿主故障验证提供器只在选中时运行、异步失败/错误类型/长度、取消/超时后的迟到结果抑制、凭证错误脱敏、不匹配时无凭证输出、候选复制、重连重新选择和提供器更新。不宣称运行了所有并发调度。

设置 `RABBITMQ_ROOT` 和 `WSL_DISTRO`（准备方法同上），执行：

```powershell
node tools/test-rabbitmq.mjs
node tools/test-rabbitmq-recovery.mjs
node tools/test-rabbitmq-auth.mjs
```

当前源码上的 22 项基础及 6 组恢复流程重跑通过；新认证脚本增加 10 组真实流程。它启用发行包自带的 rabbitmq_auth_mechanism_ssl，生成一次性 CA/服务端/客户端/未知用户/不受信任客户端证书，在本机临时 broker 实测 AMQPLAIN、EXTERNAL、双向证书校验、3 种拒绝、主机名拒绝、每机制两次重连及两种 CLI roundtrip。测试结束清理 broker、证书与数据库，下载缓存保留；不修改系统认证或服务。报告不保存私钥。旧 0.5 原生 Go 恢复轨迹也在当前 Node 报告上再次对照。

严格边界：PLAIN 的 NUL 拒绝比原库 Response 更严格；locale 必须在公告列表中，而原库直接发送客户端值；候选最多 32、响应最多 1 MiB/配置帧上限/JSON 总限长为本地资源约束。这些不隐藏为无条件 API 等价。SASLprep 不是固定 Go 原库行为，非 ASCII 凭证逐字节对照验证未做归一化。多轮挑战同样不是固定原库支持能力。

本轮性能沿用当前源码下的本机确认样例和恢复延时，尚无原生吞吐比较/生产峰值证明。connection.update-secret、OAuth 令牌刷新、完整恢复/流式/背压、跨版本/平台和长期测试仍未完成。


## 0.7 凭证更新验证（历史版本，0.8 继续回归）

当前完整 verify：JS/Wasm-GC 各 109 项（原有 104 加 5 个 credential update 状态组），旧 18 网络/25 恢复/12 认证组和新 10 更新故障组通过；30 个已存原库认证响应、CLI/引擎/307 异常输入继续通过。新增 TCP 夹具检查二进制 longstr/UTF-8 reason、通道/流控分离、重复请求、错误输入后继续工作、超时/关闭/取消/拒绝、意外确认、断线不重放和不暗改重连凭证。

按前节准备 broker 后运行 `node tools/test-rabbitmq-oauth.mjs`：10 组使用发行包原版 rabbitmq_auth_backend_oauth2，配置独立的一次性 RSA 公钥，测试签发器在本机生成 RS256 JWT。覆盖有效消息、同连接/通道跨过旧 token 到期、权限收回/再授权、坏签名/audience/用户名/到期、TLS 与应用提供器更新后的恢复。没有远程 OAuth 服务、OIDC 发现或 JWKS 下载；这些是服务器/应用集成，未冒充已测试。

`tools/secret-reference.go` 是原创原库调用程序。用前节相同固定 Go 原库 replace 配置建立独立模块编译；本地 Go 1.26.0/windows-amd64 指纹见 `evidence/secret-reference-build.json`，72 个 Go 原库文件逐字节未改。设置 `AMQP_SECRET_REFERENCE` 后执行 `node tools/test-secret-native.mjs`。前六项让 Go/Node 各自连接独立 TCP peer 比对更新字段的完整字节，包括空响应、二进制、Unicode 和 255 字节 reason；后六项两种实现连接同一个真实 OAuth broker，比较更新是否确认、后续确认发布/消费是否成功以及 AMQP 错误码。

固定 RabbitMQ 4.0.5 的过期替代 token：update-secret-ok 返回后，下一授权操作被 403 拒绝；固定 Go 原库和本实现一致。首次“更新必须立即拒绝”的断言失败记录保存在 `oauth-initial-observation.json`；检查该版本 OAuth backend 源码后增加业务操作探测，没有删去失败情形或把它算为成功授权。错误签名/audience/用户名更新则是 530。详见 `secret-native.json` 和 `rabbitmq-oauth.json`。

当前源码重新执行既有 22 基础/6 恢复/10 认证 broker 组、9 原库认证协商和单个原库恢复轨迹。测试结束检查自有 broker 进程/临时目录清理，保留包缓存。旧清单和首次观察带有原来哈希，不代表当前源码；新 `secret-upgrade.json` 绑定最终文件。

所有层次存在覆盖重叠，不能相加成唯一上游用例数。性能只包括当前本机确认样例/恢复延时，不含生产负载或原生吞吐对照。其它 19 项未在本轮重跑，完整追平目标仍未完成。


## 0.8 自动删除恢复验证（历史版本，0.9 继续回归）

第 13 组复现过一个真实的客户端调度缺陷：同一批 TCP 数据内的 consume-ok/cancel 在逻辑 consume Promise 续体之前处理，已取消消费者随后被错误登记。修复让取消同时标记未完成消费，续体不会再登记它。`autodelete-cancel-race-initial.json` 与对应日志保留修复前源码指纹和失败断言；当前 13 组通过记录是修复后的证据。

完整 verify 增加 `node tools/test-autodelete.mjs`。13 组独立 TCP peer 验证最后消费者、跨通道同名标签、未使用实体、参数不同的绑定、源/目标区别、循环图、失败删除、未完成消费/绑定、显式通道关闭、服务端取消和恢复后队列别名。原有核心仍为两个后端各 109 项；其余网络/认证/凭据更新回归继续执行，不把新增宿主组算成 MoonBit 核心测试。

真实集成使用此前相同的 17 个发行包、原版 RabbitMQ 4.0.5 与隔离临时 broker：

```powershell
node tools/test-rabbitmq-autodelete.mjs
# AMQP_AUTODELETE_REFERENCE 指向以下原版 Go adapter 编译得到的可执行文件
node tools/test-autodelete-native.mjs
```

`tools/autodelete-reference.go` 仅解释测试操作并调用固定 Go 原库，不复制其拓扑/恢复算法。按前节 replace 固定提交的方法建立模块，编译 SHA 及 72 个未修改原库文件清单见 `evidence/autodelete-reference-build.json`。`autodelete-scenarios.json` 的同一组操作分别送入 Go/Node；对比变更后和真实断线恢复后的拓扑、跨通道中间检查点，并通过独立非恢复连接的被动声明检查 broker 实体是否存在（0 或 404）。存活队列上的确认发布与取消息证明恢复后可用。

10 个场景有 9 个完全一致；第 10 个故意覆盖空解绑从未绑定的交换机：Go 从登记表中移除交换机，本实现保持登记；broker 两边均保留该交换机。报告 `autodelete-native.json` 将它记作 explainedDifferences=1，不计为 matched。该区别遵循 broker 的“曾有绑定才自动删除”边界，未声称逐行为等同。外部连接的未知绑定/消费者不能由本地登记表推断。

另有 2 个本实现的真实生命周期组：显式关闭最后消费者通道，以及管理连接删除队列后收到 broker cancel。两者重连后队列/交换机均返回 404，未使用的自动删除队列仍存在并能确认发布/取消息。它们不是原库对照组。CI 配置包含新 fixture，但远程 CI 未执行。

最终证据 `autodelete-upgrade.json` 绑定本版源码和检查结果；早期 manifest 与首次失败观察保留历史含义。只运行本机 Windows Node/WSL broker，未建立跨版本、跨平台、集群/长期或原生吞吐性能追平；其余 19 项本轮未重测。


## 0.9 跨通道恢复依赖验证（0.10 继续回归）

`node tools/test-channel-deps.mjs` 的 8 组独立线路测试检查真实输出帧：消费专用通道的跨通道依赖顺序、兄弟通道绑定、无关路由隔离、相关交换机的完整出站路由、transient/none 策略、循环图和未知外部队列。普通 verify 和 CI 配置加入此脚本；远程 CI 没有执行。

`node tools/test-rabbitmq-channel-deps.mjs` 的 6 组真实 RabbitMQ 流程以不存在的队列触发通道 404：兄弟通道声明全部依赖、失败通道仅声明队列、transient 模式、服务端队列名替换、仍被健康通道消费的生成队列名保留，以及两个通道同时故障。每组保持同一 TCP 连接，检查健康通道对象/代数未变、旧未确认标签仍能 ack、健康消费者继续收到确认消息，并验证目标消费者在原路由上重新接收确认消息。修复前第一个场景连续 404 耗尽恢复的记录位于 `channel-deps-initial.json` 和对应日志。

`tools/channel-deps-reference.go` 是原版 Go API 的测试适配器，仍固定相同的 72 文件原库快照。按既有 replace 编译方法生成程序，指纹见 `channel-deps-reference-build.json`。设置 `AMQP_CHANNEL_DEPS_REFERENCE`，执行 `node tools/test-channel-deps-native.mjs`：以独立 broker 被动声明和 consumer-count 检查原库的两项限制，再对应当前 Node 的前两组真实流程。

两项均是明确改进而非匹配：队列由健康通道声明时，原库恢复消费者失败（404）；队列由失败通道声明但路由来自健康通道时，原库恢复队列/消费者却漏掉自动删除的交换机和路由。当前 Node 两者都恢复确认消息投递。`channel-deps-native.json` 的 matched=0、explainedImprovements=2 保留这一区别。既有原库认证、更新、自动删除对照结果继续单独呈现，不把新增改善当成全量上游一致。

最终清单 `channel-deps-upgrade.json` 绑定当前源码/报告。依赖图只覆盖此连接登记的实体；无法凭空发现其它连接的拓扑或恢复未知外部队列。尚未覆盖所有交错、长期断网/集群、多版本/平台或原生吞吐性能。完整 20 项追平目标保持未完成。

## 0.10 发送端流式正文与背压（0.11 继续回归）

`publish_stream_test.mbt` 新增 6 组核心状态/编码测试：完整 UInt64 长度、元数据失败原子性、空正文、同通道顺序、无效块不消耗长度、协商帧上限、多通道交错、流控及通道关闭后复用。JS 和 Wasm-GC 各 115 项通过。

`node tools/test-stream.mjs` 使用独立手写 AMQP peer，正文逐帧 SHA-256，不调用本库解析器且不拼接整个正文。22 组覆盖 12 MiB/4 KiB 分帧、2 MiB 缓冲 API、32 MiB 暂停接收、源暂停与跨通道进展、同通道发布/RPC/ack 顺序、确认计时、无效长度/块、源异常/超时、排队/进行中取消、队列字节/任务数上限、flow/cancel 协议回复、通道关闭/编号复用、断线恢复不重放，以及正常连接关闭排空。慢速组同时断言数据源停止继续生成、socket 待写字节未超配置上限；报告实际读入量和 drain 次数，不把这些数字当作跨机器性能保证。`verify.ps1` 和 CI 配置都加入该脚本，远程 CI 没有运行。

`tools/stream-reference.go` 只调用固定 amqp091-go 的发布/接收 API，通过原版 Go 客户端实际收取 Node 发出的正文，再发布同一字节规律和属性进行比较。原库没有被改造成流式源，它的 Publish 仍持有整个 `[]byte`。按上述固定提交/replace 方法编译，设置 `AMQP_STREAM_REFERENCE`，运行：

```powershell
node tools/test-stream-native.mjs
```

7 组真实 RabbitMQ 流程中，3 组分别比较 2 MiB 缓冲 TCP、12 MiB 流式 TCP、16 MiB 校验服务器证书的 TLS：收到的字节数、SHA-256、ContentType、MessageId、CorrelationId、DeliveryMode、中文和整数 headers 全部一致。其余检查 12 MiB 事务在提交前不可见、提交后正确/回滚后丢弃，64 KiB mandatory 退回，大退回的本地接收上限，以及 broker 拒绝 32 MiB 后兄弟通道仍可用。

首次 32 MiB TLS 成功断言触发 RabbitMQ 406：测试发行版默认 `max_message_size` 为 16 MiB。`stream-broker-size-initial.txt` 保留首次记录，最终测试明确验证该拒绝，并以 16 MiB 核对 TLS 成功路径；没有提高服务器配置来隐藏默认限制。发送端 32 MiB 成功及背压由独立线路 peer 检查。旧 `stream-client-initial.txt` 记录的是原有测试仍要求大于 1 MiB 失败；现按显式缓冲上限测试，并新增 2 MiB 成功对照。

接收/退回仍是完整组装，正文默认 8 MiB，CLI stdin 仍限 1 MiB；发送端进展不代表这些边界已消除。socket 遵循 [Node 24.11 writable/drain 契约](https://nodejs.org/download/release/v24.11.0/docs/api/stream.html#event-drain)。源拥有的块、编码临时对象、GC、内核/TLS 缓冲不计入 `maxBufferedBytes`，报告的进程 RSS/external 只是本次整体采样。没有原生吞吐、长时间并发压力、多平台或多版本验收。

现有认证/更新/恢复/自动删除/依赖、真实 broker 和原库对照均在本版源指纹下重新核验，历史已披露差异继续保留。最终 `stream-upgrade.json` 绑定源码、报告和验证计数；各层重叠，不相加作为全量上游案例数。其它 19 个项目本轮未重跑。

## 0.11 可选流式接收（历史版本，0.12 保持回归）

核心新增 5 组测试，JS/Wasm-GC 各 120 项：UInt64 头部、正文不拼接、空/非空结束边界、非法长度/重复头部/提前正文/方法打断、多通道交错/心跳、通道关闭后重用。默认组装路径不变；新 Session 选项与事件是调用者可选择的接收接口。

`node tools/test-receive-stream.mjs` 的 25 组独立线路测试涵盖大 get/consume/return、字节水位和一字节分片对象水位、慢读/丢弃/提前退出、未完成确认拒绝、截断/过长/停顿、回调异常、正常关闭与断线、同连接多通道、恢复期间的提前流式回调及 recoveryReady。1 秒心跳夹具验证应用背压时暂停接收截止计时，恢复读取后继续检查；单纯读取已完成正文的缓存不会刷新网络活性。没有 return 监听者时普通/恢复连接都排空退回正文。

`tools/receive-reference.go` 调用相同固定提交的未修改 Go 客户端发送正文，并独立接收 mandatory 退回。按前节 replace 方法编译，72 个源码文件核验记录见 `receive-reference-build.json`；设置 `AMQP_RECEIVE_REFERENCE` 后执行 `node tools/test-receive-native.mjs`。8 组真实 broker 流程包含 3 个完整正文/属性对照：12 MiB TCP get、16 MiB 校验证书的 TLS consume、12 MiB mandatory return。另验证丢弃后 nack 重投、QoS=1 等待 ack、强制断线后旧流失败/旧标签拒绝/新 get 重投、关闭未读通道保留兄弟通道，以及普通 Buffer 模式仍以 8 MiB 拒绝大正文。

首次真实大消息测试中，另一个空闲管理连接因心跳超时而关闭。初始日志和当时源码指纹保存在 `receive-heartbeat-initial.txt/.json`。独立空闲探测中流式/普通连接均正常收到心跳；将流式输入解码限制为每个事件循环一批后，相同大消息测试中的管理连接持续可用，8 组全部通过。没有提高测试心跳超时或关闭心跳来规避该问题。

`receiveHighWaterMark` 限制连接级未取走的正文；分片数另在 4096 处触发暂停。解码批次最多 64 KiB，正文缓存上界包含一帧及一批的余量，分片硬上限为 12289；游标出队避免长数组逐个 shift。一字节分片测试验证低于字节水位时也会暂停，随后正文哈希一致。`receive-stream-validation.json` 记录实际字节/分片峰值。`receive-native.json` 同时记录进程内存采样；它不等于仅正文缓存，也不证明 RSS 恒定或生产性能。

流式消息头部可以先于完整正文交给应用，因此部分数据已处理后仍可能遇到失败；应用应等待 completed 再确认，需要业务原子性时由应用负责。恢复期间的流式回调允许先读正文，完成后还需等 recoveryReady 才操作逻辑通道。这是显式开启的新契约，普通 Buffer 回调仍按原规则等待恢复完成。源消费缓慢会阻塞共享 TCP 连接的其他回复，普通 RPC/确认超时仍可能触发；未声称具有独立通道网络背压。

心跳依据 [RabbitMQ 心跳说明](https://www.rabbitmq.com/docs/heartbeats)，最终运行采用同一 RabbitMQ 4.0.5 发行包；该网页的当前版本不替代固定测试版本证据。完整 verify、旧真实 broker/原库对照及新报告由 `receive-upgrade.json` 绑定。CLI stdin 的 1 MiB 限制、完整 API/恢复交错、跨版本/平台、集群/长期和代表性性能仍待补齐。所有操作仅在本地，其他 19 项本轮未重测。

## 0.12 大文件消息 CLI（历史版本，0.13 继续回归）

`node tools/test-broker-files.mjs` 启动真实 Node CLI 子进程，与独立手写 AMQP peer 通信；23 组验证命令/资源参数、文件类型/长度、12 MiB 及空文件发布、未知长度 stdin 暂存前不连接、已知长度 stdin 的短/长错误、nack、大 mandatory return、原子无覆盖安装、安装时才允许 ack、零字节/空队列、目标竞争创建、截断/越界/超时/限额、原始二进制输出和堵塞 stdout。每组检查受控退出后的暂存文件清理。源指纹包括 CLI、文件 helper、输出父子进程、测试子进程 helper 和核心引擎。该脚本已进入 verify 和 CI 配置，未运行远程 CI。

设置 `RABBITMQ_ROOT`、`AMQP_RECEIVE_REFERENCE`、`AMQP_STREAM_REFERENCE`，运行 `node tools/test-broker-files-native.mjs`。它复用已逐字验证 72 原库文件的两个固定 Go 程序及 17 个 RabbitMQ/Erlang 软件包，不修改或重建参考实现。12 组真实流程中，5 组为原版 Go 与 CLI 的内容/属性对照：12 MiB 文件发布、3 MiB 未知长度 stdin、16 MiB 已知长度 stdin/TLS、12 MiB 文件接收、16 MiB raw TLS 接收。其余验证空文件/空队列、接收限额失败后完整重投、已存在文件保留、stdout 断管/堵塞后完整重投、32 MiB broker 拒绝及 TLS 主机名失败后清理。正文按字节数和 SHA-256 比较，原库发布的消息同时比较全部设置的属性。仅在本机 Windows Node 24 + WSL RabbitMQ 4.0.5 上实测，未声称跨平台/长时间/生产性能。

开发时的 stdin 暂存首次使用只写 fd，回读触发 EBADF；改为排他读写 fd。初始日志保留为 `broker-files-spool-initial.txt`。`broker-files-blocked-output-initial.txt` 保留 Windows 同步 stdout 导致超时失效、测试最终杀进程的失败。尝试异步 fs.write 后主循环能报超时，但操作系统写请求仍阻止退出；最终将 stdout 写入移到独立进程，每次最多交付 64 KiB，并在父进程超时后终止它。23 组夹具及真实 broker 堵塞/断管检查以退出码 1 和未确认完整重投证明最终行为；未通过增大超时规避。

这个选择依据 [Node 24.11 进程 I/O 的平台差异](https://nodejs.org/download/release/v24.11.0/docs/api/process.html#a-note-on-process-io) 与 [文件系统 API](https://nodejs.org/download/release/v24.11.0/docs/api/fs.html)。保存使用目标目录的临时文件、sync、close、link；不覆盖目标，无硬链接支持则失败。受控失败会清理暂存文件，强制杀进程、断电、磁盘故障和任意文件系统的持久性没有完整验证。stdout 已输出前缀无法撤回，文件保存与 ack 之间仍有重复交付窗口。

核心与客户端未改动；完整 verify 仍为 JS/Wasm-GC 各 120 项，既有网络/发送/接收/恢复/认证/更新/自动删除/依赖与 307 异常输入保留。改变的旧 CLI broker 路径重新实测；源码未变的原库/真实 broker 报告按源哈希核验后沿用，不能声称这些报告本轮全部重跑。最终 `broker-files-upgrade.json` 绑定全部源码及证据，历史报告和初始失败保留；本轮没有原生吞吐或进程内存性能验收。完整 20 项追平目标仍未完成，其他 19 项没有重跑。

## 0.13 noWait 方法与恢复（历史版本，0.14 继续回归）

`node tools/test-nowait.mjs` 的 17 组独立 TCP 线路测试验证 15 条方法帧的标志位、默认等待、与未结束 RPC 隔离、异步 broker 通道拒绝、同通道大正文排队、立即消费、缓冲/流式迟到投递丢弃、严格布尔验证、编码失败撤销回调、1024 消费者上限、匿名队列占位结果、恢复重放、绑定身份不受 wait 选项影响，以及删除/取消后的恢复登记清理。peer 手写解析 no-wait 位并抑制回复，不使用生产编解码器。verify 和 CI 配置包含该脚本；远程 CI 未运行。核心仍为 JS/Wasm-GC 各 120 项。

`tools/nowait-reference.go` 只调用固定原版 Go 客户端，仍为提交 `a0195c6baf35db642d13651cb28938f899062e7c`，72 个文件逐字核验未修改；构建指纹见 `nowait-reference-build.json`。按前述 replace 编译方式构建 adapter，设置 `AMQP_NOWAIT_REFERENCE`、`RABBITMQ_ROOT` 后执行 `node tools/test-nowait-native.mjs`。Go 与 Node 各自连接独立 peer，15 条方法的类号/方法号/完整参数字节一致。随后使用相同 17 个发行包启动隔离 RabbitMQ 4.0.5：8 个场景比较队列计数占位/实际计数、purge/delete、交换机路由与解绑、consume/cancel、匿名空名称、缺失队列/交换机的延迟 404、非空删除 406、取消后关闭通道重投，以及断线后命名拓扑/消费者恢复，结果相同。

另有一项明确差异：固定 Go `Confirm(true)` 发出的 no-wait 位正确，但 `spec091.go` 的 `confirmSelect.wait()` 无条件返回 true，仍在等待方法回复。原版 RabbitMQ 4.0.5 的 [confirm.select 处理](https://raw.githubusercontent.com/rabbitmq/rabbitmq-server/v4.0.5/deps/rabbit/src/rabbit_channel.erl) 在 no-wait=true 时抑制回复。最终 bounded 探测观察 Go 在连接仍打开时持续等待 300 ms，然后显式关闭；Node 则完成选择并成功确认发布/取回真实消息。`nowait-native.json` 将其记为 explainedDifferences=1，不计为 matched。其余 8 个 Go broker 场景明确使用 `Confirm(false)`，以隔离该参考实现限制；这些比较的是所列操作结果，不是全部会话帧一致。`nowait-confirm-initial.txt` 保留首次 peer 下参考程序等到心跳超时的观察。

无等待完成只证明本地发送；服务器错误可能稍后关闭通道，恢复登记只是发送意图。声明、purge/delete 的零计数不能当作真实计数；匿名无等待返回空名称，不具备生成名追踪能力。无等待消费提前登记，取消后在途投递丢弃但不确认，取消本身不重投未确认消息。确认模式恢复仍正常等待。测试没有涵盖所有回调重入、匿名恢复及拓扑拒绝交错。

`api-surface-audit.json` 对已固定的 18 个根目录非测试 Go 文件记录哈希与 106 个公开名函数/方法声明位置；包括条件编译 Fuzz，不含非公开接收者的方法、所有结构字段/常量/接口。人工对应项见 `API-COMPATIBILITY.md`，仅用于明确剩余工作，不据此声称覆盖百分比或全接口兼容。

当前客户端/恢复源码变化后，旧网络/恢复/认证/更新/自动删除/依赖/收发流/CLI 故障组，真实 broker 与原生 Go 对照均已重跑；30 个已存认证响应仍按源哈希和两后端测试验证。307 异常输入通过，当前文档样例及真实 broker 样本计时保留，未测代表性原生吞吐、长期、多平台或多版本性能。最终 `nowait-upgrade.json` 绑定当前源码/证据，保留历次初始观察与差异；其它 19 项本轮未重测，20 项完整追平目标仍未完成。

## 0.14 通道选项与双向 flow

`channel_options_test.mbt` 增加 2 个核心组，JS/Wasm-GC 各 122 项：四种 mandatory/immediate 组合在普通/流式正文中一致且保留默认字节；主动接收方向 flow、被动发布方向 flow、内容帧顺序与暂停/恢复相互独立。MoonBit 公共 API 仅给 publish/publish_start 增加可选 immediate，编译生成接口 diff 已核对。两个旧 JS 桥接入口保留原参数，增加两个带 flags 的入口。

`node tools/test-channel-options.mjs` 的 15 组独立线路测试包含 UInt32/UInt16 范围与参数位、非法参数不发帧/不迭代源、不同通道隔离、交叉 flow 请求、与 pending RPC 隔离、流式正文前后的命令和自动回复顺序、实际 flow-ok 值、通道拒绝、超时/取消，以及恢复前参数快照和 QoS/消费者顺序。另检查 noLocal 的 wait/noWait 位、immediate 的确认语义和新旧桥接调用约定。测试已加入 verify 和 CI 配置，远程 CI 未运行。

`tools/channel-options-reference.go` 调用相同固定提交的未修改 Go 客户端，72 个源码文件逐字核验；构建指纹见 `channel-options-reference-build.json`。设置 `AMQP_CHANNEL_OPTIONS_REFERENCE`、`RABBITMQ_ROOT` 后运行 `node tools/test-channel-options-native.mjs`。18 条完整方法报文（含最大合法 UInt32 size）、1 组 flow 通知与自动回复序列，以及 9 个真实 broker 场景分别比较，计数之间不代表独立的全量上游案例。

固定 RabbitMQ 4.0.5 下，size=1/4294967295、flow(false)、普通/流式 immediate 发布都以 540 关闭连接，Go 与 Node 相同；另外建立检查连接，确认 immediate 消息没有存入队列。flow(true) 后可以正常发布/取回；noLocal=true 的等待/无等待消费者仍收到本连接发布的消息，重连后也一样。行为与该固定版本的 [服务端方法处理](https://raw.githubusercontent.com/rabbitmq/rabbitmq-server/v4.0.5/deps/rabbit/src/rabbit_channel.erl) 对应，未将“参数发送正确”当作 broker 实现支持，也未在客户端过滤本地消息。

两个 peer 对照差异单列、不计 matched：Go 只验证 QoS 非负，65536/4294967296 转成线路整数后为 0/0；本版拒绝。Go 在服务器 flow(false) 后通知应用但仍允许 Publish，本版核心阻止新发布并可在 flow(true) 后继续；这是既有核心保护，本版补通知入口并补原生证据。发往服务器的主动 flow 控制投递方向，不会停掉本地发布，也不在恢复配置中重放。真实 RabbitMQ 不实现暂停请求，不能用本轮 broker 测试宣称已验证某个其它服务器的完整暂停投递效果。

已有网络、发送/接收、文件 CLI、noWait、恢复、认证、凭证更新、自动删除与跨通道依赖回归及原库对照继续核验，历史差异保留；307 异常输入与文档样例通过。最终清单 `channel-options-upgrade.json` 绑定当前源与报告。尚缺完整消费者取消/确认通知/元数据与 URI 等 API、恢复交错、长期/集群、多平台/多版本及代表性原生性能；其余 19 项本轮没有重跑，全部追平目标保持未完成。

## 0.15 消费者独立取消与恢复

`node tools/test-consumer-cancel.mjs` 的 21 组独立 TCP 线路测试验证预取消与无效 signal 不发帧、等待注册回复、noWait 注册后等待取消确认、普通 RPC 与自动取消排队、共享信号与跨通道隔离、手动/服务端取消后的标签复用、错误与关闭后释放监听器、回调异常、超时、服务端竞争取消、发送/接收正文顺序，以及恢复前后/恢复中的取消。在线确认后自动删除登记清理；离线只删除消费者意图，保留未得到删除确认的拓扑。verify/CI 配置已纳入此脚本；远程 CI 未运行。MoonBit 核心/API 没有变更，JS/Wasm-GC 各 122 项继续通过。

`tools/consumer-cancel-reference.go` 调用固定提交的 `ConsumeWithContext`，72 个上游源码文件保持未修改，构建指纹见 `consumer-cancel-reference-build.json`。按先前 replace 方法编译后设置 `AMQP_CONSUMER_CANCEL_REFERENCE` 与 `RABBITMQ_ROOT`，运行 `node tools/test-consumer-cancel-native.mjs`。等待/无等待注册两个 peer 序列的 6 条方法报文逐字节一致；真实 RabbitMQ 的预取消、活动消费、无等待注册、共享信号、未确认消息、兄弟通道、自动删除、重连前取消、重连完成后取消共 9 个场景结果一致。

另有 3 项单独计数的差异，不计为匹配：

- 在 qos-ok 被扣留时，Go 的 context watcher 会同时发出 basic.cancel；本版等待当前 RPC 回复。Go 探针在捕获取消帧后主动退出，仅证明发帧时机，没有声称并发回复成功或失败。本版另验证释放 qos-ok 后取消完成。
- Go 手动取消后保留旧 context watcher；标签复用后取消旧 context 会终止新订阅。本版随订阅释放监听器，复用标签的新订阅不受影响。
- 代理阻断重连期间取消 context，留出 50 ms 让 Go watcher 运行，其在关闭通道上的 Cancel 不移除恢复登记；恢复后仍消费。本版去掉该消费者意图。原库在正常重连后仍能按 context 取消，不能将离线差异概括为原库信号不支持恢复。

取消不自动确认/重投，已经交付的流式正文仍须排空；注册 Promise 不是取消完成通知。完整 context、所有恢复交错和离线自动删除行为没有宣称对齐。本轮旧网络/恢复/认证/凭证更新/自动删除/依赖/收发流/文件 CLI/noWait/flow 的 source-bound 证据均按当前宿主重跑，既有差异保留。`consumer-cancel-upgrade.json` 绑定最终源码与证据；只记录本机样例和内存观察，没有新增吞吐/生产性能追平结论，其余 19 项未在本轮重测。

## 0.16 发布确认句柄、排序通知与序号

`node tools/test-confirmations.mjs` 的 21 组独立线路检查验证非确认/事务模式返回 null、发送完成与确认完成分离、乱序句柄/排序事件、批量 ack/nack、零标签、非法/重复确认、局部取消/超时、等待者与乱序记录容量、监听器异常、发送流失败、正常关闭排空，以及全连接/单通道恢复的序号与代数。等待者结束会移除信号监听；1024 个等待槽位和 1024 个发布/排序容量边界均有检查。核心没有改变，JS/Wasm-GC 各 122 项；新脚本加入 verify 和 CI 配置，远程 CI 未运行。

`tools/confirmations-reference.go` 调用固定未修改的 amqp091-go `PublishWithDeferredConfirm`、`GetNextPublishSeqNo`、`NotifyPublish/NotifyConfirm`、`Done/Acked/Wait/WaitContext`。仍核验 72 个上游源码文件，构建指纹见 `confirmations-reference-build.json`。按先前 replace 方法编译后设置 `AMQP_CONFIRMATIONS_REFERENCE` 与 `RABBITMQ_ROOT`，运行 `node tools/test-confirmations-native.mjs`。

6 个独立 peer 场景的结果一致：普通模式、乱序、批量 ack、批量 nack、独立取消/超时等待、通道关闭；这些场景同时比较 19 条方法报文字节和各正文 SHA-256。9 个真实 RabbitMQ 场景结果一致：普通、事务、确认消息、1 MiB 流式发送、mandatory 退回、预取消、双通道、连接恢复和单通道恢复。mandatory 可同时得到肯定发布确认与 NO_ROUTE 退回；恢复后的序号为 1，原监听继续通知，旧已确认句柄保持原结果。代数字段是本地补充观察，不冒充 Go API 字段。

2 项既有宿主差异分别保留，不计匹配：零标签 multiple 在本版完成所有未确认句柄，固定 Go 在 60 ms 观察窗内仍等待，随后显式累计标签才完成；未来非法标签在本版关闭连接并使句柄失败，固定 Go 仍保持连接并等待后续有效确认。这里的人工 peer 检查不代表真实 broker 会发送非法序号。局部 wait 取消与发送 source signal 的含义不同；Go 发布 context 在调用开始后不打断 I/O，本版发送取消仍保留原有关闭不完整正文连接的契约。

新确认接口是 Promise/事件形式，不是 Go channel 的阻塞、关闭或 goroutine 调度复刻。局部预取消优先拒绝已结束句柄的 wait；普通 channel close 令 wait 返回 false，并额外保留 error，不伪造 nack 通知。原库/真实 broker 既有 source-bound 套件全部按当前宿主重跑，历史差异保留；最终 `confirmations-upgrade.json` 绑定源码与报告。完整 context/恢复/通知交错、URI/传输/元数据、多平台/版本/集群/长期与生产性能仍未完成，其余 19 项本轮未重测。

资源复查还复现了原有发送入口的无效 signal 泄漏：1025 次 `{signal: {}}` 本地失败错误占用发布额度，正常发布随后被上限拒绝。`confirmations-signal-initial.json/.txt/.patch` 保存修复前指纹、失败与客户端 diff；现在在登记前验证 AbortSignal，连续无效调用后仍能从序号 1 正常发送并确认。该回归属于上述本地失败组，没有另增重复计数。
