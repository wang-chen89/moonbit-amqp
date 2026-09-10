# AMQP 0-9-1 编解码器

本地候选版 **0.3.0**。MoonBit 实现帧增量解析、64 种方法的参数编码/解码、RabbitMQ 字段表、Basic 消息属性，以及多通道消息组装。仓库独立，当前仅供本地审查。

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

## 验证与成熟度

本次 **80 项 JS 测试通过**，其中 **220 组 Pika 1.3.2 独立字节向量**覆盖 192 个方法用例、16 个属性组合、12 个共享字段表用例；另有审查引擎与 7 个 CLI 场景通过。证据见 `evidence/codec-focused-validation.json` 和 `evidence/pika-vectors.json`。

这些验证证明已测试的编解码行为。尚无连接协商状态机、SASL 驱动、RPC 调度、TCP/TLS 客户端与真实 RabbitMQ 互通；不能据此认定追平完整客户端。当前编码 API 也不检查所有 broker 业务规则和保留字段语义。

## 限制

帧最大 16 MiB（默认 128 KiB，含 8 字节封装），字段最大嵌套深度 32、最多 65536 个访问节点；短字符串按 UTF-8 字节计长、必须有效 UTF-8，最长 255 字节。Basic 属性未知标志和扩展标志字当前拒绝。

正文拆帧辅助函数限定 1 MiB，组装器默认正文总缓冲 8 MiB、最多 64 个未完成通道，待组装方法/头部另有 16 MiB 总上限。CLI 审查限制 1 MiB 二进制输入。它完整读取文件，尚非文件流式 I/O。

字段表采用 RabbitMQ Go 客户端的标签习惯：`b/s/l` 为有符号整数，`B/u/i` 为无符号整数。Pika 的 `U/L` 标签及 `l` 的无符号解释不在本版兼容范围。对照测试明确只比较共享字段类型，不宣称两种方言等价。浮点以原始位 API 保留 NaN 和负零。

`Frame` / `Decoder` 保持底层帧 API，可以保留未知方法 payload；调用 `Method::decode` 才检查方法参数。`Assembler::new()` 默认保留旧行为，建议新应用使用 `strict_methods=true`；所有组装模式现在都会严格校验 Basic 头部。

## 来源与独立审查

编解码代码和测试输入为本项目原创；**规格表是明确标注来源的移植数据**。`spec/amqp0-9-1.stripped.extended.xml` 来自 RabbitMQ 官方，按原 BSD 条款保留完整版权说明，`schema_generated.mbt` 由它生成。详见 [THIRD_PARTY.md](THIRD_PARTY.md)。本项目 MIT 许可不替代该数据的 BSD 条款。

参考：[RabbitMQ 规格](https://www.rabbitmq.com/docs/specification)、[amqp091-go](https://github.com/rabbitmq/amqp091-go)。Pika 仅是独立验证工具，无运行期依赖。

本仓库是后续开发的主目录。历史 ZIP、Git bundle 与合集清单是之前的审查快照，本次未重复重打包。未上传、未发布、未添加远程仓库。
