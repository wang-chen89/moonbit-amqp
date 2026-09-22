> 历史说明存档：2026-09-22 价值复核之前的 README 原文。旧版本、路径、无 remote 等状态描述不代表当前状态；当前入口为 [README](README.md)。保留其中的完整 API 用法和历史验证细节，不据旧条目宣称本轮重新通过。

> 2026-09-22 当前本地版 0.24.0：申报定位为“AMQP 可靠消息发布与恢复客户端”。已更新[现有项目对照](DUPLICATION.md)、[申报草稿](PROPOSAL.md)及[本轮验证](evidence/innovation-review-20260922/results.json)。下面带日期的旧轮次描述保留历史范围；团队已有公开仓库，本次本地修订尚未由本任务推送。

> 2026-09-21 后续修复：[小消息发送与当前对照](BUFFERED-PUBLISH.md)。下文保留旧版测量范围。

# AMQP 0-9-1 编解码与消息客户端

本地候选版 **0.24.0**。MoonBit 实现帧/方法/属性编解码、连接认证协商和通道状态机；Node.js 提供 TCP/TLS、RPC、心跳和消息发布/消费宿主。仓库独立，当前仅供本地审查。

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

### URI 地址

`connect(uri, options)` 与 `connect({uri, ...options})` 已支持 AMQP URI，包括账号/虚拟主机转义、重复 SASL 选择、TLS 证书文件与参数优先级。MoonBit 提供 `parse_uri`、URI 格式化/脱敏和凭证转换。用法、默认值、输入边界及有意差异见 [URI.md](URI.md)。原有对象入口默认值保持不变。

### 自定义传输

`connect` 可传 `dial(network, address, context)`，同步或异步返回二进制 Duplex；TLS 仍由库包装，恢复会重新调用拨号函数。`open(stream, options)` / `Connection.open` 接管已建立的字节流，`defaultDial(timeout)` 提供有期限的默认拨号器。用法、所有权和 Go 行为差异见 [TRANSPORT.md](TRANSPORT.md)。

### 连接属性和元数据

连接可传 `properties` 自定义客户端属性，包括 `connection_name`；通过 `clientProperties`、`serverProperties`、`serverLocales`、`serverVersion`、`localAddress`、`remoteAddress`、`tlsState`、`config` 和 `connectionInfo` 查询。结果是独立副本，重连更新连接代数与网络信息，关闭后保留最后快照。用法和精确范围见 [CONNECTION-METADATA.md](CONNECTION-METADATA.md)。

### 发布确认句柄与事件

`publishWithDeferredConfirm(exchange, routingKey, body, options)` 在本地发送完成后返回确认句柄，`publishStreamWithDeferredConfirm(exchange, routingKey, source, bodySize, options)` 提供相同的流式入口。它们不等待 broker 确认才返回；未开启确认模式时返回 `null`。发送/源本身失败仍拒绝 Promise。旧 `publish` / `publishStream` 继续等待确认，nack 或连接失败仍拒绝。

```js
await channel.confirmSelect();
channel.on('confirm', ({deliveryTag, ack, generation}) => {
  console.log(generation, deliveryTag, ack);
});
const receipt = await channel.publishWithDeferredConfirm('', queue, 'hello');
const accepted = await receipt.wait({timeout: 5000});
console.log(receipt.deliveryTag, accepted);
```

句柄只读：`deliveryTag` 是 BigInt；`completed` 表示已经结束；`acked` 在收到肯定确认后为 true；`done` 是结束时兑现的 Promise；`wait({signal, timeout})` 返回确认布尔值。收到 nack 或通道/连接终止时结果为 false，后者另外保留 `error`，不能把 false 一律理解成 broker 明确拒绝。`done` 本身不拒绝。一个句柄可以独立等待多次；局部取消/超时只拒绝该次等待，不撤回消息，也不改变其它等待者。预取消信号优先拒绝，即使句柄已经结束。最多保留 1024 个并行等待者，取消后立即释放监听器和等待槽位。

