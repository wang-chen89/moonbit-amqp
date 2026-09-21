# MoonBit AMQP 0-9-1 编解码与消息客户端 · 项目申报书

## 一、项目名称

MoonBit AMQP 0-9-1 编解码与消息客户端

## 二、项目说明

MoonBit 实现帧、方法、属性、认证协商和通道核心；Node 24 宿主提供 TCP/TLS、心跳、发布消费、流式传输与恢复策略。并非所有代码均为 MoonBit，也不宣称全部 AMQP 生态功能已完成。

## 三、方向与通用性

网络协议与消息系统。生态已有 DDD12345-D/moon-amqp、Zcxssxx/MoonMQ，需承认重叠；本项目候选差异是 Node 宿主的 TLS、发布确认、流式背压和显式恢复策略，需按固定提交逐项展示。

## 四、应用场景

任务投递结合 mandatory 返回与 publisher confirms；publishStream 处理已知长度的大消息；inspect 工具解码抓包；URI 配置和显式恢复策略用于连接故障处理。

## 五、功能与验证边界

支持字段表、属性、跨帧组装、流式收发和资源上限，兼容边界见 FEATURES.md。真实 broker、回环协议夹具和纯核心测试是不同证据层级；当前新增时序修复仅有局部复验，未重跑的 RabbitMQ 路径不得算本轮通过。

## 六、原创性与参考材料

原创核心及 Node 代码采用 MIT。RabbitMQ AMQP 规格 XML、派生 schema_generated.mbt/methods.json 适用 BSD-3-Clause；22 条 URI 参考矩阵保留 amqp091-go 的 BSD-2-Clause 许可，详见 THIRD_PARTY.md。来源 https://github.com/rabbitmq/amqp-0.9-1-spec 和 https://github.com/rabbitmq/amqp091-go；不得写成完全未复用第三方材料。

## 七、仓库链接

https://github.com/wang-chen89/moonbit-amqp
