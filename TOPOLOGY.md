# 恢复配置与拓扑查询

0.20.0 提供连接恢复配置、通道本地/全连接拓扑的独立快照。以下接口属于 Node 网络宿主。

```js
import {connect} from './tools/client.mjs';
const connection = await connect(process.env.AMQP_URI, {
  recovery: {maxRetries: 3, retryDelay: 1000, retryJitter: 0, topology: 'all'},
});
try {
  const channel = await connection.openChannel();
  await channel.qos(10);
  const {queue} = await channel.declareQueue('', {exclusive: true, autoDelete: true});
  console.log(connection.recoveryEnabled, connection.reconnectionConfig);
  console.log(channel.topologyConfiguration().queues[queue]);
  const saved = channel.topologyConfiguration(true);
  // saved 可修改或 structuredClone；修改不会影响连接及后续恢复。
} finally {
  await connection.close();
}
```

| 查询 | 返回值 |
|---|---|
| `recoveryEnabled` | 恢复配置启用且未显式终止时为 true，包括自动恢复耗尽；不是连接可用状态 |
| `connectionRecoveryEnabled` | 当前内置恢复策略下与 recoveryEnabled 相同 |
| `topologyRecoveryEnabled` | recoveryEnabled 且 topology 不是 none |
| `maxRetryCount` / `retryInterval` | 配置的重试次数/间隔；间隔单位毫秒，不含随机抖动；显式终止时均为 0 |
| `reconnectionConfig` | 每次生成 `{maxRetryCount, retryInterval}`；终止后仍保留已配置值 |
| `recoveryConfig` | 每次生成 maxRetries、retryDelay、retryJitter、topology、maxTopologyEntries、hasTopologyErrorHandler；不返回凭证或回调函数 |
| `channel.topologyConfiguration(false)` | 该通道登记的拓扑，默认 false |
| `channel.topologyConfiguration(true)` | 所有活动通道登记的拓扑合并，QoS 仍取调用通道最后一次成功设置 |
| `connection.topologyConfiguration()` | 全连接合并快照，QoS 为 null；这是本库扩展 |

未启用恢复的物理连接：三个 enabled 查询均为 false，次数/间隔为 0，两个配置副本为 null，连接/通道拓扑为空。topology 为 none 时仍可恢复连接，但拓扑查询为空。scope 参数必须是布尔值。`recovery` 保留原冻结配置，不能通过重新赋值替换；查询副本不用于动态修改恢复策略。

## 数据与生命周期

每份拓扑含 `{qos, exchanges, queues, bindings, exchangeBindings}`；空容器统一为 `{}` / `[]`，无 QoS 为 null。实体字段及参数形式见 [查询实现](tools/topology-query.mjs)，使用客户端字段表表示，默认布尔标志为 false、参数表为空对象。对象和嵌套参数均深复制，返回对象没有冻结，调用方可以自行编辑。`structuredClone(snapshot)` 可再次复制，不能把该副本传回连接来改变登记内容。

队列以当前实际名字为键，含 declaredName 与 actualName；匿名队列恢复后，新查询会返回新名字，已有快照保留旧名字。跨通道绑定同步使用当前名字。QoS 查询展示最近一次成功调用，原有 global/non-global 两种 QoS 恢复记录仍保留。passive 探测和失败声明不会新增记录；noWait 的本地完成仍不证明 broker 接受。

相同实体可被多个通道登记，各自本地查询均保留；全局视图按名字/绑定键合并。显式关闭通道移除它的登记，其他通道的相同登记继续存在；若仅由已关闭通道登记，则不再在后续重连时重建。这是 0.19 的修复，包括从未消费的 autoDelete 队列。该规则描述恢复登记，关闭通道本身未必删除 broker 中的实体。全连接 close 完成后实时查询清空，先前取得的独立副本继续有效。

`maxTopologyEntries` 默认 4096，现在按每个通道的实体/绑定登记计数，同一实体由两个通道登记占两项；QoS 不计入该限额。关闭通道释放所占项。底层 `connection.topology` 与下划线入口不是稳定公开 API，应使用上述快照。

## 已验证范围与差异

14 组本地检查覆盖模式、嵌套参数、特殊对象键、重复所有者、删除/解绑、关闭、匿名队列改名、资源限额与重连期间查询。固定未修改 amqp091-go 的 7 个完整分阶段结果在独立 peer 和真实 RabbitMQ 中分别一致。另有 3 个本地真实恢复场景：匿名队列/跨通道路由、单通道恢复保留重复登记、关闭与快照生命周期。见 [原生证据](evidence/topology-native.json) 和 [当前清单](evidence/topology-upgrade.json)。

原库 TopologyConfiguration / Clone 复制容器但共享嵌套 Args；修改查询会影响内部登记和已 Clone 的对象。本库深复制，因此此场景明确记为 1 项差异，不计入匹配数。

0.20 的终止路径源码审查保留在 [历史审查](evidence/topology-terminal-query-audit.json)。0.21 已用原生实测确认并修正耗尽查询，详见 [恢复控制](RECOVERY-CONTROL.md)。

自定义拓扑策略已在 0.23 提供；自定义 ConnectionRecovery 已在 0.24 提供；完整并发恢复交错、其他平台/版本及代表性性能仍待补齐或验证。本轮只有本机示例与基础确认计时，没有恢复查询或整体原生性能追平结论。