`confirm` 事件按发布序号连续触发，即使线路确认乱序；单独句柄可以先于前面的序号结束。`ack(tag, generation)` / `nack(tag, generation)` 是分开的事件名称，与消费确认方法是不同用途。监听器可用 `on/once/off` 管理，异常触发 `callbackError`；异步监听器的完成不阻塞后续事件。关闭只结束句柄、丢弃尚未排序的事件，不伪造 broker nack。等待序号空缺的确认记录与排队/未确认发布共用有界容量，达到上限时拒绝新发布。

`channel.nextPublishSeqNo` 是下一次实际开始发送时使用的序号快照，不能预留序号；排队操作尚未开始时它可能不变。恢复重新建立通道后从 1 开始。普通物理句柄/事件的 `generation` 为 0，恢复通道从 1 开始并随物理通道更换递增，用来区分新旧句柄；旧句柄不转换成新消息，也不自动重发。恢复通道离线时不能查询该序号。正常连接关闭仍等待已发送的确认，全局确认超时仍会关闭连接。

大正文使用 `publishStream(exchange, routingKey, source, bodySize, options)`。`source` 是逐块产生 `Uint8Array` 的同步或异步 iterable，`bodySize` 为准确字节数（非负安全整数或 UInt64 范围的 BigInt）；AMQP 头部必须先声明长度。API 不扫描或拼接整个源，socket 背压时暂停写帧并等待 `drain`，最多提前拉取一个源块。

```js
import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
const {size} = await stat('message.bin');
await channel.publishStream('', queue, createReadStream('message.bin'), size, {
  properties: {'content-type': 'application/octet-stream'},
});
```

同通道发布正文、后续发布/RPC/ack 按调用顺序发送，不等待前一条 broker 确认才发下一条；不同通道按帧共享可写窗口。`ack/nack/reject` 返回发送 Promise，正常的连接 `close()` 会先排空已排队发送并等待现有发布确认。仍应先等待发布结果再显式关闭发布通道。confirm 超时从正文发送并排空本地背压后开始；源和 socket 每次无进展受连接 `timeout` 限制。

发布选项 `signal` 可取消排队或尚未发送完的源。排队取消不调用源；已开始后源长度不符、抛错、超时或取消会终止连接，避免留下不完整正文。broker 主动关闭通道则丢弃该通道剩余源并保留健康兄弟通道。尽力调用 iterator `return()` / Readable `destroy()`，不能强制终止忽略取消的用户 Promise。发送完后 signal 不撤销消息或确认等待；恢复不自动重放旧源。

默认消费和 mandatory 退回仍完整组装，采用 8 MiB 上限；更大的接收正文可启用下述流式模式。真实 broker 另有限制：本次 RabbitMQ 默认上限 16 MiB，32 MiB 发布在服务端被 406 拒绝。应按实际 broker 配置和业务路由选择正文大小。

### 流式接收

连接选项 `streamBodies: true` 将该连接的 get、consume 和 mandatory return 正文改为单次遍历的异步字节 iterable。消息在头部校验后即交付：`bodySize` 是十进制 UInt64 字符串，`body` 逐块给出 Buffer，`completed` 在正文长度完整验证后兑现；未完成就断线或遇到坏帧时拒绝。默认模式的 Buffer 接口保持不变。

```js
import {createHash} from 'node:crypto';
import {connect} from './tools/client.mjs';
const c = await connect({
  host: '127.0.0.1', port: 5672, username: 'demo',
  password: process.env.AMQP_PASSWORD, allowInsecureAuth: true,
  streamBodies: true, receiveHighWaterMark: 65536,
});
try {
  const ch = await c.openChannel();
  const message = await ch.get('jobs');
  if (message) {
    const hash = createHash('sha256');
    for await (const chunk of message.body) hash.update(chunk);
    await message.completed;
    await ch.ack(message.args['delivery-tag']);
    console.log(message.bodySize, hash.digest('hex'));
  }
} finally { await c.close(); }
```

