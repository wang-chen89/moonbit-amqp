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


## 0.9 跨通道恢复依赖验证

`node tools/test-channel-deps.mjs` 的 8 组独立线路测试检查真实输出帧：消费专用通道的跨通道依赖顺序、兄弟通道绑定、无关路由隔离、相关交换机的完整出站路由、transient/none 策略、循环图和未知外部队列。普通 verify 和 CI 配置加入此脚本；远程 CI 没有执行。

`node tools/test-rabbitmq-channel-deps.mjs` 的 6 组真实 RabbitMQ 流程以不存在的队列触发通道 404：兄弟通道声明全部依赖、失败通道仅声明队列、transient 模式、服务端队列名替换、仍被健康通道消费的生成队列名保留，以及两个通道同时故障。每组保持同一 TCP 连接，检查健康通道对象/代数未变、旧未确认标签仍能 ack、健康消费者继续收到确认消息，并验证目标消费者在原路由上重新接收确认消息。修复前第一个场景连续 404 耗尽恢复的记录位于 `channel-deps-initial.json` 和对应日志。

`tools/channel-deps-reference.go` 是原版 Go API 的测试适配器，仍固定相同的 72 文件原库快照。按既有 replace 编译方法生成程序，指纹见 `channel-deps-reference-build.json`。设置 `AMQP_CHANNEL_DEPS_REFERENCE`，执行 `node tools/test-channel-deps-native.mjs`：以独立 broker 被动声明和 consumer-count 检查原库的两项限制，再对应当前 Node 的前两组真实流程。

两项均是明确改进而非匹配：队列由健康通道声明时，原库恢复消费者失败（404）；队列由失败通道声明但路由来自健康通道时，原库恢复队列/消费者却漏掉自动删除的交换机和路由。当前 Node 两者都恢复确认消息投递。`channel-deps-native.json` 的 matched=0、explainedImprovements=2 保留这一区别。既有原库认证、更新、自动删除对照结果继续单独呈现，不把新增改善当成全量上游一致。

最终清单 `channel-deps-upgrade.json` 绑定当前源码/报告。依赖图只覆盖此连接登记的实体；无法凭空发现其它连接的拓扑或恢复未知外部队列。尚未覆盖所有交错、长期断网/集群、多版本/平台或原生吞吐性能。完整 20 项追平目标保持未完成。
