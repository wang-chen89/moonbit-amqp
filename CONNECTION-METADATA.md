# 连接属性与查询

0.18 增加客户端属性配置、服务端元数据和实际网络状态查询。连接成功后即可使用，读取不会发出 AMQP 方法或占用 RPC 槽位。

```js
import {connect, newConnectionProperties} from './tools/client.mjs';

const connection = await connect(process.env.AMQP_URI, {
  properties: {
    ...newConnectionProperties(),
    connection_name: 'worker-1',
    application: 'job-runner',
  },
  recovery: true,
});
try {
  console.log(connection.serverProperties.product);
  console.log(connection.localAddress, connection.remoteAddress);
  console.log(connection.tlsState.protocol, connection.tlsState.authorized);
} finally {
  await connection.close();
}
```

## 客户端属性

`properties` 是 AMQP 字段表，支持字符串、布尔值、Int32 数字、null、数组、嵌套对象和原有 `$type` 标记（int64、timestamp、decimal、float32-bits、float64-bits、bytes、longstr）。Bytes 使用十六进制标记，时间戳/64 位整数使用十进制字符串，不通过浮点数传递。`connection_name` 与原库 `Table.SetClientConnectionName` 设置相同字段。

不提供属性或提供空表时，采用 `newConnectionProperties()` 的 product/version/platform，标识本库 moonbit-amqp / 0.24.0 / moonbit。非空自定义表取代默认身份字段；要保留它们可像上例一样展开默认表。

实现总会覆盖 `capabilities`，公告 publisher_confirms、consumer_cancel_notify、connection.blocked、basic.nack 为 true，与固定 Go 原库的能力公告一致。只给 capabilities 的非空表不会另外补默认身份字段。应用给这个字段的值不会被用于能力协商。

输入在首次连接前深拷贝并验证，重连沿用该快照。修改原对象、嵌套数组或查询返回值不改变后续连接。这与原库修改调用方属性表并保留嵌套对象别名的行为不同；差异单独记录。对象须为 JSON 数据对象，拒绝访问器、symbol、函数、循环、稀疏数组和未标注类型的非有限数值；被覆盖的顶层 capabilities 值例外。属性 JSON 最多 2 MiB，仍受字段深度/节点、短字符串和整个 start-ok 帧上限约束。

## 返回数据

| 查询 | 内容 |
|---|---|
| `clientProperties` | 实际用于 start-ok 的客户端属性，含实现设置的 capabilities。 |
| `serverProperties` | connection.start 的服务端属性。 |
| `serverLocales` | 服务端公告的 locale 列表，保留分隔产生的空项。 |
| `serverVersion` | AMQP 协议 major/minor（当前支持 0/9），不是 RabbitMQ 软件版本。握手前为 null。 |
| `localAddress` / `remoteAddress` | `{address, port, family}`，family 为 IPv4/IPv6；尚无已连接端点时为 null。 |
| `config` | 实际 vhost、locale、协商限额、选中的 authenticationMechanism 和客户端属性。 |
| `tlsState` | TLS 状态，具体范围见下文。 |
| `connectionInfo` | 同次读取的以上元数据、限额、选中机制和 closed 状态；恢复连接另有 state 与 generation。 |

每次查询返回独立副本。正常关闭或断线后保留最近一次物理连接的信息；这些信息不能证明连接仍然存活。恢复对象在安装新物理连接时递增 generation，更新属性、地址和 TLS 快照；恢复尚未完成时 state 为 reconnecting。单通道恢复不改变连接代数。此前保存的副本继续描述旧连接，不自动更新。

有效 UTF-8 的 AMQP longstr 转为字符串；无效 UTF-8 保留为 `{$type:'longstr', hex:'...'}`。字节数组、64 位数和浮点位保留类型标记。Node 对象保留重复字段的最后值；MoonBit 原生条目 API 可保留重复键与数值位宽。库自身不在这些查询中加入密码、SASL 响应或 TLS 私钥；自定义属性是应用主动公告给 broker 的数据。

## TLS 范围

TCP 返回 encrypted/handshakeComplete/authorized 为 false，协议、密码套件和证书为空。TLS 握手后可读 protocol、cipher（Node 名称及 standardName）、serverName、authorized、authorizationError、alpnProtocol、resumed、peerCertificate、peerCertificateChain、localCertificate。

证书快照包含 subject、issuer、subjectAltName、serialNumber、validFrom、validTo、fingerprint256 和公开 DER 的 derHex。链来自 Node 的 `getPeerCertificate(true)`，最多遍历 64 个不重复证书，可能包含信任库提供的根，并非服务器原始证书列表或 Go 的 VerifiedChains。`serverName` 表示配置的验证主机名，未指定时采用连接主机；IP 主机并不因此发送 SNI。

读取存活连接时更新可获取的 TLS 信息，关闭后保留最后快照。`authorized` 取自运行时的证书验证结果；显式允许未通过验证的证书时，握手仍可完成而 authorized 为 false。不能用 handshakeComplete 或允许连接的配置代替证书验证结果。本接口不提供 Go 完整 tls.ConnectionState 的验证链、SCT、OCSP、导出密钥材料等能力，未宣称两个 TLS 运行时完全等价。

## MoonBit

`Session::new` 和 `Session::with_authentication` 增加可选 `properties` 条目数组。`new_connection_properties()` 给出新默认表，`normalize_connection_properties()` 校验并编码实际能力表。会话提供 `client_properties()`、`server_properties()`、`server_locales()`、`server_version()`、`virtual_host()` 和 `locale()`。表查询返回深拷贝；网络地址/TLS 由宿主提供。

旧 `session_open` / `session_open_auth` / `session_open_stream_auth` 桥接入口保留，新增属性与元数据桥接。元数据按握手阶段提取，未添加到每个消息分片的 JSON 返回值中。

## 已执行验证

JS/Wasm-GC 各 138 项核心测试，新增 6 项；14 组元数据线路/配置/恢复检查。固定未修改 Go 原库的 7 个独立 peer 元数据结果与 5 份自定义客户端属性表一致，实际核对 IPv4/IPv6 两端地址；7 个真实 RabbitMQ 结果一致，含固定 TLS 1.2 套件、服务器证书、双向认证和显式未验证状态。TLS 1.3 重连及确认消息往返另计 1 个本地场景。默认库身份与调用方属性别名共 2 类差异单列。

另修正 0.17 URI 认证机制仅接受小写的兼容问题。原库真实连接验证了混合大小写 PLAIN、AMQPLAIN、EXTERNAL，以及 Unicode simple-case 的 `plaın`；失败复现见 `evidence/metadata-uri-case-initial.*`。证据见 [原生对照](evidence/metadata-native.json)、[线路检查](evidence/metadata-validation.json) 与 [本轮清单](evidence/metadata-upgrade.json)。