先读取或 `await message.body.discard()`，再等完成、进行 ack/nack/reject；这些确认方法会拒绝尚未完整接收的对应标签。`discard()` 只丢弃本地正文并继续校验剩余线路，不向 broker 确认；可随后 nack/reject 决定是否重投。`for await` 提前 break 也会排空并校验剩余正文。不要在大正文尚未读取时只等待 `completed`，否则背压会阻止后续字节到达。需要 Node Readable 时可用 `Readable.from(message.body)`；其额外缓冲由调用方负责。

每条流必须读取或丢弃。未监听的 return 自动丢弃，消费回调抛错时也会丢弃其未读流并触发 `callbackError`。源或消费者超过连接 `timeout` 无进展会关闭连接。正常连接/通道 close 会丢弃未读流以解除背压，并拒绝仍不完整的正文；显式 destroy/断线也拒绝不完整正文。已完整收到的流在连接意外关闭后仍可读取其缓存。

`receiveHighWaterMark` 默认 256 KiB（可设 4 KiB–128 MiB），按整条连接累计未取走的正文。达到字节水位或 4096 个未读分片就暂停 socket，每批最多解码 64 KiB 输入，因此正文缓存上界为水位 + 协商 frameMax + 64 KiB，分片硬上限 12289。单个待处理 socket 输入块另限 1 MiB，最多保留 1024 条尚未排空的流。核心同时最多跟踪 64 个未完成内容通道；正文队列用游标出队，避免逐片移动整个数组。`readStats` 可查看缓存、分片数、峰值、暂停次数和上界。这不含解码器、桥接临时对象、调用方保留的块、内核/TLS 缓冲，也不是进程 RSS 上限。

暂停读取会阻塞同一 TCP 连接上的其它通道和回复。此时暂停接收心跳截止计时，但仍发送心跳并执行正文进展超时；普通 RPC/发布确认仍受各自超时约束。每批解码后让出事件循环，使大量接收不会饿死其它连接。慢速流建议使用独立连接、合理 QoS 和与处理时间匹配的 timeout。

恢复模式下，流式 consume 回调可能在恢复尚未全部完成时收到头部，以便及时排空正文、让后续恢复回复通过。读完后还须 `await message.recoveryReady` 再 ack/nack/reject；它只在通道及连接恢复就绪后兑现。旧流在断线后失败，旧标签仍被拒绝；broker 可以重投消息，库不拼接新旧正文。普通 Buffer 回调仍等待整体恢复就绪。MoonBit 主机可用 `Session::new(..., stream_bodies=true)` 或 `with_authentication` 同名选项，处理 `MessageStart/MessageData/MessageEnd`；调用方应提供有界输入批次和自己的背压。

`declareExchange` / `deleteExchange`、`declareQueue` / `deleteQueue` / `purgeQueue`、`bindQueue` / `unbindQueue`、`qos`、`consume` / `cancel`、`get`、`ack` / `nack` / `reject` / `recover` 见 [客户端接口](tools/client.mjs)。一个通道只允许一个未结束的 RPC，调用需 `await`；不同通道可并行，发布确认另按序号跟踪。delivery-tag 与 timestamp 使用十进制字符串，避免 JavaScript 53 位整数截断。

消费回调接收 `{body: Buffer, args, properties}`；服务端取消消费者时回调收到 `null`，并触发通道 `cancel` 事件。回调异常触发 `callbackError`，库不自动确认消息。每通道最多登记 1024 个消费者。连接/通道关闭触发 `close` 并结束挂起操作。连接级 `signal` 的取消、RPC/确认超时会关闭连接，避免把迟到回复配给新请求。`blocked` / `unblocked` 事件反映服务端资源控制，阻塞期间新发布立即失败。

