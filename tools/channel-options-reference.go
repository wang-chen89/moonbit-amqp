// Test adapter only. The pinned amqp091-go sources are unmodified.
package main
import("encoding/json";"fmt";"os";"time";amqp "github.com/rabbitmq/amqp091-go")
type Request struct{Port int;Prefix,Mode string}
func check(e error){if e!=nil{panic(e)}}
func code(e error)int{if v,ok:=e.(*amqp.Error);ok{return v.Code};panic(fmt.Sprint("expected AMQP error: ",e))}
func next(messages <-chan amqp.Delivery)amqp.Delivery{select{case m,ok:=<-messages:if !ok{panic("consumer closed")};return m;case <-time.After(8*time.Second):panic("delivery timeout")}}
func main(){
 var r Request;check(json.NewDecoder(os.Stdin).Decode(&r));cfg:=amqp.Config{Heartbeat:2*time.Second};if r.Mode=="recovery"{cfg.Recovery=&amqp.Recovery{ReconnectionConfig:&amqp.ReconnectionConfig{MaxRetryCount:5,RetryInterval:40*time.Millisecond}}}
 url:=fmt.Sprintf("amqp://demo:test-only@127.0.0.1:%d/",r.Port);c,e:=amqp.DialConfig(url,cfg);check(e);defer c.Close();ch,e:=c.Channel();check(e);out:=map[string]any{};emit:=json.NewEncoder(os.Stdout);q:=r.Prefix+"q"
 if r.Mode=="wire"{
  check(ch.Qos(7,65536,false));check(ch.Qos(65535,4294967295,true));check(ch.Qos(0,0,false))
  for i:=0;i<4;i++{tag:=fmt.Sprint("c",i);_,e=ch.Consume("q",tag,true,true,i&1!=0,i&2!=0,nil);check(e);check(ch.Cancel(tag,false))}
  check(ch.Flow(false));check(ch.Flow(true));for i:=0;i<8;i++{check(ch.Publish("","q",i&1!=0,i&2!=0,amqp.Publishing{Body:[]byte("data")}))};check(ch.Qos(2,0,false));out["wire"]=true
 }else if r.Mode=="flow-notice"{
  notices:=ch.NotifyFlow(make(chan bool,4));check(ch.Qos(1,0,false));values:=[]bool{};for i:=0;i<2;i++{select{case v:=<-notices:values=append(values,v);case <-time.After(time.Second):panic("notice timeout")}};check(ch.Qos(2,0,false));out["values"]=values
 }else if r.Mode=="publish-paused"{
  notices:=ch.NotifyFlow(make(chan bool,1));check(ch.Qos(1,0,false));select{case active:=<-notices:if active{panic("expected pause")};case <-time.After(time.Second):panic("notice timeout")};check(ch.Publish("","q",false,false,amqp.Publishing{Body:[]byte("paused")}));check(ch.Qos(2,0,false));out["published"]=true
 }else if r.Mode=="qos-wrap"{check(ch.Qos(65536,4294967296,false));out["accepted"]=true
 }else if r.Mode=="qos-size"||r.Mode=="qos-max"||r.Mode=="flow-false"{
  if r.Mode=="flow-false"{e=ch.Flow(false)}else{size:=1;if r.Mode=="qos-max"{size=4294967295};e=ch.Qos(1,size,false)};out["code"]=code(e);s,e:=c.Channel();out["connectionOpen"]=e==nil;if e==nil{check(s.Close())}
 }else if r.Mode=="immediate"||r.Mode=="immediate-stream"{
  _,e=ch.QueueDeclare(q,false,false,false,false,nil);check(e);check(ch.Confirm(false));closed:=ch.NotifyClose(make(chan *amqp.Error,1));check(ch.Publish("",q,false,true,amqp.Publishing{Body:[]byte("data")}));select{case e:=<-closed:out["code"]=code(e);case <-time.After(8*time.Second):panic("close timeout")};s,e:=c.Channel();out["connectionOpen"]=e==nil;if e==nil{check(s.Close())};other,e:=amqp.DialConfig(url,amqp.Config{});check(e);defer other.Close();admin,e:=other.Channel();check(e);_,ok,e:=admin.Get(q,true);check(e);out["messageStored"]=ok;_,e=admin.QueueDelete(q,false,false,false);check(e)
 }else if r.Mode=="flow-true"{
  check(ch.Flow(true));_,e=ch.QueueDeclare(q,false,false,true,false,nil);check(e);check(ch.Publish("",q,false,false,amqp.Publishing{Body:[]byte("active")}));d,ok,e:=ch.Get(q,true);check(e);out["active"]=true;out["found"]=ok;out["body"]=string(d.Body)
 }else if r.Mode=="no-local"||r.Mode=="no-local-nowait"||r.Mode=="recovery"{
  _,e=ch.QueueDeclare(q,false,false,true,false,nil);check(e);check(ch.Qos(1,0,false));messages,e:=ch.Consume(q,"consumer",false,false,true,r.Mode=="no-local-nowait",nil);check(e);publish:=func(body string){check(ch.Publish("",q,false,false,amqp.Publishing{Body:[]byte(body)}))};publish("local-before");m:=next(messages);out["body"]=string(m.Body);check(m.Ack(false))
  if r.Mode=="recovery"{states:=make(chan *amqp.StateChanged,16);c.NotifyStateChange(states);check(ch.Qos(1,0,false));check(emit.Encode(map[string]any{"stage":"ready"}));seen:=false;deadline:=time.After(12*time.Second);wait:for{select{case state:=<-states:if state.To==amqp.StateReconnecting{seen=true};if seen&&state.To==amqp.StateOpen{break wait};if state.To==amqp.StateClosed{panic(state.Err)};case <-deadline:panic("recovery timeout")}};publish("local-after");m=next(messages);out["after"]=string(m.Body);check(m.Ack(false))};check(ch.Cancel("consumer",false));out["connectionOpen"]=!c.IsClosed()
 }else{panic("invalid mode")}
 if !c.IsClosed(){check(c.Close())};check(emit.Encode(out))
}
