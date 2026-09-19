// Test adapter: all protocol and recovery behavior comes from the unmodified pinned Go client.
package main
import("encoding/json";"fmt";"os";"time";amqp "github.com/rabbitmq/amqp091-go")
type Request struct{Port int;Prefix,Mode string}
func check(e error){if e!=nil{panic(e)}}
func code(e error)int{if v,ok:=e.(*amqp.Error);ok{return v.Code};panic(fmt.Sprint("expected AMQP error: ",e))}
func next(messages <-chan amqp.Delivery)amqp.Delivery{select{case m,ok:=<-messages:if !ok{panic("consumer closed")};return m;case <-time.After(8*time.Second):panic("delivery timeout")}}
func main(){
 var r Request;check(json.NewDecoder(os.Stdin).Decode(&r));cfg:=amqp.Config{Heartbeat:2*time.Second}
 if r.Mode=="recovery"{cfg.Recovery=&amqp.Recovery{ReconnectionConfig:&amqp.ReconnectionConfig{MaxRetryCount:5,RetryInterval:40*time.Millisecond},OnTopologyEntityError:func(_ *amqp.Connection,_ amqp.TopologyRecoveryEntity)bool{return false}}}
 c,e:=amqp.DialConfig(fmt.Sprintf("amqp://demo:test-only@127.0.0.1:%d/",r.Port),cfg);check(e);defer c.Close();ch,e:=c.Channel();check(e);out:=map[string]any{};emit:=json.NewEncoder(os.Stdout)
 source,dest,q:=r.Prefix+"source",r.Prefix+"destination",r.Prefix+"queue"
 if r.Mode=="wire"{
  check(ch.ExchangeDeclare("source","direct",false,false,false,true,nil));check(ch.ExchangeDeclarePassive("source","direct",false,false,false,true,nil));check(ch.ExchangeDeclare("destination","direct",false,false,false,true,nil))
  _,e=ch.QueueDeclare("queue",false,false,false,true,nil);check(e);_,e=ch.QueueDeclarePassive("queue",false,false,false,true,nil);check(e)
  check(ch.ExchangeBind("destination","key","source",true,nil));check(ch.QueueBind("queue","key","destination",true,nil));_,e=ch.Consume("queue","consumer",false,false,false,true,nil);check(e);check(ch.Cancel("consumer",true));_,e=ch.QueuePurge("queue",true);check(e);check(ch.ExchangeUnbind("destination","key","source",true,nil));_,e=ch.QueueDelete("queue",false,false,true);check(e);check(ch.ExchangeDelete("destination",false,true));check(ch.ExchangeDelete("source",false,true));check(ch.Qos(0,0,false))
  done:=make(chan error,1);go func(){done<-ch.Confirm(true)}();select{case <-done:out["confirmWait"]=false;case <-time.After(300*time.Millisecond):out["confirmWait"]=true;check(c.CloseDeadline(time.Now().Add(time.Second)));<-done};out["wire"]=true
 }else if r.Mode=="confirm-no-wait"{
  done:=make(chan error,1);go func(){done<-ch.Confirm(true)}();select{case <-done:out["completed"]=true;case <-time.After(300*time.Millisecond):out["completed"]=false;out["connectionOpen"]=!c.IsClosed();check(c.CloseDeadline(time.Now().Add(time.Second)));<-done}
 }else if r.Mode=="missing-queue"||r.Mode=="missing-exchange"{
  if r.Mode=="missing-queue"{_,e=ch.QueueDeclarePassive(q,false,false,false,true,nil);check(e)}else{_,e=ch.QueueDeclare(q,false,false,false,false,nil);check(e);check(ch.QueueBind(q,"key",source,true,nil))}
  out["accepted"]=true;out["code"]=code(ch.Qos(0,0,false));s,e:=c.Channel();check(e);check(s.Qos(0,0,false));out["connectionOpen"]=!c.IsClosed();if r.Mode=="missing-exchange"{_,e=s.QueueDelete(q,false,false,false);check(e)}
 }else{
  anonymous:=r.Mode=="anonymous";wireQueue:=q;if anonymous{wireQueue=""}
  check(ch.ExchangeDeclare(source,"direct",false,false,false,true,nil));check(ch.ExchangeDeclare(dest,"direct",false,false,false,true,nil));check(ch.ExchangeBind(dest,"key",source,true,nil))
  // Confirm(true) waits for a suppressed reply in this pinned version. Its
  // separate bounded scenario reports the difference; other broker cases use
  // Confirm(false) to exercise the remaining no-wait operations independently.
  declared,e:=ch.QueueDeclare(wireQueue,false,false,true,true,nil);check(e);check(ch.QueueBind(wireQueue,"key",dest,true,nil));check(ch.Confirm(false));confirm:=ch.NotifyPublish(make(chan amqp.Confirmation,8))
  publish:=func(body string){check(ch.Publish(source,"key",false,false,amqp.Publishing{Body:[]byte(body)}));select{case v:=<-confirm:if !v.Ack{panic("nack")};case <-time.After(8*time.Second):panic("confirm timeout")}}
  get:=func()string{d,ok,e:=ch.Get(wireQueue,true);check(e);if !ok{panic("empty queue")};return string(d.Body)}
  switch r.Mode{
  case "operations":
   publish("routed");passive,e:=ch.QueueDeclarePassive(q,false,false,false,true,nil);check(e);observed,e:=ch.QueueInspect(q);check(e);out["declaredCount"]=declared.Messages;out["passiveCount"]=passive.Messages;out["observedCount"]=observed.Messages;out["body"]=get()
   publish("purge");n,e:=ch.QueuePurge(q,true);check(e);out["purgeCount"]=n;observed,e=ch.QueueInspect(q);check(e);out["afterPurge"]=observed.Messages;check(ch.ExchangeUnbind(dest,"key",source,true,nil));check(ch.Qos(0,0,false));publish("unbound");_,ok,e:=ch.Get(q,true);check(e);out["unboundEmpty"]=!ok;n,e=ch.QueueDelete(q,false,false,true);check(e);out["deleteCount"]=n
  case "consumer","recovery":
   check(ch.Qos(1,0,false));messages,e:=ch.Consume(q,"consumer",false,false,false,true,nil);check(e);publish("before");m:=next(messages);check(m.Ack(false));out["before"]=string(m.Body)
   if r.Mode=="recovery"{states:=make(chan *amqp.StateChanged,16);c.NotifyStateChange(states);check(ch.Qos(1,0,false));check(emit.Encode(map[string]any{"stage":"ready"}));seen:=false;deadline:=time.After(12*time.Second);wait:for{select{case state:=<-states:if state.To==amqp.StateReconnecting{seen=true};if seen&&state.To==amqp.StateOpen{break wait};if state.To==amqp.StateClosed{panic(state.Err)};case <-deadline:panic("recovery timeout")}};publish("after");m=next(messages);check(m.Ack(false));out["after"]=string(m.Body)}
   check(ch.Cancel("consumer",true));observed,e:=ch.QueueInspect(q);check(e);out["consumersAfterCancel"]=observed.Consumers;publish("get-after-cancel");out["afterCancel"]=get();_,e=ch.QueueDelete(q,false,false,true);check(e)
  case "anonymous":out["declaredName"]=declared.Name;out["declaredCount"]=declared.Messages;publish("anonymous");out["body"]=get();_,e=ch.QueueDelete("",false,false,true);check(e)
  case "delete-if-empty":publish("retained");n,e:=ch.QueueDelete(q,false,true,true);check(e);out["deleteCount"]=n;out["code"]=code(ch.Qos(0,0,false));ch,e=c.Channel();check(e);d,ok,e:=ch.Get(q,true);check(e);out["retained"]=ok;out["body"]=string(d.Body);_,e=ch.QueueDelete(q,false,false,false);check(e)
  case "cancel-requeue":check(ch.Qos(1,0,false));_,e=ch.Consume(q,"consumer",false,false,false,true,nil);check(e);publish("late");check(ch.Cancel("consumer",true));check(ch.Qos(0,0,false));check(ch.Close());ch,e=c.Channel();check(e);d,ok,e:=ch.Get(q,true);check(e);out["retained"]=ok;out["body"]=string(d.Body);_,e=ch.QueueDelete(q,false,false,false);check(e)
  default:panic("invalid mode")
  }
  check(ch.ExchangeDelete(dest,false,true));check(ch.ExchangeDelete(source,false,true));check(ch.Qos(0,0,false))
 }
 if !c.IsClosed(){check(c.Close())};check(emit.Encode(out))
}
