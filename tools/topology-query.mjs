export const emptyTopologyConfiguration = () => ({qos:null, exchanges:{}, queues:{}, bindings:[], exchangeBindings:[]});
export function topologyConfiguration(records, resolve) {
  const flag=(entry,key)=>entry.options?.[key]??false;
  const result={
    qos:records.qos??null,
    exchanges:Object.fromEntries([...records.exchanges.values()].map(e=>[e.name,{name:e.name,kind:e.type,durable:flag(e,'durable'),autoDelete:flag(e,'autoDelete'),internal:flag(e,'internal'),noWait:flag(e,'noWait'),args:e.options.arguments??{}}])),
    queues:Object.fromEntries([...records.queues.values()].map(q=>{const actualName=resolve(q.key);return [actualName,{declaredName:q.declared??q.requested,actualName,durable:flag(q,'durable'),autoDelete:flag(q,'autoDelete'),exclusive:flag(q,'exclusive'),noWait:flag(q,'noWait'),args:q.options.arguments??{}}];})),
    bindings:[...records.bindings.values()].map(b=>({queue:resolve(b.queue),key:b.routingKey,exchange:b.exchange,noWait:flag(b,'noWait'),args:b.args})),
    exchangeBindings:[...records.exchangeBindings.values()].map(b=>({destination:b.destination,key:b.routingKey,source:b.source,noWait:flag(b,'noWait'),args:b.args})),
  };
  return structuredClone(result);
}
