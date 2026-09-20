// Public API adapter around the pinned, unmodified Go implementation.
package main

import (
 "context"
 "crypto/tls"
 "crypto/x509"
 "encoding/json"
 "errors"
 "io"
 "net"
 "os"
 "sync/atomic"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)
type Request struct {Mode,URI,Target,CAFile,CertFile,KeyFile,ServerName string; Timeout int; Broker,TLSOpen bool}
type tracked struct {net.Conn; closed atomic.Int32; cleared atomic.Bool}
func(t *tracked)Close()error{t.closed.Add(1);return t.Conn.Close()}
func(t *tracked)SetDeadline(v time.Time)error{if v.IsZero(){t.cleared.Store(true)};return t.Conn.SetDeadline(v)}
type bytesOnly struct{io.ReadWriteCloser}
func check(e error){if e!=nil{panic(e)}}
func main(){
 var r Request;check(json.NewDecoder(os.Stdin).Decode(&r));if r.Timeout==0{r.Timeout=5000};duration:=time.Duration(r.Timeout)*time.Millisecond
 cfg:=amqp.Config{FrameSize:131072,ChannelMax:64,Heartbeat:time.Second,Locale:"en_US",Vhost:"/",SASL:[]amqp.Authentication{&amqp.PlainAuth{Username:"demo",Password:"test-only"}},Properties:amqp.Table{"product":"transport-test"}}
 if r.CAFile!=""{pem,e:=os.ReadFile(r.CAFile);check(e);pool:=x509.NewCertPool();pool.AppendCertsFromPEM(pem);cfg.TLSClientConfig=&tls.Config{RootCAs:pool,ServerName:r.ServerName,MinVersion:tls.VersionTLS12};if r.CertFile!=""{cert,e:=tls.LoadX509KeyPair(r.CertFile,r.KeyFile);check(e);cfg.TLSClientConfig.Certificates=[]tls.Certificate{cert};cfg.SASL=[]amqp.Authentication{&amqp.ExternalAuth{}}}}
 calls:=[]map[string]string{};var raw *tracked;marker:=errors.New("dial marker")
 dial:=func(network,address string)(net.Conn,error){calls=append(calls,map[string]string{"network":network,"address":address});if r.Mode=="dial-error"{return nil,marker};s,e:=net.DialTimeout("tcp",r.Target,duration);if e!=nil{return nil,e};raw=&tracked{Conn:s};if e=raw.SetDeadline(time.Now().Add(duration));e!=nil{raw.Close();return nil,e};return raw,nil}
 var c *amqp.Connection;var e error
 if r.Mode=="dial"||r.Mode=="dial-error"{cfg.Dial=dial;c,e=amqp.DialConfig(r.URI,cfg)}else{
  var s net.Conn
  if r.Mode=="default"{s,e=amqp.DefaultDial(duration)("tcp",r.Target);if e==nil{raw=&tracked{Conn:s};s=raw}}else{s,e=dial("tcp",r.Target);calls=[]map[string]string{}}
  if e==nil{var transport io.ReadWriteCloser=s
   if r.TLSOpen{secure:=tls.Client(s,cfg.TLSClientConfig);e=secure.Handshake();transport=secure}
   if r.Mode=="generic"{transport=&bytesOnly{ReadWriteCloser:transport}}
   if e==nil{c,e=amqp.Open(transport,cfg)}else{s.Close()}
  }
 }
 row:=map[string]any{"calls":calls,"ok":e==nil,"dialErrorIdentity":errors.Is(e,marker)}
 if e==nil{
  ch,err:=c.Channel();check(err);_,err=ch.QueueDeclare("transport-probe",false,true,true,false,nil);check(err);check(ch.Confirm(false))
  confirmed,err:=ch.PublishWithDeferredConfirm("","transport-probe",false,false,amqp.Publishing{Body:[]byte("transport message")});check(err)
  ctx,cancel:=context.WithTimeout(context.Background(),duration);ack,err:=confirmed.WaitContext(ctx);cancel();check(err)
  body:="";if r.Broker{msg,ok,err:=ch.Get("transport-probe",true);check(err);if !ok{panic("missing message")};body=string(msg.Body)}
  row["result"]=map[string]any{"ack":ack,"body":body,"vhost":c.Config.Vhost,"mechanism":c.Config.SASL[0].Mechanism(),"channelMax":c.Config.ChannelMax,"frameMax":c.Config.FrameSize,"heartbeat":int(c.Config.Heartbeat/time.Second),"tls":c.ConnectionState().HandshakeComplete}
  check(c.Close())
 }
 if raw!=nil{for i:=0;i<100&&raw.closed.Load()==0;i++{time.Sleep(time.Millisecond)};row["transportClosed"]=raw.closed.Load()>0;row["deadlineCleared"]=raw.cleared.Load();defer raw.Close()}
 check(json.NewEncoder(os.Stdout).Encode(row))
}
