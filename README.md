# AMQP 0-9-1 编解码与消息客户端

本地候选版 **0.8.0**。MoonBit 实现帧/方法/属性编解码、连接认证协商和通道状态机；Node.js 提供 TCP/TLS、RPC、心跳和消息发布/消费宿主。仓库独立，当前仅供本地审查。

```sh
moon test --target js
moon run cmd/main
node tools/inspect.mjs --schema
node tools/inspect.mjs --binary capture.bin
node tools/inspect.mjs --file frames.hex --assemble
```

不安装 MoonBit 也可使用已经编译的 Node.js CLI 和浏览器演示。`./start-review.ps1` 启动页面；浏览器输入 `inspect:` 加帧十六进制可查看方法和属性，`strict:` 加完整帧流可严格组装消息。二进制输入从帧头开始，不包含 AMQP 连接协议头。

## 实际使用

```mbt
let publish = @amqp.Method::new("basic.publish", [
  Short(0), ShortString(""), ShortString("jobs"), Bit(true), Bit(false),
])
let frames = @amqp.content_frames(
  publish, 1,
  [("content-type", ShortString("text/plain")), ("delivery-mode", Octet(2))],
  b"hello",
)
let assembler = @amqp.Assembler::new(strict_methods=true)
for frame in frames {
  if assembler.push(frame) is Some(content) {
    println(content.basic_header())
    println(content.body)
  }
}
assembler.finish()
```

该调用流程由 `codec_test.mbt` 的完整消息测试验证。安装时的导入名为 `localreview/amqp`；正式发布前由用户确定命名空间。

- `method_names` / `method_spec_by_name` 给出完整方法名、参数顺序和类型。包含 connection、channel、exchange、queue、basic、tx、confirm，以及 XML 中的 RabbitMQ 扩展。
- `Method::encode/decode` 验证参数类型、数量、长度及连接/普通通道区分。连接方法必须使用通道 0；其它方法必须使用非零通道。
- `encode_table/decode_table` 保留字段顺序、重复键、数值位宽、二进制值和浮点原始位。`LongString(Bytes)` 不强制文本转换。
- `BasicHeader` 支持全部 14 个 Basic 属性。属性使用规格名称，例如 `content-type`、`delivery-mode`、`timestamp`。空字符串、零值与未提供字段可以区分。
- `content_frames` 一次生成方法/属性/正文帧；`Assembler` 按通道组装并校验属性、正文长度和总缓冲限制。

## 实际连接与消息

Node.js 24，无第三方运行期依赖。下例连接本地测试服务器；TLS 服务可传 `tls: { ca, servername }`，省略 ca 则使用系统信任。TCP 的 PLAIN 密码认证需显式设置 `allowInsecureAuth: true`。

```js
import {connect} from './tools/client.mjs';
const connection = await connect({
  host: '127.0.0.1', port: 5672,
  username: 'demo', password: process.env.AMQP_PASSWORD,
  allowInsecureAuth: true, timeout: 10000,
});
try {
  const channel = await connection.openChannel();
  const {queue} = await channel.declareQueue('', {exclusive: true});
  await channel.confirmSelect();
  channel.on('return', message => console.error('Unroutable', message.args));
  await channel.publish('', queue, Buffer.from('hello'), {
    mandatory: true, properties: {'content-type': 'text/plain'},
  });
  const message = await channel.get(queue);
  console.log(message.body.toString());
  channel.ack(message.args['delivery-tag']);
  await channel.close();
} finally {
  await connection.close();
}
```

`publish` 在 confirm 模式等待 broker 确认；普通模式仅表示数据已交给本地 socket。`mandatory` 消息无法路由时通过独立的 `return` 事件送回，确认本身不表示已经消费或成功路由。事务模式使用 `txSelect` / `txCommit` / `txRollback`，与 confirm 模式互斥。

