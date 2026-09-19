// Test-only operation adapter. All protocol, recording and recovery are the original Go library.
package main

import (
 "context"
 "encoding/json"
 "fmt"
 "os"
 "sort"
 "strings"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)
type Step struct { Op,Name,Source,Destination,Queue,Key,Tag,Type string; Channel int; Auto bool; Args amqp.Table }
type Request struct { Port int; Prefix string; Steps []Step }
func check(err error) {if err!=nil {panic(err)}}
func main() {
 input:=json.NewDecoder(os.Stdin);output:=json.NewEncoder(os.Stdout);var request Request;check(input.Decode(&request))
 c,err:=amqp.DialConfig(fmt.Sprintf("amqp://demo:test-only@127.0.0.1:%d/",request.Port),amqp.Config{Heartbeat:2*time.Second,Recovery:&amqp.Recovery{
  ReconnectionConfig:&amqp.ReconnectionConfig{MaxRetryCount:5,RetryInterval:40*time.Millisecond},OnTopologyEntityError:func(_ *amqp.Connection,_ amqp.TopologyRecoveryEntity)bool{return false},
 }});check(err);defer c.Close()
 channels:=make([]*amqp.Channel,2);for i:=range channels{channels[i],err=c.Channel();check(err)}
 name:=func(s string)string{return request.Prefix+s}
 _,err=channels[0].QueueDeclare(name("survivor"),false,false,false,false,nil);check(err)
 snapshot:=func()map[string]any{
  t:=channels[0].TopologyConfiguration(true);exchanges:=[]string{};queues:=[]string{}
  for n:=range t.Exchanges{exchanges=append(exchanges,strings.TrimPrefix(n,request.Prefix))};for n:=range t.Queues{queues=append(queues,strings.TrimPrefix(n,request.Prefix))}
  sort.Strings(exchanges);sort.Strings(queues);return map[string]any{"exchanges":exchanges,"queues":queues,"bindings":len(t.Bindings),"exchangeBindings":len(t.ExchangeBindings)}
 }
 checkpoints:=[]any{}
 for _,s:=range request.Steps {
  ch:=channels[s.Channel]
  switch s.Op {
  case "exchange":kind:=s.Type;if kind==""{kind="direct"};check(ch.ExchangeDeclare(name(s.Name),kind,false,s.Auto,false,false,s.Args))
  case "queue":_,err=ch.QueueDeclare(name(s.Name),false,s.Auto,false,false,s.Args);check(err)
  case "bind":check(ch.QueueBind(name(s.Queue),s.Key,name(s.Source),false,s.Args))
  case "unbind":check(ch.QueueUnbind(name(s.Queue),s.Key,name(s.Source),s.Args))
  case "exchangeBind":check(ch.ExchangeBind(name(s.Destination),s.Key,name(s.Source),false,s.Args))
  case "exchangeUnbind":check(ch.ExchangeUnbind(name(s.Destination),s.Key,name(s.Source),false,s.Args))
  case "queueDelete":_,err=ch.QueueDelete(name(s.Queue),false,false,false);check(err)
  case "exchangeDelete":check(ch.ExchangeDelete(name(s.Name),false,false))
  case "consume":messages,e:=ch.Consume(name(s.Queue),s.Tag,true,false,false,false,nil);check(e);go func(){for range messages{}}()
  case "cancel":check(ch.Cancel(s.Tag,false))
  case "checkpoint":checkpoints=append(checkpoints,snapshot())
  default:panic("unknown operation")
  }
 }
 states:=make(chan *amqp.StateChanged,16);c.NotifyStateChange(states)
 check(output.Encode(map[string]any{"stage":"mutated","topology":snapshot(),"checkpoints":checkpoints}))
 reconnecting:=false;deadline:=time.After(12*time.Second)
 wait:for{select{case state,ok:=<-states:if !ok{panic("state listener closed")};if state.To==amqp.StateReconnecting{reconnecting=true};if state.To==amqp.StateClosed{panic(state.Err)};if reconnecting&&state.To==amqp.StateOpen{break wait};case <-deadline:panic("recovery timeout")}}
 ch:=channels[0];check(ch.Confirm(false));confirmations:=ch.NotifyPublish(make(chan amqp.Confirmation,2))
 check(ch.PublishWithContext(context.Background(),"",name("survivor"),false,false,amqp.Publishing{Body:[]byte("after-recovery")}))
 select{case ack:=<-confirmations:if !ack.Ack{panic("nack")};case <-time.After(5*time.Second):panic("confirm timeout")}
 message,ok,err:=ch.Get(name("survivor"),true);check(err);if !ok||string(message.Body)!="after-recovery"{panic("survivor mismatch")}
 check(output.Encode(map[string]any{"stage":"recovered","topology":snapshot(),"survivor":true}))
 var done string;check(input.Decode(&done));check(c.Close())
}
