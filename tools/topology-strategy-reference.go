// Custom strategy adapter using only public APIs of the pinned unmodified Go library.
package main
import (
 "crypto/tls"
 "crypto/x509"
 "encoding/json"
 "errors"
 "net"
 "os"
 "sync"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)
type Request struct{URI,Scenario,Certificate string;Broker bool}
type strategy struct{mu sync.Mutex;scenario string;calls int;counts []int}
func check(e error){if e!=nil{panic(e)}}
func (s *strategy) RecoverTopology(c *amqp.Connection,channels []*amqp.Channel)([]amqp.TopologyRecoveryEntity,error){
 s.mu.Lock();s.calls++;n:=s.calls;s.counts=append(s.counts,len(channels));s.mu.Unlock()
 switch s.scenario{
 case "replace":return nil,nil
 case "dynamic","no-channels":
  var ch *amqp.Channel;var e error
  if len(channels)==0{ch,e=c.Channel();if e!=nil{return nil,e};defer ch.Close()}else{ch=channels[0]}
  _,e=ch.QueueDeclare("strategy-dynamic",false,false,true,false,nil);return nil,e
 case "skipped":return []amqp.TopologyRecoveryEntity{{EntityType:amqp.TopologyEntityQueue,EntityName:"policy-omitted",ChannelID:1,Err:errors.New("policy skip")}},nil
 case "exhaust","channel-fail":return nil,errors.New("strategy fatal")
 case "retry":if n==1{return nil,errors.New("retry strategy")}
 }
 return (&amqp.DefaultTopologyRecovery{}).RecoverTopology(c,channels)
}
func state(events <-chan *amqp.StateChanged,to amqp.LifeCycleState)*amqp.StateChanged{timer:=time.NewTimer(8*time.Second);defer timer.Stop();for{select{case e,ok:=<-events:if !ok{panic("state ended")};if e.To==to{return e};case <-timer.C:panic("state timeout")}}}
func main(){
 var r Request;check(json.NewDecoder(os.Stdin).Decode(&r));s:=&strategy{scenario:r.Scenario,counts:[]int{}}
 cfg:=amqp.Config{Heartbeat:time.Second,FrameSize:131072,ChannelMax:64,Recovery:&amqp.Recovery{ReconnectionConfig:&amqp.ReconnectionConfig{MaxRetryCount:2,RetryInterval:time.Millisecond},TopologyRecovery:s}}
 if r.Scenario=="disabled"{cfg.Recovery.TopologyRecoveryMode=amqp.TopologyRecoveryDisabled}
 if r.Certificate!=""{pool:=x509.NewCertPool();if !pool.AppendCertsFromPEM([]byte(r.Certificate)){panic("certificate")};cfg.TLSClientConfig=&tls.Config{RootCAs:pool,ServerName:"localhost",MinVersion:tls.VersionTLS12}}
 var mu sync.Mutex;var socket net.Conn;dials:=0
 cfg.Dial=func(network,address string)(net.Conn,error){raw,e:=net.DialTimeout(network,address,time.Second);mu.Lock();socket=raw;dials++;mu.Unlock();return raw,e}
 c,e:=amqp.DialConfig(r.URI,cfg);check(e);defer c.Close();events:=make(chan *amqp.StateChanged,32);c.NotifyStateChange(events)
 var ch *amqp.Channel
 if r.Scenario!="no-channels"{ch,e=c.Channel();check(e);_,e=ch.QueueDeclare("strategy-tracked",false,false,true,false,nil);check(e)}
 skipped:=[]string{};out:=map[string]any{"result":"ok"}
 if r.Scenario=="channel"||r.Scenario=="channel-fail"{_,e=c.Channel();check(e);if e=ch.Reconnect();e!=nil{out["result"]="error";out["rawError"]=e.Error()}}else{
  mu.Lock();raw:=socket;mu.Unlock();check(raw.Close());wanted:=amqp.StateOpen;if r.Scenario=="exhaust"{wanted=amqp.StateClosed;out["result"]="error"}
  changed:=state(events,wanted);for _,entry:=range changed.SkippedTopologyEntities{skipped=append(skipped,entry.EntityName)}
 }
 s.mu.Lock();out["calls"]=s.calls;out["channelCounts"]=append([]int{},s.counts...);s.mu.Unlock();mu.Lock();out["dials"]=dials;mu.Unlock()
 out["closed"]=c.IsClosed();out["channelClosed"]=ch!=nil&&ch.IsClosed();out["skipped"]=skipped
 out["trackedRecorded"]=false;out["dynamicRecorded"]=false;if ch!=nil&&!c.IsClosed(){top:=ch.TopologyConfiguration(true);_,a:=top.Queues["strategy-tracked"];_,b:=top.Queues["strategy-dynamic"];out["trackedRecorded"]=a;out["dynamicRecorded"]=b}
 if r.Broker&&r.Scenario!="exhaust"&&r.Scenario!="channel-fail"{
  present:=func(name string)bool{probe,e:=amqp.DialConfig(r.URI,amqp.Config{Heartbeat:time.Second,TLSClientConfig:cfg.TLSClientConfig});check(e);defer probe.Close();p,e:=probe.Channel();check(e);_,e=p.QueueInspect(name);if e==nil{return true};var ae *amqp.Error;if errors.As(e,&ae){if ae.Code==404{return false};if ae.Code==405{return true}};panic(e)}
  out["trackedExists"]=present("strategy-tracked");out["dynamicExists"]=present("strategy-dynamic")
 }
 check(json.NewEncoder(os.Stdout).Encode(out))
}