`declareExchange` / `deleteExchange`、`declareQueue` / `deleteQueue` / `purgeQueue`、`bindQueue` / `unbindQueue`、`qos`、`consume` / `cancel`、`get`、`ack` / `nack` / `reject` / `recover` 见 [客户端接口](tools/client.mjs)。一个通道只允许一个未结束的 RPC，调用需 `await`；不同通道可并行，发布确认另按序号跟踪。delivery-tag 与 timestamp 使用十进制字符串，避免 JavaScript 53 位整数截断。

消费回调接收 `{body: Buffer, args, properties}`；服务端取消消费者时回调收到 `null`，并触发通道 `cancel` 事件。回调异常触发 `callbackError`，库不自动确认消息。连接/通道关闭触发 `close` 并结束挂起操作。连接级 `signal` 的取消、RPC/确认超时会关闭连接，避免把迟到回复配给新请求。`blocked` / `unblocked` 事件反映服务端资源控制，阻塞期间新发布立即失败。

```sh
node tools/broker.mjs --help
# 配置 AMQP_HOST / AMQP_PORT / AMQP_USER / AMQP_PASSWORD 后：
# TLS 设置 AMQP_TLS=1，可选 AMQP_CA=/path/to/ca.pem
# 仅测试明文连接时设置 AMQP_ALLOW_INSECURE=1
node tools/broker.mjs roundtrip
node tools/broker.mjs publish existing-queue < message.bin
node tools/broker.mjs get existing-queue
```

`roundtrip` 使用临时独占队列。`publish` 验证队列存在并等待确认；`get` 输出正文 Base64 JSON 后发送消费确认，空队列输出 `null`。浏览器页面仍用于线路审查，网络客户端运行在 Node 中。

## 认证机制与客户端证书

默认使用 PLAIN。通过 `sasl` 提供客户端优先顺序；选择第一个在 broker 公告中完整匹配的名称。一次握手选定后认证失败会返回错误，不在该连接上偷偷改用下一个机制。

```js
const connection = await connect({
  host: 'broker.example',
  tls: {ca: caPem, cert: clientCertPem, key: clientKeyPem},
  sasl: [{mechanism: 'EXTERNAL'}],
  recovery: true,
});
console.log(connection.authenticationMechanism);
```

EXTERNAL 身份由 broker 的外部认证机制确定；本版已实测 RabbitMQ 的证书插件，以证书 CN 映射已有用户。服务端须配置和信任客户端证书；仅设置 TLS 不会自动改用 EXTERNAL。`tls` 的证书校验沿用 Node TLS 默认设置。

PLAIN/AMQPLAIN 候选可以各自配置 `username` / `password`，省略时沿用连接级值。例：`sasl: [{mechanism: 'AMQPLAIN'}, {mechanism: 'PLAIN'}]`。AMQPLAIN 由 MoonBit 编码 LOGIN/PASSWORD 字段表，去掉外层长度前缀。凭证保持 UTF-8 原值，**不做 SASLprep 或 Unicode 归一化**，与固定原库一致；PLAIN 内嵌 NUL 仍被本项目拒绝，AMQPLAIN 可以保留。

自定义初始响应使用 `{mechanism: 'TOKEN', response: bytesOrString}`，也可使用 `response: async ({mechanism, signal}) => token`。提供器仅在该候选被选中时调用；它受握手超时和连接取消控制，关闭后返回的迟到结果不会发到网络。默认 TCP 仍须显式 `allowInsecureAuth: true`。这只支持初始响应；多轮 connection.secure 挑战仍不支持，固定 amqp091-go 参考也不实现该路径。

每次重连重新协商原候选列表。内置凭证和静态响应在连接建立时复制，后续修改原数组不改变它们；函数提供器在每次选中的握手上重新调用，可从应用自己的凭证存储获取新值。`connection.updateSecret` 可以更新已建立连接的凭证；提供器更新影响后续握手。令牌的获取和刷新调度由应用负责，与固定 Go 原库的接口边界一致。JS 中不承诺密码内存可靠清零。

