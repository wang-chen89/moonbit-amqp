# 第三方材料

`spec/amqp0-9-1.stripped.extended.xml` 是 RabbitMQ 官方发布的 BSD 规格表，下载自：
https://raw.githubusercontent.com/rabbitmq/amqp-0.9-1-spec/main/xml/amqp0-9-1.stripped.extended.xml

快照 SHA256：`aaa806b8150090a308033ba9bdc45929cd06449665e41f398c54b9de2488b1d1`。

`schema_generated.mbt` 和 `spec/methods.json` 派生自该表。发布源码或编译产物时必须同时保留以下原版权、条件和免责声明。XML 内的原文（包括日期拼写）未修改。

```text
WARNING: Modified from the official 0-9-1 specification XML by
     the addition of:
     confirm.select and confirm.select-ok,
     exchange.bind and exchange.bind-ok,
     exchange.unbind and exchange.unbind-ok,
     basic.nack,
     the ability for the Server to send basic.ack, basic.nack and
      basic.cancel to the client, and
     the un-deprecation of exchange.declare{auto-delete} and exchange.declare{internal}

     Modifications are (c) 2007-210 Broadcom. All Rights Reserved. The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
     The modifications may be distributed under
     the same BSD license as the stripped spec.

Copyright (c) 2009 AMQP Working Group.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions
are met:
1. Redistributions of source code must retain the above copyright
notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright
notice, this list of conditions and the following disclaimer in the
documentation and/or other materials provided with the distribution.
3. The name of the author may not be used to endorse or promote products
derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT,
INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

其它新增编解码代码、生成器、测试输入和宿主工具为本项目原创，适用本项目 MIT 许可。独立验证调用另外安装的 Pika 1.3.2（BSD-3-Clause）；仓库没有复制其实现或测试集，仅记录本项目输入产生的协议字节及本项目编写的适配器。


0.5 恢复接口/语义参考固定 [amqp091-go a0195c6](https://github.com/rabbitmq/amqp091-go/tree/a0195c6baf35db642d13651cb28938f899062e7c)。恢复实现为本项目独立编写；`tools/recovery-reference.go` 是原创独立调用程序，Go 原库只用于测试，源码与二进制均未打入本项目 ZIP。外部参考归档 SHA256 为 `19067ca18143f0101b390ab09a237e2de989fd900ca20917746a4b22b66cafef`，保留下载原库自带许可；证据固定提交，不把主分支提交称为某个发行版。


0.6 的认证对照继续使用同一固定 Go 原库；`tools/authentication-reference.go` 为原创调用程序，原库的 auth.go/connection.go 等 72 个文件未修改。保存原生 Response 与独立握手结果，AMQPLAIN 表的字段顺序单独归一化。认证生产代码独立编写，固定原库不做 SASLprep；没有复制第三方 Unicode 表或规范化实现。真实证书认证调用 RabbitMQ 4.0.5 包内原版 SSL 机制插件。配置依据为 [RabbitMQ 认证机制](https://www.rabbitmq.com/docs/access-control#mechanisms) 与 [TLS 文档](https://www.rabbitmq.com/docs/ssl)，实际兼容结论限定为所测发行包。


0.7 继续使用相同未修改 Go 参考；`tools/secret-reference.go` 与本机 JWT 测试签发器为原创测试工具。真实 OAuth backend 为 Ubuntu RabbitMQ 4.0.5 包内原版插件，未分发其源码/二进制。过期更新边界另外核对 [v4.0.5 backend 源码](https://github.com/rabbitmq/rabbitmq-server/blob/v4.0.5/deps/rabbitmq_auth_backend_oauth2/src/rabbit_auth_backend_oauth2.erl)，配置参照 [OAuth backend 文档](https://www.rabbitmq.com/docs/oauth2)；版本行为以实际对照为准。


0.8 自动删除恢复依据：RabbitMQ [队列生命周期](https://www.rabbitmq.com/docs/queues)、[交换机自动删除](https://www.rabbitmq.com/docs/exchanges) 与 [交换机间绑定的源方向](https://www.rabbitmq.com/docs/e2e)。固定 Go 原库的 connection.go/channel.go/recovery_test.go 用于只读行为核对和原生执行；新增 adapter 为本地测试程序，未拷贝其实现。空解绑从未绑定交换机的原库登记差异有单独证据。


0.9 单通道恢复参考固定 Go 提交的 [recoverConnectionTopology](https://github.com/rabbitmq/amqp091-go/blob/a0195c6baf35db642d13651cb28938f899062e7c/connection.go) 与 [Channel.Reconnect](https://github.com/rabbitmq/amqp091-go/blob/a0195c6baf35db642d13651cb28938f899062e7c/channel.go)。本地只读核对后用未修改原库执行两个边界；新适配器不复制其算法。本实现的跨通道依赖图改进与原库差异明确记录。


0.17 URI 行为参照同一固定 Go 提交的 uri.go、connection.go 及 Go 1.26 net/url；MoonBit 解析器和 Node 适配器为本地实现。对照输入包含 uri_test.go 中 22 条协议规格矩阵（上游版权 Sean Treadway/SoundCloud 与 VMware，BSD-2-Clause，完整许可保留在 `spec/amqp091-go-URI-LICENSE`），其余输入和调用程序为原创。固定原库和 Go 标准库没有作为运行期代码或二进制分发。规范化/资源与字节字符串差异独立披露于 URI.md。


0.18 连接属性与元数据参照同一固定 Go 原库的 connection.go、Table.SetClientConnectionName 和 TLS 公共状态。`tools/metadata-reference.go` 为原创只读查询/连接适配器，原库 72 文件再次校验未改动；MoonBit 与 Node 实现独立编写。默认身份及调用方表别名差异保留，不伪造为 Go 相同实现。

0.19 自定义传输参考固定 Go 原库 connection.go 的 DefaultDial、DialConfig、Open、期限清理与重连拨号流程。transport-reference.go 是原创公共 API 适配器；72 个上游文件校验未改动，未复制或分发 Go 运行期代码。Node Duplex 实现独立编写，期限/调度差异明确披露。

0.20 恢复配置与拓扑查询参考同一固定 Go 原库的 TopologyConfiguration、Clone、IsRecoveryEnabled、重试配置查询及关闭清理。topology-reference.go 为原创公开 API 适配器；72 个上游文件校验未改动，Node 所有权记录与快照实现独立编写。嵌套参数别名差异及异常终止查询待验证边界已披露。

0.21 恢复控制继续调用相同固定 Go 原库的 Reconnect、NotifyRecoveryCancel、查询与最终清理入口。recovery-control-reference.go 为原创测试适配器；原库 72 文件未改动，未复制其恢复算法。原库 panic 仅在适配器中捕获并报告，差异不计为行为匹配。

0.22 CloseDeadline 对照继续调用同一固定 Go 原库的公开限时关闭、取消与通知入口。close-deadline-reference.go 为原创适配器，72 个上游文件未改动；TCP 代理只扣留真实 broker 的关闭回复，不替代其协议实现。Node 期限计时和流清理独立编写，事件载荷与拨号等待差异明确记录。

0.23 自定义拓扑策略适配器调用固定 Go 原库的 TopologyRecovery、DefaultTopologyRecovery、Reconnect 和查询接口，72 个上游文件未改动。受限上下文与取消实现独立编写；单通道拓扑失败边界依据实际原生结果修正。

0.24 连接策略适配器实现固定 Go 的 ConnectionRecovery 接口并委托 DefaultConnectionRecovery；原库 72 文件保持未修改。原生结果中的既有关闭清理边界作为差异保存；Node 的异步策略上下文、逻辑 disconnected 状态与错误隔离独立实现。
