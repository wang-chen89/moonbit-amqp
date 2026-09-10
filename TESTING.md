# Validation contract

- Explicit Wasm-GC and JS targets: no inference from the toolchain default.
- Public API tests plus compiled browser engine, CLI stdin/file/argument and failure exit-code checks.
- 307 seeded bounded malformed inputs including UTF-16 surrogates. The worker has a 20-second limit.
- Local code coverage: `moon coverage analyze -p localreview/amqp -- -f summary`. No coverage upload is configured. Coverage is evidence about current code, not upstream feature coverage.
- Benchmark: 5 warmups and 30 measured documented-example executions; median and p95 recorded locally.
- Generated API and browser artifact must match the same source revision.

CI files are prepared locally; remote CI has not run because this repository has not been uploaded. Compatibility beyond README scope remains unverified.


## 0.3 定向验证与复现

本次只运行受影响 AMQP 项目的 JS 测试、构建和检查入口，没有重复运行 20 项合集验证。80 项测试通过（包含已存的 220 组独立 Pika 字节向量），7 个新增 CLI 场景通过。新版 Wasm-GC 尚未重跑。

```sh
moon test --target js --deny-warn
moon build --target js --deny-warn
# 将本次 cmd/web 构建产物复制到 web/engine.mjs 后：
node tools/test-inspect.mjs
```

需要重新产生独立向量时，单独安装 `pika==1.3.2` 或用 PYTHONPATH 指向解开的 wheel，再运行 `python tools/generate-pika-vectors.py` 和上述测试。普通用户运行测试不需安装 Pika，黄金向量已经保存在仓库。

`python tools/generate-schema.py` 使用随仓库提供的 BSD XML 重新生成方法表；随后运行 `moon fmt`。生成器不会下载文件、上传材料或启动 broker。保留字段/命名域断言、Pika 非共享整数方言、真实 RabbitMQ 网络行为不在这些向量的证明范围内。
