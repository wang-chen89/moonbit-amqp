# 自定义传输

0.19 增加 `dial`、`open` / `Connection.open` 与 `defaultDial`。AMQP 帧、认证和通道状态仍由 MoonBit 处理；Node 宿主接管字节流、取消、超时和资源释放。

## 自定义拨号

```js
import net from 'node:net';
import {connect} from './tools/client.mjs';

const connection = await connect(process.env.AMQP_URI, {
  dial(network, address, {host, port, timeout, signal}) {
    // 可以改为代理、隧道或本地管道；返回新的二进制 Duplex。
    return net.connect({host, port, signal});
  },
  recovery: true,
});
try {
  const channel = await connection.openChannel();
  await channel.qos(1);
} finally {
  await connection.close();
}
```

库调用 `dial('tcp', address, context)`，其中 address 是 URI/配置目标，IPv6 带方括号；context 包含 host、port、timeout 和该次物理连接的 AbortSignal，不包含账号、密码或 SASL 响应。context 对象被冻结。函数可返回 Duplex 或 Promise；返回的 net.Socket 可以仍在连接，也可以已经连接。自定义普通 Duplex 必须已准备好传递字节。

对 `amqps` / `tls`，dial 返回供 TLS 包装的底层字节流，库随后完成 TLS 与 AMQP 握手。不要把已经完成 TLS 的连接当成待包装的 TCP 连接；已有 TLS 连接应使用 open。未指定 dial 时使用 defaultDial。TCP 认证仍需 `allowInsecureAuth: true`。

连接恢复会再次调用首次保存的 dial 函数，每次给予新的 signal。修改外部 options.dial 不会替换恢复函数；函数自身捕获的代理配置由应用管理。旧流不被复用，待确认发布也不因更换传输而自动重放。

## 接管现有流

```js
import net from 'node:net';
import {once} from 'node:events';
import {open} from './tools/client.mjs';

const stream = net.connect({path: process.env.AMQP_PIPE});
await once(stream, 'connect');
const connection = await open(stream, {
  username: process.env.AMQP_USER,
  password: process.env.AMQP_PASSWORD,
  allowInsecureAuth: true,
});
try {
  const channel = await connection.openChannel();
  await channel.qos(1);
} finally {
  await connection.close();
}
```

open 接受尚未消费的、已连接的二进制 Node Duplex。已有 TLSSocket 必须已经完成 TLS 握手；open 不再包装 TLS。拒绝对象模式、字符串解码、正在流动或已有 data/readable 消费者、关闭及未连接的流。早期参数校验失败时保留调用者的流；开始接管之后，成功关闭、协议失败、超时和取消都会关闭它。

open 是单次物理连接入口，不接受 uri、dial、tls 或启用 recovery 的配置。一个现有流没有可推断的重建方式；要自动恢复可通过 connect 的 dial 提供创建新流的函数。这个区分对应原库 DialConfig 的自动拨号/恢复与 Open 的现有流入口。

普通 Duplex 无需 setNoDelay、网络地址或 TLS 方法，地址查询可为 null，TLS 元数据只识别实际 TLSSocket。包裹 TLS 的不透明 Duplex 不会被猜测为已验证的 TLS。调用方不应在接管后继续读写、更改编码或自行关闭流。已被本库接管的流不能用于第二个连接，错误重用也不会关闭原连接。

输入先暂停，再按最多 64 KiB 的批次在事件循环中解析，避免内存流在 write 内同步回复时重入发送队列。流式接收仍执行原有水位控制；写入遵守 Duplex 的 writableLength / writableNeedDrain / drain。自定义流必须实现 Node 标准背压契约。

## 默认拨号与期限

`defaultDial(timeout = 30000)` 返回 `(network, address, {signal} = {}) => Promise<Socket>`。支持 tcp、tcp4、tcp6 以及 Node 的 unix/path 传输；Windows path 对应命名管道，Unix-domain socket 在 Unix 系统上仍待执行验证。TCP 地址使用 host:port 或 [IPv6]:port。

默认拨号限制建立连接的时间，并在成功连接后设置一个同样长度的握手期限。AMQP open-ok 会清除此期限，关闭也会清理计时器。独立调用 defaultDial 后长期不使用返回流，仍会触发握手超时。若把流隐藏在不能传递期限管理能力的包装器后，应由包装器管理底层期限。

Connection 另有原有的 timeout 总期限，覆盖异步拨号、TLS 和 AMQP 握手；自定义拨号也受此限制。超时/取消会立即结束连接等待并中止 signal；工厂后来返回的流会被销毁，后来拒绝的 Promise 也会被处理。同步阻塞 JavaScript 的函数无法被事件循环计时器抢占，工厂应采用异步 I/O 并响应 signal。

这与 Go 自定义 Config.Dial/直接 Open 不自动施加同一总期限的行为有差异；还没有复刻 Go 的调度、net.Conn 全部截止时间及所有网络类型。现有参数默认值、资源上限、TLS 和恢复差异仍适用，不能据此宣布完整兼容。

## 已执行验证

- 22 组独立检查覆盖实际 TCP/IPv6/Windows 命名管道、纯内存/通用 Duplex、分片与收发背压、输入校验、流所有权、超时、取消、迟到结果和恢复。
- 固定且未修改的 Go 原库 6 个传输成功/失败结果一致；4 个成功场景还核对队列声明报文、客户端属性和消息正文。
- 7 个真实 RabbitMQ 场景一致，包含自定义路由、现有连接、普通字节流、默认拨号、验证 TLS、已有 TLS 和双向 TLS EXTERNAL；成功均有确认发布与取回正文。
- TLS 主机名失败后的关闭，以及自定义 TLS 拨号重连后的拓扑/确认消息往返另计 2 个本地场景。

JS/Wasm-GC 核心各 138 项及现有本地 verify 通过。另重跑元数据、URI、基础 broker、发布确认和双向大正文原生检查；精确计数及历史报告范围见 [本轮清单](evidence/transport-upgrade.json)。当前没有自定义传输的代表性原生性能或生产负载追平证据。
