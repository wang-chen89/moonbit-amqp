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


## 0.4 当前验证与复现

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