最多 32 个候选、每个响应最多 1 MiB，并仍受配置的帧上限约束；JSON 桥认证配置最多 4 MiB。`locale` 默认 en_US，必须由 broker 公告；不支持的 locale 会失败。MoonBit 公开 `Authentication::plain/amqplain/external/custom/deferred`、`Session::with_authentication` 与 `respond_authentication`。延迟认证通过 `AuthenticationRequested(index, mechanism)` 请求初始响应。

消息 CLI 增加 `AMQP_SASL=AMQPLAIN,PLAIN`、`AMQP_LOCALE`、`AMQP_CERT`/`AMQP_KEY`、`AMQP_SERVERNAME`。EXTERNAL 示例配置 `AMQP_TLS=1`、`AMQP_SASL=EXTERNAL`、CA 和客户端证书路径后运行 `node tools/broker.mjs roundtrip`，不把私钥或密码写入命令参数。

## 连接内凭证更新

`await connection.updateSecret(newSecret, reason)` 发送 connection.update-secret 并等待 broker 回复。secret 支持 UTF-8 字符串或 Uint8Array/Buffer，reason 默认 `Credential refreshed`，最多 255 个 UTF-8 字节。secret 沿用 1 MiB 上限，仍受协商帧和 JSON 桥总长度约束。同一连接同时只允许一个凭证更新，独立通道 RPC、发布确认与 blocked/unblocked 通知可继续进行。

```js
// latestToken 由应用自己的令牌获取/刷新流程维护。
let latestToken = initialToken;
const connection = await connect({
  host: 'broker.example', tls: {ca: caPem}, recovery: true,
  sasl: [{mechanism: 'PLAIN', response: () => '\0ignored\0' + latestToken}],
});
// 应用获得新的令牌后，在旧令牌到期前调用：
latestToken = renewedToken;
await connection.updateSecret(latestToken, 'Application token refresh');
```

更新只改变当前连接上的 broker 凭证，不改写连接建立时保存的认证候选，和固定原库一致。使用恢复时，应让应用提供器也返回新令牌。库不解析 JWT，不向身份提供器申请令牌，也不根据 token 内容自动安排定时器。失去连接或超时会拒绝挂起更新，结果可能已在 broker 生效；恢复不会自动重放。关闭/连接级取消也会释放更新等待。

在所测 RabbitMQ 4.0.5 中，坏签名、错误 audience、改变用户名的更新以 530 拒绝；**已过期的替代令牌会先得到更新确认，随后业务操作以 403 拒绝**。Go 原库表现一致。因此 updateSecret 成功只表示收到该方法的确认，不能用它证明令牌仍有效或具备业务权限。实际验证还覆盖权限收回/恢复、跨过原令牌到期时间继续使用同一通道、TLS 与更新后重连。

## 可选自动恢复

```js
const connection = await connect({
  host: '127.0.0.1', username: 'demo', password: 'test-only',
  allowInsecureAuth: true, // 仅限本机测试；实际连接推荐配置 TLS
  recovery: {maxRetries: 5, retryDelay: 1000, retryJitter: 200, topology: 'all'},
});
const channel = await connection.openChannel();
const {queue} = await channel.declareQueue('', {exclusive: true, autoDelete: true});
await channel.qos(1);
await channel.consume(queue, message => {
  if (!message) return;
  console.log(message.body.toString());
  channel.ack(message.args['delivery-tag']);
});
connection.on('recovered', ({attempt, skipped}) => console.log({attempt, skipped}));
connection.on('queueNameChanged', ({previous, current}) => console.log({previous, current}));
// 不再需要时：await connection.close();
```

默认关闭恢复；`recovery: true` 启用默认配置。连接与通道对象保持不变，消费回调与已成功登记的拓扑在恢复后继续使用。恢复中的调用失败；可先 `await connection.waitForReady()` 和 `await channel.waitForReady()`，再发起新的业务操作。就绪后仍可能再次断线，业务层应处理每次调用的失败。