### 独立取消消费者

`consume(queue, callback, {signal})` 接受 `AbortSignal`，只取消该订阅；同一 signal 可控制多个订阅。预先取消的信号会在发帧前拒绝注册。取消会发送等待回复的 `basic.cancel`，即使消费注册使用了 `noWait: true`。回调收到 `null`，同时触发 `cancel(tag, {origin: 'signal', reason})`；服务端取消的来源为 `server`。Error 类型的取消原因原样传递，其它原因作为 `Error.cause`。

```js
const controller = new AbortController();
const ended = new Promise(resolve => channel.once('cancel', (tag, detail) => resolve({tag, detail})));
await channel.consume(queue, message => {
  if (message) console.log(message.body.toString());
}, {consumerTag: 'worker', noAck: true, signal: controller.signal});
controller.abort();
await ended;
```

取消发生在注册回复之前时，注册 Promise 仍先返回消费者标签，再进行取消；它不是等待消费者结束的 Promise。自动取消等待当前 RPC 和已开始的发送正文结束，不撤回在途操作。自动取消等待回复期间允许一个用户 RPC 排队，其余并发用户 RPC 仍拒绝。取消超时仍会关闭连接；正常完成保留健康通道与连接。

取消确认前的投递仍交给回调；已经交付的流式正文仍须读取或丢弃，以免阻塞其后的取消回复。取消不自动 ack，也不让未确认消息重新入队。手动取消、服务端取消和关闭会释放订阅的信号监听器，旧信号不会取消后来复用相同标签的新订阅。

恢复连接保留逻辑订阅的信号，重连后继续有效。断线期间取消会立即去掉消费者恢复记录，并发出带 `offline: true` 的取消事件；因为没有 broker 确认，此路径保留队列/交换机拓扑记录，不推断自动删除已经完成。在线收到取消确认后仍执行已有自动删除登记清理。完整 Go context、所有恢复交错与自动删除离线语义尚未全面对齐。

### 不等待方法回复

以下 11 个方法支持严格布尔选项 `noWait`，默认 `false`。`true` 时 Promise 在遵守发送前的背压等待、按通道顺序将方法交给本地 socket 后完成，不占 RPC 回复槽位，也不启动 RPC 回复计时器；不保证 socket 缓冲已排空。连接和发送队列的关闭、取消、超时约束仍有效。完成不表示 broker 接受了操作，后续拒绝可异步关闭通道。需要确认结果时保留默认等待模式。

| 方法 | 选项位置 |
|---|---|
| `declareQueue`、`deleteQueue`、`purgeQueue` | 第二个参数 |
| `declareExchange` | 第三个参数 |
| `deleteExchange`、`cancel` | 第二个参数 |
| `bindQueue`、`bindExchange`、`unbindExchange` | 第五个参数，第四个参数仍是字段表 |
| `consume` | 第三个参数 |
| `confirmSelect` | 第一个参数 |

```js
await channel.declareQueue('jobs', {durable: true, noWait: true});
await channel.bindQueue('jobs', 'events', 'job.created', {}, {noWait: true});
await channel.confirmSelect({noWait: true});
await channel.publish('', 'jobs', Buffer.from('hello'));
```

无等待声明返回所请求的队列名，消息数/消费者数返回 0；purge/delete 的消息数也返回 0。这些零是未知结果的占位值。匿名声明返回 `''`，只能利用 broker 当前通道对空队列名的解析，不能凭此取得生成的实际名称；需要跨通道引用或可靠跟踪生成名的恢复时使用默认等待声明。`queue.unbind` 的协议没有 no-wait 位，其接口保持等待。

无等待消费在发帧前登记回调，以便接收紧随其后的消息；本地发送/编码失败会撤销登记。取消在本地发送完成后移除回调，已经在途的未知/已取消消费者投递会被丢弃，流式正文仍会排空校验；库不会自动 ack。取消消费者本身不会重新入队已经投递的未确认消息，后续需关闭通道/连接或按业务显式恢复。

