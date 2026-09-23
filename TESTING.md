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
