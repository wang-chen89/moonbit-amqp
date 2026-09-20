# URI 地址连接

0.17 的 URI 解析、格式化和凭证转换由 MoonBit 实现，JS 与 Wasm-GC 共用核心。Node 入口为 `connect(uri, options)`、`connect({uri, ...options})` 和 `Connection.connect(uri, options)`。

```js
import {connect, parseURI} from './tools/client.mjs';
const uri = process.env.AMQP_URI;
console.log(parseURI(uri).redacted);
const connection = await connect(uri, {recovery: true});
try {
  const channel = await connection.openChannel();
  const {queue} = await channel.declareQueue('', {exclusive: true});
  await channel.confirmSelect();
  await channel.publish('', queue, 'hello');
} finally {
  await connection.close();
}
```

`amqps://` 启用 TLS；`amqp://` 沿用项目的 TCP 认证约束，须显式传 `allowInsecureAuth: true`。例如 `amqp://user:pass@localhost:5672/%2F` 的虚拟主机是 `/`。百分号转义先解码一次；路径中的 `+` 保留原义，查询中的 `+` 是空格，`a/../b` 不折叠。

## 默认值与优先级

| 项目 | URI 入口行为 |
|---|---|
| host / port / username / password | 地址决定；缺省 localhost、5672 或 5671、guest/guest。显式空账号/密码保留。 |
| vhost | 非空 `options.vhost` 优先，否则 URI，缺省 `/`。 |
| heartbeat | URI 查询优先于 `options.heartbeat`，二者均无时为 10 秒；显式 0 保留并参与原有协商。 |
| channelMax | 非零显式选项优先，其次 URI `channel_max`，否则 2047。 |
| timeout | 显式选项优先，其次非零 `connection_timeout`（毫秒），否则 30000。仍用于握手与原有 RPC/确认计时。 |
| SASL | 显式 `options.sasl` 优先；否则按重复 `auth_mechanism` 顺序选择。允许 plain、amqplain、external，0.18 起不区分大小写；未提供时 PLAIN。 |
| TLS | URI scheme 决定是否启用。amqps 的显式 `options.tls` 整体覆盖 URI TLS 参数。amqp 忽略 TLS 配置。 |

原有不含 URI 的对象入口默认值保持原样：heartbeat 60、timeout 10000、channelMax 64。URI 入口 frameMax 仍默认 131072，保留本项目资源上限；并非 Go 的所有无限制/默认值语义。Go 配置中显式零 heartbeat 与本项目显式零选项的含义也不完全相同。`options.timeout` 是本项目扩展优先级。

## TLS 文件与恢复

支持 `cacertfile`、`certfile`、`keyfile`、`server_name_indication` 查询。路径按运行进程工作目录解析；带空格或分隔符时应做查询转义。仅 certfile 与 keyfile 同时存在时启用客户端证书。省略 CA 使用 Node 的默认信任；URI 生成配置最低 TLS 1.2。明确指定的 TLS 配置保留 Node 原有选项行为，缺少 servername 时使用非 IP 的地址主机名；IP 不发送默认 SNI。

URI 文件在首次连接前读取并保存为字节快照；自动重连重复使用该快照，后续删除或修改文件不改变连接配置。需要轮换文件凭证时建立新连接；本版本不提供重新加载证书文件的接口。EXTERNAL 身份仍由 broker 的证书插件映射，并须显式选择认证机制。

## MoonBit 与诊断

`parse_uri(text)` 返回 `URI`，公开已解析字段、可选 `heartbeat_seconds : Int64?`、`connection_timeout : Int64` 和 `channel_max : Int`。`URI::plain_auth` / `amqplain_auth` 转换为可供 `Session::with_authentication` 使用的凭证。`URI::to_string` 遵循原库格式化行为，只保留 TLS 查询，**不保留 heartbeat、超时、channel_max 或认证机制查询**。它不是完整连接配置的往返序列化。

`URI::to_string` 和 Node `parseURI(...).canonical` 含密码；日志使用 `redacted`。普通解析返回值也包含凭证，不能整对象输出日志。MoonBit URI 不实现 Debug/Show。解析错误与 TLS 文件读取错误不回显地址或文件路径。

解析器保留超出网络可用范围的整数以便对照；连接前会拒绝端口 0/大于 65535、负数/大于 65535 的心跳，以及非零但不在 1..2147483647 范围内的连接超时。未知查询和无法解码的查询对会忽略，重复参数取第一个有效值，认证机制保留全部有效值。

## 验证与差异

固定未修改 amqp091-go `a0195c6baf35db642d13651cb28938f899062e7c`，Go 1.26 构建，623 条解析/规范化/接受与拒绝结果一致，含上游 22 条 URI 规格矩阵。独立列出 6 条差异样本：无效 UTF-8 凭证/路径/片段、片段中的原始控制字符、无效 UTF-8 查询对和 64 KiB 输入上限。Go 的字节字符串、URL 解析器版本与本项目 UTF-8 字符串/资源约束不能完全等同。

URI 原有 10 个核心测试，0.18 为大小写修复增加 1 组，现有 14 组线路/配置检查；真实 RabbitMQ 的 18 个原库连接结果一致（成功均确认发布并取回消息；失败场景确认拒绝）。另有 1 个本地 TLS 文件快照恢复场景，未计作 Go 一致案例。见 [解析对照](evidence/uri-reference-validation.json)、[线路检查](evidence/uri-validation.json)、[真实连接](evidence/uri-broker-validation.json)。未验证所有 DNS、代理、IPv6 网络、系统信任库、平台或 broker 版本；解析相同不证明这些环境都兼容。
