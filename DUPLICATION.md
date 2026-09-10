# 查重结论

日期：2026-09-10。本轮公开查询范围内未发现直接同范围实现；不保证无人开发、全代码无重合或比赛无人报名。

检索采用 Mooncakes 官方包级关键词搜索和 GitHub 仓库级搜索（技术名 + language:MoonBit / moonbit）。不包含 GitHub 全代码检索、私有仓库或完整报名名单。

规格/算法参考：https://www.rabbitmq.com/resources/specs/amqp0-9-1.pdf。代码为新写实现，不声称完整移植。


## 0.3 来源修订

本次引入带 BSD 许可的官方 XML 规格表和由它生成的方法元数据，详见 THIRD_PARTY.md。之前关于完全没有第三方数据的说明只适用于早期版本。编解码实现未复制 Go/Pika 源码。本次参考 RabbitMQ 规格和 amqp091-go 的现有能力；未重新执行完整 Mooncakes/GitHub 全生态查重，因此没有新增“绝不撞题”的结论。