初始拨号失败直接返回错误；已有连接断开时首次重试立即进行，后续按固定延时加抖动重试。连接默认最多重试 5 次、间隔 5000 ms、抖动 0–499 ms。单通道 broker 错误独立恢复，健康通道仍可收发；拓扑恢复期间其它拓扑变更会被拒绝，以免和重建冲突。

恢复顺序为交换机、队列、交换机绑定、队列绑定、消费者，并恢复通道 QoS 与 confirm/transaction 模式。`topology: 'transient'` 只重建 exclusive/autoDelete 实体及相关绑定，但仍恢复消费者；`'none'` 不恢复拓扑和消费者。服务端重新生成的队列名可用 `connection.resolveQueue(最初队列名)` 查询；队列操作及默认交换机发布自动解析最初的别名。中间某次重连生成的过期队列名不作为永久别名保存。

拓扑实体错误触发 `topologyError`，默认跳过该实体，详情见连接 `recovered.skipped`。需要任何实体失败都重试，可设置 `onTopologyError: () => false`；此策略与默认跳过均受重试次数限制。回调也可返回 Promise，应用须保证回调能结束。成功的显式 delete/unbind/cancel 不会被恢复撤销。最后一个已登记消费者被取消后，自动删除队列及其失去最后一个出站绑定的 autoDelete 交换机会从恢复记录中逐级移除；跨通道消费者和未完成的 consume/bind 请求会阻止过早移除。exchange-to-exchange 仅检查源交换机的出站绑定。显式关闭消费者通道与 broker 的取消通知也清理对应记录；意外断线则保留仍需要恢复的消费者及拓扑。

从未消费的 autoDelete 队列、从未绑定的 autoDelete 交换机不会仅因属性而被移除。一个已验证的原库差异：对从未绑定的交换机执行空解绑时，固定 Go 原库会忘记该交换机，本实现保留它；真实 RabbitMQ 在两边都保留实体。记录仅描述此连接已知的操作，不能获知所有外部连接的绑定、消费者或管理操作。

断线时未完成 RPC/确认可能已经在 broker 执行，均以失败结束，**不会自动重放或重发消息**。事务恢复只恢复模式，旧事务中的未提交发布不重发。投递标签跨恢复单调递增，旧通道的 ack/nack/reject 标签被拒绝；重投递仍可能发生，业务应按自身需求处理重复。`close()`、`destroy()` 和连接级 AbortSignal 是终止操作，停止重试；`waitForReady({signal, timeout})` 的取消只结束本次等待。状态和事件细节见 [TESTING.md](TESTING.md)。

默认最多记录 4096 个拓扑实体/绑定，每通道最多 1024 个消费者，恢复阶段最多缓冲 1024 条投递或 8 MiB 正文，超限会触发连接故障。恢复仅由 Node 客户端提供；MoonBit 会话 API 仍由调用方负责网络与生命周期。

## 验证与成熟度

0.8 的 **109 项核心测试在 JS 与 Wasm-GC 分别通过**，包含之前的 220 组 Pika 1.3.2 独立字节向量及新增会话状态测试。**18 组网络故障、25 组恢复故障、22 项原有 RabbitMQ 流程及 6 组真实恢复流程**通过；原有浏览器核心、CLI 与 7 项帧审查 CLI 场景也通过。

真实服务器为 Ubuntu 发行的 RabbitMQ **4.0.5**、Erlang/OTP **27**，通过 Windows Node 24 的 TCP/TLS 访问本机 WSL 临时实例。验证了二进制分片、64 位属性、确认、退回、重投、消费取消、交换机路由、事务、通道错误隔离、心跳、错误凭证、TLS 信任/主机名和消息 CLI。认证新增 12 组故障/生命周期、10 组真实 broker（含双向 TLS、重连和 CLI）验证；30 个原库认证响应及 9 个独立协商对照通过，AMQPLAIN 只归一化无语义差异的字段顺序。证据及复现见 [TESTING.md](TESTING.md)、`evidence/client-validation.json`、`evidence/rabbitmq-validation.json`。恢复另与固定 amqp091-go 提交 `a0195c6baf35db642d13651cb28938f899062e7c` 的原生程序比较一个重复断线场景，3 次确认消费与 2 次队列更名一致。各验证层覆盖重叠，不相加声称上游案例数。凭证更新新增 10 组故障、10 组真实 OAuth broker、6 个原库逐字节报文及 6 个真实 broker 结果对照通过。OAuth 服务器采用一次性 RS256 静态密钥；未接入远程授权服务器/JWKS/OIDC。自动删除恢复另有 13 组独立故障测试、2 组真实关闭/服务端取消流程，以及 10 个原生 Go/Node 真实重连场景：9 一致、1 个上述空解绑登记差异；重连后以被动声明验证存在/404，并确认存活队列仍能发布和取消息。性能记录仅为 4 KiB 消息、8 个在途发布的单机确认样例和单进程恢复延时观察。

