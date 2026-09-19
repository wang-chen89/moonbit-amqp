// Test adapter for the unmodified pinned Go client's single-channel recovery boundary.
package main
import("encoding/json";"fmt";"os";"sync";"time";amqp "github.com/rabbitmq/amqp091-go")
type Request struct{Port,QueueOwner int;Prefix string}
func check(err error){if err!=nil{panic(err)}}
func main(){
 input:=json.NewDecoder(os.Stdin);var r Request;check(input.Decode(&r));output:=json.NewEncoder(os.Stdout);var lock sync.Mutex
 emit:=func(value any){lock.Lock();defer lock.Unlock();check(output.Encode(value))}
 c,err:=amqp.DialConfig(fmt.Sprintf("amqp://demo:test-only@127.0.0.1:%d/",r.Port),amqp.Config{Heartbeat:2*time.Second,Recovery:&amqp.Recovery{
  ReconnectionConfig:&amqp.ReconnectionConfig{MaxRetryCount:3,RetryInterval:40*time.Millisecond},OnTopologyEntityError:func(_ *amqp.Connection,e amqp.TopologyRecoveryEntity)bool{code:=0;if v,ok:=e.Err.(*amqp.Error);ok{code=v.Code};emit(map[string]any{"stage":"entity-error","type":e.EntityType.String(),"code":code});return false},
 }});check(err);defer c.Close()
 a,err:=c.Channel();check(err);b,err:=c.Channel();check(err);chs:=[]*amqp.Channel{a,b}
 outer:=r.Prefix+"outer";inner:=r.Prefix+"inner";queue:=r.Prefix+"q"
 check(a.ExchangeDeclare(outer,"direct",false,true,false,false,nil));check(a.ExchangeDeclare(inner,"direct",false,true,false,false,nil));check(a.ExchangeBind(inner,"key",outer,false,nil))
 _,err=chs[r.QueueOwner].QueueDeclare(queue,false,true,false,false,nil);check(err);check(a.QueueBind(queue,"key",inner,false,nil))
 deliveries,err:=b.Consume(queue,"target",true,false,false,false,nil);check(err);go func(){for range deliveries{}}()
 _,err=a.QueueDeclare(r.Prefix+"sibling",false,false,false,false,nil);check(err)
 _,_,err=b.Get(r.Prefix+"missing",true);if e,ok:=err.(*amqp.Error);!ok||e.Code!=404{panic("missing queue did not close channel with 404")}
 emit(map[string]any{"stage":"channel-error","code":404})
 var done string;check(input.Decode(&done));emit(map[string]any{"stage":"done","connectionOpen":!c.IsClosed(),"siblingOpen":!a.IsClosed()});check(c.Close())
}
