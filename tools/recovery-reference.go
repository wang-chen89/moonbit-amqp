// Independent recovery scenario for pinned rabbitmq/amqp091-go. Test only.
package main

import (
 "context"
 "encoding/json"
 "fmt"
 "os"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)
func check(err error) { if err != nil { panic(err) } }
func main() {
 if len(os.Args)!=2 { panic("provide proxy port") }
 c,err:=amqp.DialConfig("amqp://demo:test-only@127.0.0.1:"+os.Args[1]+"/",amqp.Config{
  Heartbeat:2*time.Second,Recovery:&amqp.Recovery{
   ReconnectionConfig:&amqp.ReconnectionConfig{MaxRetryCount:5,RetryInterval:40*time.Millisecond},
   OnTopologyEntityError:func(_ *amqp.Connection,_ amqp.TopologyRecoveryEntity)bool{return false},
  },
 });check(err);defer c.Close()
 a,err:=c.Channel();check(err);b,err:=c.Channel();check(err)
 id:=fmt.Sprint(time.Now().UnixNano());source:="native-source-"+id;destination:="native-dest-"+id
 check(a.ExchangeDeclare(source,"direct",false,true,false,false,nil))
 check(a.ExchangeDeclare(destination,"direct",false,true,false,false,nil))
 check(a.ExchangeBind(destination,"key",source,false,nil))
 q,err:=b.QueueDeclare("",false,true,true,false,nil);check(err)
 check(b.QueueBind(q.Name,"key",destination,false,nil));check(b.Qos(1,0,false))
 deliveries,err:=b.Consume(q.Name,"stable",false,false,false,false,nil);check(err)
 check(a.Confirm(false));confirmations:=a.NotifyPublish(make(chan amqp.Confirmation,8))
 states:=make(chan *amqp.StateChanged,16);c.NotifyStateChange(states)
 encode:=json.NewEncoder(os.Stdout)
 previous:=q.Name
 for cycle:=0;cycle<3;cycle++ {
  body:=fmt.Sprint("payload-",cycle)
  check(a.PublishWithContext(context.Background(),source,"key",true,false,amqp.Publishing{Body:[]byte(body)}))
  select {case confirmation:=<-confirmations:if !confirmation.Ack{panic("nack")};case <-time.After(8*time.Second):panic("confirm timeout")}
  var message amqp.Delivery
  select {case message=<-deliveries:case <-time.After(8*time.Second):panic("delivery timeout")}
  if string(message.Body)!=body {panic("body mismatch")};check(message.Ack(false))
  check(encode.Encode(map[string]any{"stage":"cycle","cycle":cycle,"body":body,"confirmed":true}))
  if cycle==2 {break}
  reconnecting:=false
  deadline:=time.After(10*time.Second)
 wait:
  for {select{
   case state,ok:=<-states:
    if !ok {panic("state listener closed")}
    if state.To==amqp.StateReconnecting{reconnecting=true}
    if state.To==amqp.StateClosed{panic(state.Err)}
    if reconnecting&&state.To==amqp.StateOpen{break wait}
   case <-deadline:panic("reconnect timeout")
  }}
  current:=""
  for _,queue:=range b.TopologyConfiguration(false).Queues{current=queue.ActualName}
  if current==""||current==previous{panic("server-named queue was not renamed")};previous=current
  check(encode.Encode(map[string]any{"stage":"recovered","cycle":cycle+1,"renamed":true}))
 }
 check(c.Close())
}