这仍未完整追平 amqp091-go：恢复已覆盖下述有界场景，尚缺完整恢复边界/上游兼容、更多真实身份提供器/认证失败策略验证、流式大消息和充分的生产负载/长期运行证据。协议版本仅为 AMQP 0-9-1，不是 AMQP 1.0。当前编码 API 也不检查所有 broker 业务规则和保留字段语义。

## 限制

帧最大 16 MiB（默认 128 KiB，含 8 字节封装），字段最大嵌套深度 32、最多 65536 个访问节点；短字符串按 UTF-8 字节计长、必须有效 UTF-8，最长 255 字节。Basic 属性未知标志和扩展标志字当前拒绝。

客户端及正文拆帧辅助函数限定每条发出正文 1 MiB，组装器默认正文总缓冲 8 MiB、最多 64 个未完成通道，待组装方法/头部另有 16 MiB 总上限。CLI 审查限制 1 MiB 二进制输入。它完整读取文件，尚非文件流式 I/O。

Node 宿主每连接默认最多 64 通道、每通道最多 1024 个未确认发布，待写缓冲默认上限 32 MiB，超限关闭连接；这不是流式 drain 背压。MoonBit 会话调用者需及时排空 `take_output()`，自己提供网络、时钟和 RPC 调度。

Node 字段表用普通对象，支持 boolean、signed int32、字符串、null、数组及嵌套对象。字节/64 位/浮点原始位/Decimal 使用 `$type` 标签，完整约定见 [TESTING.md](TESTING.md)。接收长字符串返回十六进制以保留任意字节；对象映射不保留重复键与小整数原始位宽，需要这些信息时使用 MoonBit `FieldValue` 条目 API。

字段表采用 RabbitMQ Go 客户端的标签习惯：`b/s/l` 为有符号整数，`B/u/i` 为无符号整数。Pika 的 `U/L` 标签及 `l` 的无符号解释不在本版兼容范围。对照测试明确只比较共享字段类型，不宣称两种方言等价。浮点以原始位 API 保留 NaN 和负零。

`Frame` / `Decoder` 保持底层帧 API，可以保留未知方法 payload；调用 `Method::decode` 才检查方法参数。`Assembler::new()` 默认保留旧行为，建议新应用使用 `strict_methods=true`；所有组装模式现在都会严格校验 Basic 头部。

## 来源与独立审查

编解码代码和测试输入为本项目原创；**规格表是明确标注来源的移植数据**。`spec/amqp0-9-1.stripped.extended.xml` 来自 RabbitMQ 官方，按原 BSD 条款保留完整版权说明，`schema_generated.mbt` 由它生成。详见 [THIRD_PARTY.md](THIRD_PARTY.md)。本项目 MIT 许可不替代该数据的 BSD 条款。

参考：[RabbitMQ 规格](https://www.rabbitmq.com/docs/specification)、[amqp091-go](https://github.com/rabbitmq/amqp091-go)。Pika 仅是独立验证工具，无运行期依赖。

本仓库是后续开发的主目录。历史 ZIP、Git bundle 与合集清单是之前的审查快照，0.8 本地增量归档另附同提交 ZIP/bundle；历史合集未更新。未上传、未发布、未添加远程仓库。
