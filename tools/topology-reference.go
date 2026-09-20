// Public query adapter around the pinned, unmodified Go implementation.
package main
import (
 "encoding/json"
 "os"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)
type Request struct{URI,Mode,Scenario string}
func check(e error){if e!=nil{panic(e)}}
func args(v amqp.Table)any{if v==nil{return map[string]any{}};return v}
func topology(t amqp.TopologyConfiguration)map[string]any{
 ex:=map[string]any{};qs:=map[string]any{};bs:=[]any{};ebs:=[]any{};var qos any
 if t.Qos!=nil{qos=map[string]any{"prefetchCount":t.Qos.PrefetchCount,"prefetchSize":t.Qos.PrefetchSize,"global":t.Qos.Global}}
 for name,e:=range t.Exchanges{ex[name]=map[string]any{"name":e.Name,"kind":e.Kind,"durable":e.Durable,"autoDelete":e.AutoDelete,"internal":e.Internal,"noWait":e.NoWait,"args":args(e.Args)}}
 for name,q:=range t.Queues{qs[name]=map[string]any{"declaredName":q.DeclaredName,"actualName":q.ActualName,"durable":q.Durable,"autoDelete":q.AutoDelete,"exclusive":q.Exclusive,"noWait":q.NoWait,"args":args(q.Args)}}
 for _,b:=range t.Bindings{bs=append(bs,map[string]any{"queue":b.Queue,"key":b.Key,"exchange":b.Exchange,"noWait":b.NoWait,"args":args(b.Args)})}
 for _,b:=range t.ExchangeBindings{ebs=append(ebs,map[string]any{"destination":b.Destination,"key":b.Key,"source":b.Source,"noWait":b.NoWait,"args":args(b.Args)})}
 return map[string]any{"qos":qos,"exchanges":ex,"queues":qs,"bindings":bs,"exchangeBindings":ebs}
}
func queries(c *amqp.Connection)any{return map[string]any{"recoveryEnabled":c.IsRecoveryEnabled(),"connectionRecoveryEnabled":c.IsConnectionRecoveryEnabled(),"topologyRecoveryEnabled":c.IsTopologyRecoveryEnabled(),"maxRetryCount":c.MaxRetryCount(),"retryInterval":int(c.RetryInterval()/time.Millisecond)}}
func main(){
 var r Request;check(json.NewDecoder(os.Stdin).Decode(&r));cfg:=amqp.Config{FrameSize:131072,ChannelMax:64,Heartbeat:time.Second}
 if r.Mode!="off"{cfg.Recovery=&amqp.Recovery{ReconnectionConfig:&amqp.ReconnectionConfig{MaxRetryCount:3,RetryInterval:5*time.Millisecond}};if r.Mode=="none"{cfg.Recovery.TopologyRecoveryMode=amqp.TopologyRecoveryDisabled};if r.Mode=="transient"{cfg.Recovery.TopologyRecoveryMode=amqp.TopologyRecoveryOnlyTransient}}
 c,e:=amqp.DialConfig(r.URI,cfg);check(e);defer c.Close();a,e:=c.Channel();check(e);b,e:=c.Channel();check(e)
 stages:=[]any{};record:=func(name string){stages=append(stages,map[string]any{"name":name,"queries":queries(c),"a":topology(a.TopologyConfiguration(false)),"b":topology(b.TopologyConfiguration(false)),"globalA":topology(a.TopologyConfiguration(true)),"globalB":topology(b.TopologyConfiguration(true))})}
 record("initial")
 if r.Scenario=="close"{_,e=a.QueueDeclare("idle",false,true,false,false,nil);check(e);record("declared");check(a.Close());record("channel-closed")}else{
  check(a.Qos(2,0,false));check(b.Qos(4,0,true))
  nested:=amqp.Table{"label":"original","nested":amqp.Table{"enabled":true}}
  check(a.ExchangeDeclare("source","direct",false,false,false,false,nested));check(b.ExchangeDeclare("destination","direct",false,false,false,false,nil))
  _,e=a.QueueDeclare("qa",false,false,false,false,nil);check(e);_,e=b.QueueDeclare("qb",false,false,false,false,nil);check(e)
  check(a.QueueBind("qa","key","source",false,amqp.Table{"kind":int32(1)}));check(b.QueueBind("qb","key","destination",false,nil));check(b.ExchangeBind("destination","bridge","source",false,amqp.Table{"flag":true}));record("declared")
  if r.Scenario=="duplicates"{check(b.ExchangeDeclare("source","direct",false,false,false,false,nested));_,e=b.QueueDeclare("qa",false,false,false,false,nil);check(e);check(b.QueueBind("qa","key","source",false,amqp.Table{"kind":int32(1)}));check(a.ExchangeBind("destination","bridge","source",false,amqp.Table{"flag":true}));record("duplicates");check(a.Close());record("channel-closed")}
  if r.Scenario=="mutations"{check(b.QueueUnbind("qa","key","source",amqp.Table{"kind":int32(1)}));check(b.ExchangeDelete("source",false,false));_,e=b.QueueDelete("qa",false,false,false);check(e);record("deleted")}
  if r.Scenario=="clone"{view:=a.TopologyConfiguration(false);clone:=view.Clone();view.Exchanges["source"].Args["nested"].(amqp.Table)["enabled"]=false;stages=append(stages,map[string]any{"name":"clone-alias","snapshot":topology(*clone),"internal":topology(a.TopologyConfiguration(false))})}
 }
 check(c.Close());record("connection-closed");check(json.NewEncoder(os.Stdout).Encode(map[string]any{"stages":stages}))
}