恢复登记记录本地已发送的操作意图，保留声明、绑定和消费者的 noWait 选项；无等待删除/解绑/取消也立即更新登记。异步 broker 拒绝之前，本地意图可能与实际拓扑不同。确认模式重建仍使用正常等待。固定 Go 参考的 `Confirm(true)` 实际仍等待被 broker 抑制的回复，本实现真正不等待；此差异有独立证据，未计入行为一致。

### QoS、消费/发布标志与通道流控

`qos(prefetchCount, global=false, {prefetchSize=0}={})` 保留原来的前两个参数，在第三个参数中接受字节限额。count 范围 0–65535，size 范围 0–4294967295，global 为布尔值；超出线路范围直接拒绝。恢复分别保留按消费者与全局设置的 count/size，并在重建消费者之前重放。固定 Go 参考只检查负数，超出范围时截断到 UInt16/UInt32；这是已验证的差异。

`consume` 选项增加 `noLocal: false`，与 noWait、noAck、exclusive 分别编码，恢复保留该选项。`publish` 与 `publishStream` 增加 `immediate: false`，与 mandatory 独立编码，两者都须是布尔值；普通发布仍只表示本地发送，确认模式才等待 broker 确认。MoonBit 的 `Session.publish` / `publish_start` 同时增加可选 `immediate`；旧桥接函数签名保留，另加 `session_publish_flags` / `session_publish_start_flags`。

`await channel.flow(active)` 请求服务器开始或暂停该通道的投递，返回 flow-ok 中的实际 active 值；这不改变本机发布方向。get 不属于该投递流控制。恢复连接支持该方法，但与固定 Go 参考一样不把它作为持久拓扑配置重放。

`channel.on('flow', active => ...)` 接收服务器发来的发布方向流控通知，普通与恢复通道都支持。核心自动回 flow-ok；收到 false 后，新发布被本地拒绝，true 后恢复，不自动重发。已经开始的流式正文会先发送完，再发送延后的 flow-ok，避免交错破坏内容帧。固定 Go 参考会通知应用、自动回复，但依赖应用停止发布；其 Publish 仍可继续发送，报告将这一既有核心保护行为单列为差异。连接级 blocked/unblocked 与 TCP 背压是另外的控制机制。

**参数能编码不等于所选 broker 支持该功能。** 本轮 RabbitMQ 4.0.5 与原版 Go 对照中，非零 prefetchSize、immediate=true、flow(false) 都返回 540 并关闭整条连接；失败的 immediate 消息未进入队列。flow(true) 正常完成。noLocal=true 被接受，但同一连接发布的消息仍会投递给该消费者，包括无等待消费和重连后；本项目不在客户端偷偷过滤这些消息。真实 broker 与独立线路证据见 [TESTING.md](TESTING.md)。

```sh
node tools/broker.mjs --help
# 配置 AMQP_HOST / AMQP_PORT / AMQP_USER / AMQP_PASSWORD 后：
# TLS 设置 AMQP_TLS=1，可选 AMQP_CA=/path/to/ca.pem
# 仅测试明文连接时设置 AMQP_ALLOW_INSECURE=1
node tools/broker.mjs roundtrip
node tools/broker.mjs publish existing-queue --file message.bin
node tools/broker.mjs get existing-queue --file received.bin
# 以下 stdin / stdout 重定向示例适用于 bash 或 cmd；文件选项也可直接用于 PowerShell。
node tools/broker.mjs publish existing-queue < message.bin
node tools/broker.mjs publish existing-queue --size 12582912 < message.bin
node tools/broker.mjs get existing-queue --raw > received.bin
node tools/broker.mjs get existing-queue
```

