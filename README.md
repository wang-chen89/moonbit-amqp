# AMQP 0-9-1 编解码与消息客户端

本地候选版 **0.4.0**。MoonBit 实现帧/方法/属性编解码、连接认证协商和通道状态机；Node.js 提供 TCP/TLS、RPC、心跳和消息发布/消费宿主。仓库独立，当前仅供本地审查。

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

## 验证与成熟度

0.4 的 **91 项核心测试在 JS 与 Wasm-GC 分别通过**，包含之前的 220 组 Pika 1.3.2 独立字节向量及新增会话状态测试。**18 组网络故障测试、22 项真实 RabbitMQ 流程**通过；原有浏览器核心、CLI 与 7 项帧审查 CLI 场景也通过。

真实服务器为 Ubuntu 发行的 RabbitMQ **4.0.5**、Erlang/OTP **27**，通过 Windows Node 24 的 TCP/TLS 访问本机 WSL 临时实例。验证了二进制分片、64 位属性、确认、退回、重投、消费取消、交换机路由、事务、通道错误隔离、心跳、错误凭证、TLS 信任/主机名和消息 CLI。证据及复现见 [TESTING.md](TESTING.md)、`evidence/client-validation.json`、`evidence/rabbitmq-validation.json`。性能记录仅为 4 KiB 消息、8 个在途发布的单机确认样例。

这仍未完整追平 amqp091-go：尚缺重连/拓扑恢复、更多 SASL/SASLprep、流式大消息和充分的生产负载/长期运行证据。协议版本仅为 AMQP 0-9-1，不是 AMQP 1.0。当前编码 API 也不检查所有 broker 业务规则和保留字段语义。

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

本仓库是后续开发的主目录。历史 ZIP、Git bundle 与合集清单是之前的审查快照，本次未重复重打包。未上传、未发布、未添加远程仓库。
