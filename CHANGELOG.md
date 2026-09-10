# 0.2.0 本地审查更新

增加 Basic.Publish/Return/Deliver/Get-Ok 内容帧组装；支持多通道交错和零正文，检查顺序、声明长度、64 个在途通道和全局正文缓存上限。方法参数及属性仍是 opaque payload，真实 RabbitMQ 互通未执行。