`roundtrip` 使用临时独占队列。`publish` 先被动验证队列存在，使用 mandatory 发布并等待 publisher confirm；被退回或 nack 都以错误退出。默认 `get` 保留正文 Base64 JSON 格式和 8 MiB 组装上限，输出完成后确认，空队列输出 `null`。浏览器页面仍用于线路审查，网络客户端运行在 Node 中。

`publish --file` 从已打开的普通文件取得长度，以 64 KiB 块发送；`publish --size` 按给定精确长度流式读取 stdin，并检查过短/过长。没有这两个选项时，stdin 先写入系统临时目录下的私有文件，读到 EOF 后按实际长度连接和发布，全程不拼接大正文。正常退出、受控错误和收到可处理的取消信号时删除暂存文件；强制终止或系统崩溃可能留下文件。源文件发送期间应保持不变；长度变化会失败，相同长度的并发改写不提供快照隔离。发布失败不代表 broker 必然没有收到完整消息，CLI 不自动重发。

`get --file` 使用流式接收，在目标所在目录创建私有暂存文件。验证完整正文、sync 并关闭后，用原子硬链接安装到目标路径；已存在的文件、目录或符号链接都不会被替换，竞争创建也会失败。文件系统须支持硬链接，失败时不会退回到覆盖写入。保存完成后才发送 ack 并关闭连接，stdout 输出路径、字节数、SHA-256 和原始属性。空队列输出 `null` 且不创建目标，空正文则创建零字节文件。这里的 sync 不等于跨文件系统的断电事务；写完后、确认前中断可能留下已保存文件及可重投消息。

`get --raw` 只把二进制正文写到 stdout，元数据 JSON 写到 stderr。空队列 stdout 为空、stderr 为 `{"found":false}`，退出码 2；零字节消息退出码 0。主进程每次向一个辅助 Node 进程交给最多 64 KiB，并等待实际写出后再交下一块，避免 Windows 同步管道阻塞 AMQP 心跳和超时处理。断管或输出停顿时终止辅助进程、关闭连接且不确认；已输出的前缀不能撤回。写成功仅表示操作系统已接受，不保证下游应用持久保存。

`AMQP_MAX_BODY_BYTES` 默认 1073741824（1 GiB），约束发布、暂存和显式流式接收，可配置为正十进制 UInt64；超过限制会失败。broker 自身的消息上限仍生效，本轮实际 RabbitMQ 上限为 16 MiB。`AMQP_TIMEOUT` 默认 10000 ms，取值 1–2147483647，用于连接、协议操作和 stdin/stdout 进展等待；它不保证终止卡在文件系统内核中的操作。命令成功退出 0，错误退出 1，空 raw get 退出 2，已处理的 SIGINT/SIGTERM 分别退出 130/143。stdout 最终报告失败可能发生在保存/确认之后，CLI 不提供文件和 broker 之间的恰好一次事务。

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

恢复顺序为交换机、队列、交换机绑定、队列绑定、消费者，并恢复通道 QoS 与 confirm/transaction 模式。单通道故障时，从该通道登记的实体和消费者队列出发，沿已登记绑定选择完整相关路由；恢复动作通过失败通道执行，不重开健康通道、不重新订阅健康通道消费者。无关路由不重放，未知的外部队列不猜测声明参数。自动生成队列名先被动检查：仍存在时保留，已被删除才生成替代名称并更新别名。`topology: 'transient'` 只重建 exclusive/autoDelete 实体及相关绑定，但仍恢复消费者；`'none'` 不恢复拓扑和消费者。服务端重新生成的队列名可用 `connection.resolveQueue(最初队列名)` 查询；队列操作及默认交换机发布自动解析最初的别名。中间某次重连生成的过期队列名不作为永久别名保存。

