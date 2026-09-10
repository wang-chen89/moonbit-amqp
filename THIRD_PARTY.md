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
