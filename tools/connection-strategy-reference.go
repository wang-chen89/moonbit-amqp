// Public ConnectionRecovery adapter for the pinned, unmodified upstream.
package main
import (
 "crypto/tls"
 "crypto/x509"
 "encoding/json"
 "errors"
 "net"
 "os"
 "strings"
 "sync"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)
type Request struct{URI,Mode,Certificate string;Broker bool}
type policy struct{mu sync.Mutex;mode string;connections,channels int;codes []int;connectionDone,channelDone chan struct{};channelSeen chan struct{};once sync.Once}
func check(e error){if e!=nil{panic(e)}}
func wait(ch <-chan struct{}){select{case <-ch:case <-time.After(8*time.Second):panic("policy callback timeout")}}
func (p *policy) OnConnectionClose(c *amqp.Connection,e *amqp.Error){
 p.mu.Lock();p.connections++;p.codes=append(p.codes,e.Code);p.mu.Unlock();defer func(){p.connectionDone<-struct{}{}}()
 switch p.mode{
 case "connection-noop","connection-manual":return
 case "connection-close":wait(p.channelSeen);_ = c.Close();return
 case "connection-delay":time.Sleep(35*time.Millisecond)
 }
 (&amqp.DefaultConnectionRecovery{}).OnConnectionClose(c,e)
}
func (p *policy) OnChannelClose(ch *amqp.Channel,e *amqp.Error){
 p.mu.Lock();p.channels++;p.codes=append(p.codes,e.Code);p.mu.Unlock();p.once.Do(func(){close(p.channelSeen)});defer func(){p.channelDone<-struct{}{}}()
 if p.mode=="channel-close"{_ = ch.Close();return}
 if p.mode=="channel-noop"||p.mode=="channel-manual"{return}
 (&amqp.DefaultConnectionRecovery{}).OnChannelClose(ch,e)
}
func cancelled(ch <-chan struct{})bool{select{case <-ch:return true;default:return false}}
func main(){
 var r Request;check(json.NewDecoder(os.Stdin).Decode(&r));p:=&policy{mode:r.Mode,codes:[]int{},connectionDone:make(chan struct{},8),channelDone:make(chan struct{},8),channelSeen:make(chan struct{})}
 cfg:=amqp.Config{Heartbeat:time.Second,FrameSize:131072,ChannelMax:64}
 if r.Mode!="off"{cfg.Recovery=&amqp.Recovery{ConnectionRecovery:p,ReconnectionConfig:&amqp.ReconnectionConfig{MaxRetryCount:2,RetryInterval:time.Millisecond}}}
 if r.Certificate!=""{roots:=x509.NewCertPool();if !roots.AppendCertsFromPEM([]byte(r.Certificate)){panic("certificate")};cfg.TLSClientConfig=&tls.Config{RootCAs:roots,ServerName:"localhost",MinVersion:tls.VersionTLS12}}
 var mu sync.Mutex;var socket net.Conn;dials:=0
 cfg.Dial=func(network,address string)(net.Conn,error){mu.Lock();dials++;n:=dials;mu.Unlock();if n>1&&r.Mode=="exhaust"{return nil,errors.New("injected offline")};raw,e:=net.DialTimeout(network,address,time.Second);mu.Lock();socket=raw;mu.Unlock();return raw,e}
 c,e:=amqp.DialConfig(r.URI,cfg);check(e);defer c.Close();ch,e:=c.Channel();check(e);_,e=ch.QueueDeclare("policy-tracked",false,false,true,false,nil);check(e)
 cn:=c.NotifyRecoveryCancel(make(chan struct{}));hn:=ch.NotifyRecoveryCancel(make(chan struct{}))
 if r.Mode=="explicit-close"{check(c.Close())}else if strings.HasPrefix(r.Mode,"channel-"){
  _,e=ch.QueueInspect("policy-absent");if e==nil{panic("expected missing queue")};wait(p.channelDone);if r.Mode=="channel-manual"{check(ch.Reconnect())}
 }else{mu.Lock();raw:=socket;mu.Unlock();check(raw.Close());if r.Mode=="off"{wait(cn);wait(hn)}else{wait(p.connectionDone);wait(p.channelDone);if r.Mode=="connection-manual"{check(c.Reconnect())}}}
 p.mu.Lock();connectionCalls,channelCalls:=p.connections,p.channels;codes:=append([]int{},p.codes...);p.mu.Unlock();mu.Lock();dialCount:=dials;mu.Unlock()
 out:=map[string]any{"connectionCalls":connectionCalls,"channelCalls":channelCalls,"dials":dialCount,"transportClosed":c.IsClosed(),"channelTransportClosed":ch.IsClosed(),"connectionCancelled":cancelled(cn),"channelCancelled":cancelled(hn),"recoveryEnabled":c.IsRecoveryEnabled(),"errorCodes":codes}
 _,tracked:=ch.TopologyConfiguration(true).Queues["policy-tracked"];out["tracked"]=tracked
 if r.Broker&&!c.IsClosed()&&!ch.IsClosed(){check(ch.Confirm(false));h,e:=ch.PublishWithDeferredConfirm("","policy-tracked",false,false,amqp.Publishing{Body:[]byte("policy-restored")});check(e);out["confirmed"]=h.Wait();m,ok,e:=ch.Get("policy-tracked",true);check(e);out["delivered"]=ok&&string(m.Body)=="policy-restored"}
 check(json.NewEncoder(os.Stdout).Encode(out))
}