拓扑实体错误触发 `topologyError`，默认跳过该实体，详情见连接 `recovered.skipped`。需要任何实体失败都重试，可设置 `onTopologyError: () => false`；此策略与默认跳过均受重试次数限制。回调也可返回 Promise，应用须保证回调能结束。成功的显式 delete/unbind/cancel 不会被恢复撤销。最后一个已登记消费者被取消后，自动删除队列及其失去最后一个出站绑定的 autoDelete 交换机会从恢复记录中逐级移除；跨通道消费者和未完成的 consume/bind 请求会阻止过早移除。exchange-to-exchange 仅检查源交换机的出站绑定。显式关闭消费者通道与 broker 的取消通知也清理对应记录；意外断线则保留仍需要恢复的消费者及拓扑。

从未消费的 autoDelete 队列、从未绑定的 autoDelete 交换机不会仅因属性而被移除。一个已验证的原库差异：对从未绑定的交换机执行空解绑时，固定 Go 原库会忘记该交换机，本实现保留它；真实 RabbitMQ 在两边都保留实体。记录仅描述此连接已知的操作，不能获知所有外部连接的绑定、消费者或管理操作。

断线时未完成 RPC/确认可能已经在 broker 执行，均以失败结束，**不会自动重放或重发消息**。事务恢复只恢复模式，旧事务中的未提交发布不重发。投递标签跨恢复单调递增，旧通道的 ack/nack/reject 标签被拒绝；重投递仍可能发生，业务应按自身需求处理重复。`close()`、`destroy()` 和连接级 AbortSignal 是终止操作，停止重试；`waitForReady({signal, timeout})` 的取消只结束本次等待。状态和事件细节见 [TESTING.md](TESTING.md)。

默认最多记录 4096 个按通道分别计数的拓扑实体/绑定，每通道最多 1024 个消费者，普通模式的恢复阶段最多缓冲 1024 条投递或 8 MiB 正文，超限会触发连接故障；流式模式采用前述共享接收水位和早期回调契约。恢复仅由 Node 客户端提供；MoonBit 会话 API 仍由调用方负责网络与生命周期。

恢复配置与本地/全局拓扑快照用法见 [TOPOLOGY.md](TOPOLOGY.md)。显式关闭通道移除其恢复登记，重复登记的其它所有者继续保留；关闭连接后实时拓扑清空，先前取得的深复制快照保持有效。

显式重连、耗尽后再次尝试和恢复取消通知见 [RECOVERY-CONTROL.md](RECOVERY-CONTROL.md)。恢复耗尽后配置仍启用，连接实际状态仍为 closed；显式 close/destroy/AbortSignal 会永久禁止该对象再次重连。

绝对期限关闭入口 `closeDeadline(Date | Unix毫秒 | null)` 见 [CLOSE-DEADLINE.md](CLOSE-DEADLINE.md)。它会结束排队发送和关闭握手，期限到达时销毁传输；需要发布确认时请先等待确认完成。

自定义拓扑恢复、默认委托及动态声明见 [TOPOLOGY-STRATEGY.md](TOPOLOGY-STRATEGY.md)。

自定义连接/通道恢复决策、无动作/延迟策略与默认委托见 [CONNECTION-STRATEGY.md](CONNECTION-STRATEGY.md)。

## 验证与成熟度

0.24 性能补丁通过完整本地 verify：JS 140 项（138 核心加 2 个十六进制桥接边界测试）、Wasm-GC 138 项，以及全部宿主/CLI/恢复/流式检查和 307 个异常输入。

新增 3 组同机负载各 3 轮，固定旧版、当前版和 Go 原库轮换执行；确认发布及 get/TLS consume 的正文、数量、顺序全部验证。结果与限制见 [性能补丁](PERFORMANCE.md) 和 [当前清单](evidence/performance-upgrade.json)。本补丁形成 22 份当前源码报告；其余 27 份原生/broker 报告保留历史范围，未重跑。

此前 0.24 恢复策略增量的 10 peer/12 broker 结果及已解释差异仍见 [历史清单](evidence/connection-strategy-upgrade.json)，不冒充本补丁重新运行的结果。

