// Test adapter only. No changes to the pinned amqp091-go source.
package main

import (
 "crypto/tls"
 "crypto/x509"
 "encoding/json"
 "os"
 "reflect"
 "strconv"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)

func main() {
 var raw json.RawMessage
 if err := json.NewDecoder(os.Stdin).Decode(&raw); err != nil { panic(err) }
 if len(raw)>0 && raw[0]=='{' { connectionProbe(raw); return }
 var inputs []string
 if err := json.Unmarshal(raw,&inputs); err != nil { panic(err) }
 rows := []map[string]any{}
 for _, input := range inputs {
  u, err := amqp.ParseURI(input)
  if err != nil { rows = append(rows, map[string]any{"ok":false}); continue }
  h := reflect.ValueOf(u.Heartbeat)
  var heartbeat any
  if h.FieldByName("hasValue").Bool() { heartbeat = strconv.FormatInt(h.FieldByName("value").Int(),10) }
  auth := u.AuthMechanism
  if auth == nil { auth = []string{} }
  rows = append(rows,map[string]any{"ok":true,"scheme":u.Scheme,"host":u.Host,"port":u.Port,"username":u.Username,"password":u.Password,"vhost":u.Vhost,"certFile":u.CertFile,"keyFile":u.KeyFile,"caCertFile":u.CACertFile,"serverName":u.ServerName,"authMechanism":auth,"heartbeatNs":heartbeat,"connectionTimeout":strconv.Itoa(u.ConnectionTimeout),"channelMax":u.ChannelMax,"canonical":u.String()})
 }
 if err := json.NewEncoder(os.Stdout).Encode(rows); err != nil { panic(err) }
}

type connectionRequest struct {
 URI, Vhost string
 Heartbeat, ChannelMax int
 TLSOverride bool
 CAFile, CertFile, KeyFile, ServerName string
 SASL []string
}

func connectionProbe(raw []byte) {
 var r connectionRequest
 if err := json.Unmarshal(raw,&r); err != nil { panic(err) }
 out := json.NewEncoder(os.Stdout)
 fail := func() { _ = out.Encode(map[string]any{"ok":false}) }
 config := amqp.Config{Vhost:r.Vhost,Heartbeat:time.Duration(r.Heartbeat)*time.Second,ChannelMax:uint16(r.ChannelMax),FrameSize:131072}
 if r.TLSOverride {
  config.TLSClientConfig=&tls.Config{MinVersion:tls.VersionTLS12,ServerName:r.ServerName}
  if r.CAFile!="" { data,e:=os.ReadFile(r.CAFile);if e!=nil {fail();return};pool:=x509.NewCertPool();pool.AppendCertsFromPEM(data);config.TLSClientConfig.RootCAs=pool }
  if r.CertFile!=""&&r.KeyFile!="" {cert,e:=tls.LoadX509KeyPair(r.CertFile,r.KeyFile);if e!=nil {fail();return};config.TLSClientConfig.Certificates=[]tls.Certificate{cert}}
 }
 if len(r.SASL)>0 {
  uri,e:=amqp.ParseURI(r.URI);if e!=nil {fail();return}
  for _,s:=range r.SASL { switch s {case "PLAIN":config.SASL=append(config.SASL,uri.PlainAuth());case "AMQPLAIN":config.SASL=append(config.SASL,uri.AMQPlainAuth());case "EXTERNAL":config.SASL=append(config.SASL,&amqp.ExternalAuth{});default:fail();return} }
 }
 c,e:=amqp.DialConfig(r.URI,config);if e!=nil {fail();return};defer c.Close()
 ch,e:=c.Channel();if e!=nil {fail();return};defer ch.Close()
 q,e:=ch.QueueDeclare("",false,true,true,false,nil);if e!=nil {fail();return}
 if e=ch.Confirm(false);e!=nil {fail();return}
 confirms:=ch.NotifyPublish(make(chan amqp.Confirmation,1))
 if e=ch.Publish("",q.Name,false,false,amqp.Publishing{Body:[]byte("URI connection probe")});e!=nil {fail();return}
 select {case ack:=<-confirms:if !ack.Ack {fail();return};case <-time.After(3*time.Second):fail();return}
 message,ok,e:=ch.Get(q.Name,true);if e!=nil||!ok {fail();return}
 _=out.Encode(map[string]any{"ok":true,"mechanism":c.Config.SASL[0].Mechanism(),"vhost":c.Config.Vhost,"channelMax":c.Config.ChannelMax,"frameMax":c.Config.FrameSize,"heartbeat":int(c.Config.Heartbeat/time.Second),"body":string(message.Body),"tls":c.ConnectionState().HandshakeComplete})
}
