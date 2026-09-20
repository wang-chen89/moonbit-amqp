// Matched-workload timing adapter. Protocol behavior is unmodified pinned upstream.
package main

import (
 "bytes"
 "crypto/tls"
 "crypto/x509"
 "encoding/json"
 "fmt"
 "os"
 "runtime"
 "strconv"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)

type Request struct { URI, Certificate, Receive string; Bytes, Window, Count, Warmup int }
type Sample struct { PublishMS, ReceiveMS float64; BatchMS []float64; Count, Verified int }
func check(err error) { if err != nil { panic(err) } }
func ms(t time.Time) float64 { return float64(time.Since(t))/float64(time.Millisecond) }
func main() {
 var r Request; check(json.NewDecoder(os.Stdin).Decode(&r))
 if r.Bytes < 1 || r.Bytes > 1048576 || r.Window < 1 || r.Window > 128 || r.Count < 1 || r.Count > 8192 || r.Warmup < 1 || r.Warmup > 8192 { panic("invalid workload") }
 cfg := amqp.Config{Heartbeat: 0, FrameSize: 131072, ChannelMax: 64}
 if r.Certificate != "" { roots := x509.NewCertPool(); if !roots.AppendCertsFromPEM([]byte(r.Certificate)) { panic("invalid certificate") }; cfg.TLSClientConfig = &tls.Config{RootCAs:roots, ServerName:"localhost", MinVersion:tls.VersionTLS12} }
 c, err := amqp.DialConfig(r.URI,cfg); check(err); defer c.Close()
 ch, err := c.Channel(); check(err)
 q, err := ch.QueueDeclare("",false,false,true,false,amqp.Table{"x-queue-type":"classic"}); check(err)
 check(ch.Confirm(false))
 payload := make([]byte,r.Bytes); for i := range payload { payload[i] = byte((i*31+17)%256) }
 sample := func(count int) Sample {
  out := Sample{Count:count,BatchMS:[]float64{}}
  start := time.Now()
  for offset := 0; offset < count; offset += r.Window {
   begin := time.Now(); confirmations := []*amqp.DeferredConfirmation{}
   for i := offset; i < count && i < offset+r.Window; i++ { d,e := ch.PublishWithDeferredConfirm("",q.Name,false,false,amqp.Publishing{MessageId:strconv.Itoa(i), Body:payload}); check(e); if d == nil { panic("confirm mode missing") }; confirmations = append(confirmations,d) }
   for _,d := range confirmations { if !d.Wait() { panic("publish nack") } }
   out.BatchMS = append(out.BatchMS,ms(begin))
  }
  out.PublishMS = ms(start)
  verify := func(m amqp.Delivery) { if !bytes.Equal(m.Body,payload) || m.MessageId != strconv.Itoa(out.Verified) { panic(fmt.Sprintf("message mismatch at %d",out.Verified)) }; out.Verified++ }
  start = time.Now()
  if r.Receive == "get" { for i:=0;i<count;i++ { m,ok,e:=ch.Get(q.Name,true); check(e); if !ok { panic("missing message") }; verify(m) } } else if r.Receive == "consume" {
   deliveries,e:=ch.Consume(q.Name,"timing",true,false,false,false,nil); check(e)
   for out.Verified<count { m,ok:=<-deliveries; if !ok { panic("consumer closed") }; verify(m) }
   out.ReceiveMS = ms(start); check(ch.Cancel("timing",false))
  } else { panic("invalid receive mode") }
  if r.Receive == "get" { out.ReceiveMS=ms(start) }
  _,ok,e:=ch.Get(q.Name,true); check(e); if ok { panic("extra message") }
  return out
 }
 warmup:=sample(r.Warmup); measured:=sample(r.Count)
 check(c.Close())
 check(json.NewEncoder(os.Stdout).Encode(map[string]any{"runtime":runtime.Version(),"limits":map[string]int{"frameMax":c.Config.FrameSize,"channelMax":int(c.Config.ChannelMax),"heartbeat":int(c.Config.Heartbeat/time.Second)},"warmup":warmup,"measured":measured}))
}