常见连接、消息、确认、消费与恢复流程已有验证，按本轮有限收尾要求停止 AMQP 专项扩展。完整 TLS/Go 调度等价、多平台/版本/集群和生产性能仍属已披露限制，不宣称完整追平。

## 限制

帧最大 16 MiB（默认 128 KiB，含 8 字节封装），字段最大嵌套深度 32、最多 65536 个访问节点；短字符串按 UTF-8 字节计长、必须有效 UTF-8，最长 255 字节。Basic 属性未知标志和扩展标志字当前拒绝。

原有 `content_frames` / `Session.publish` 一次性辅助函数仍限制 1 MiB；新增 `Session.publish_start/publish_body` 接受完整 UInt64 长度，逐帧编码。Node `publish` 已改用新路径并复制输入，单条及每通道排队正文受 `maxBufferedBytes` 限制；更大正文用 `publishStream`。组装器默认正文总缓冲 8 MiB、最多 64 个未完成通道，待组装方法/头部另有 16 MiB 总上限。消息 CLI 已接入大文件、stdin 暂存/已知长度直发和文件/raw 流式接收；帧审查 CLI 仍限制 1 MiB。

Node 原有对象入口默认最多 64 通道，URI 入口默认最多 2047 通道，每通道最多 1024 个未确认/排队发布及 1024 个发送操作，全连接最多 4096 个待写帧操作。`maxBufferedBytes` 默认 32 MiB，可设 1–128 MiB，分别限制每通道排队的已复制正文、socket 待写字节和延迟协议输出。socket 接近高水位时等待可写，单个正文桥接块最大 64 KiB 且受协商帧大小限制；自动控制输出仍有硬上限，极端堆积会关闭连接。上限不含调用者/源保留的块、JS/MoonBit 编码暂存、操作系统和 TLS 内部缓冲，不是进程 RSS 保证。`connection.writeStats` 提供 socket 高水位、drain 次数及延迟协议输出观察。MoonBit 调用者需及时排空 `take_output()`，自己提供网络、时钟和 RPC 调度。

Node 字段表用普通对象，支持 boolean、signed int32、字符串、null、数组及嵌套对象。字节/64 位/浮点原始位/Decimal 使用 `$type` 标签，完整约定见 [TESTING.md](TESTING.md)。接收长字符串返回十六进制以保留任意字节；对象映射不保留重复键与小整数原始位宽，需要这些信息时使用 MoonBit `FieldValue` 条目 API。

字段表采用 RabbitMQ Go 客户端的标签习惯：`b/s/l` 为有符号整数，`B/u/i` 为无符号整数。Pika 的 `U/L` 标签及 `l` 的无符号解释不在本版兼容范围。对照测试明确只比较共享字段类型，不宣称两种方言等价。浮点以原始位 API 保留 NaN 和负零。

`Frame` / `Decoder` 保持底层帧 API，可以保留未知方法 payload；调用 `Method::decode` 才检查方法参数。`Assembler::new()` 默认保留旧行为，建议新应用使用 `strict_methods=true`；所有组装模式现在都会严格校验 Basic 头部。

## 来源与独立审查

编解码代码和测试输入为本项目原创；**规格表是明确标注来源的移植数据**。`spec/amqp0-9-1.stripped.extended.xml` 来自 RabbitMQ 官方，按原 BSD 条款保留完整版权说明，`schema_generated.mbt` 由它生成。详见 [THIRD_PARTY.md](THIRD_PARTY.md)。本项目 MIT 许可不替代该数据的 BSD 条款。

参考：[RabbitMQ 规格](https://www.rabbitmq.com/docs/specification)、[amqp091-go](https://github.com/rabbitmq/amqp091-go)。Pika 仅是独立验证工具，无运行期依赖。

本仓库是后续开发的主目录。历史 ZIP、Git bundle 与合集清单是之前的审查快照，0.24 本地增量归档另附同提交 ZIP/bundle；历史合集未更新。未上传、未发布、未添加远程仓库。
