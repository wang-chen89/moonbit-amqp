# 当前验证范围 · 0.25.0 / 2026-09-27

确认账本核心与Node接入的对应证据见 [LOCAL-CHECKS](evidence/ledger-20260927/LOCAL-CHECKS.json)。本轮JS144/Wasm-GC142项核心测试通过；22组独立线协议确认检查包含混合乱序/批量确认、断线unknown、重连隔离、错误标签、完整发送后返回与1024容量。另23组发送流检查、恢复主例、JS/Wasm纯核心例子通过。

测试首次编译新增纯核心例子因遗漏 `main raise` 失败，修正后通过。验证脚本曾因Windows默认编码和可执行文件定位失败；均在实质检查前修复。完整日志保留在本目录，远程CI未运行。

核心例子：`moon run examples/confirm_core --target wasm-gc`；宿主检查：构建并刷新引擎后 `node tools/test-confirmations.mjs`。该脚本可通过 `CONFIRMATIONS_EVIDENCE` 指定新证据路径。23组流检查见 `node tools/test-stream.mjs`。核心契约、容量与非目标见 [CONFIRM-LEDGER](docs/CONFIRM-LEDGER.md)。

本轮另完成真实RabbitMQ4.0.5与固定amqp091-go原生参考的9个broker场景、6条匹配线协议序列、19个方法帧对照，2项既有行为差异明确记录在 [native.json](evidence/ledger-20260927/native.json)。覆盖普通/事务/确认发布、1MiB流、mandatory return、预取消、双通道、连接与单通道恢复。新混合确认回归使用受控peer，不声称broker实际发出该异常顺序。

依赖是16个经Ubuntu元数据哈希核对后仅解包的包；没有系统安装或常驻服务。设置 `RABBITMQ_ROOT`、`WSL_DISTRO=Ubuntu-D`、`AMQP_CONFIRMATIONS_REFERENCE` 后运行 `node tools/test-confirmations-native.mjs`。解包在Windows挂载盘时冷启动较慢，本轮 `RABBITMQ_STARTUP_SECONDS=180`；默认30、允许1至300，Python与宿主超时同步。证据可通过 `CONFIRMATIONS_NATIVE_EVIDENCE` 指定新路径。一次性实例已正常退出。

以下是9月23日历史基线，数字仅适用于当时源码。

---

# 当前验证范围 · 0.24.1 / 2026-09-23

JS140/Wasm-GC138项核心测试、恢复与23组流式宿主检查、RabbitMQ6组恢复、引擎和CLI均通过。真实broker流程包括拓扑恢复、未确认消费重投递、旧tag拒绝、事务重建和TLS重连；没有重跑全部历史原生对照或性能基准。

本轮 [LOCAL-CHECKS](evidence/workflow-20260923/LOCAL-CHECKS.json)列出工具版本、命令、退出码及关键源码SHA-256；相同目录的reports保存此次实际执行的结构化报告。既有evidence原位置保留历史内容，不将历史统计当作本轮全量验证。

主任务复现与参考依赖见 [WORKFLOW](WORKFLOW.md)。核心仍可执行：

```sh
moon fmt
moon info
moon check --target js
moon test --target js
moon test --target wasm-gc
moon build --target js
node -e "require('node:fs').copyFileSync('_build/js/debug/build/cmd/web/web.js','web/engine.mjs')"
node examples/run-recovery-workflow.mjs
```

主例使用现有手写TCP测试端，按规范独立构造字节，不是独立RabbitMQ。未知结果故障由测试端可控注入；本轮另重跑真实RabbitMQ4.0.5恢复检查，不能据此称为集群或生产验收。

发布Promise在断线时失败不等于消息没有送达。示例不提供持久化outbox、业务ID对账、消费幂等或exactly-once；应用自行决定是否重试。恢复受配置预算、拓扑错误和broker状态限制；生产环境和真实使用方仍未证实。

专项脚本按LOCAL-CHECKS所列运行。未重新执行全部历史对照、全覆盖率/基准或远程CI；此前版本的完整运行说明见 [历史TESTING](docs/before-workflow/TESTING.md)。源码ZIP需保留产物字节，邮件.eml不参与换行转换；交付另核对Git blob、引擎及新解包入口。
