// Independent receiver and buffered publisher using the unmodified pinned Go client.
package main
import("crypto/sha256";"crypto/tls";"crypto/x509";"encoding/hex";"encoding/json";"fmt";"os";"time";amqp "github.com/rabbitmq/amqp091-go")
type Request struct{Port,Size int;Queue,Mode,Certificate string;TLS bool}
func check(e error){if e!=nil{panic(e)}}
func main(){
 var r Request;check(json.NewDecoder(os.Stdin).Decode(&r));scheme:="amqp";cfg:=amqp.Config{Heartbeat:2*time.Second,FrameSize:4096}
 if r.TLS{scheme="amqps";pool:=x509.NewCertPool();if !pool.AppendCertsFromPEM([]byte(r.Certificate)){panic("invalid certificate")};cfg.TLSClientConfig=&tls.Config{RootCAs:pool,ServerName:"localhost",MinVersion:tls.VersionTLS12}}
 c,e:=amqp.DialConfig(fmt.Sprintf("%s://demo:test-only@127.0.0.1:%d/",scheme,r.Port),cfg);check(e);defer c.Close();ch,e:=c.Channel();check(e)
 if r.Mode=="publish"{
  body:=make([]byte,r.Size);for i:=range body{body[i]=byte(i%251)};check(ch.Confirm(false));done:=ch.NotifyPublish(make(chan amqp.Confirmation,1))
  check(ch.Publish("",r.Queue,false,false,amqp.Publishing{Body:body,ContentType:"application/octet-stream",MessageId:"large-message",CorrelationId:"stream-check",DeliveryMode:2,Headers:amqp.Table{"label":"中文","n":int32(42)}}));select{case v:=<-done:if !v.Ack{panic("nack")};case <-time.After(20*time.Second):panic("confirm timeout")}
 }
 d,ok,e:=ch.Get(r.Queue,true);check(e);out:=map[string]any{"found":ok}
 if ok{sum:=sha256.Sum256(d.Body);out["bytes"]=len(d.Body);out["sha256"]=hex.EncodeToString(sum[:]);out["contentType"]=d.ContentType;out["messageId"]=d.MessageId;out["correlationId"]=d.CorrelationId;out["deliveryMode"]=d.DeliveryMode;out["headers"]=d.Headers}
 check(json.NewEncoder(os.Stdout).Encode(out));check(c.Close())
}
