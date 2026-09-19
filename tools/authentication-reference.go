// Test-only adapter. The pinned amqp091-go source is unmodified.
package main

import (
 "bufio"
 "encoding/hex"
 "encoding/json"
 "fmt"
 "os"
 "time"
 amqp "github.com/rabbitmq/amqp091-go"
)
type Candidate struct { Mechanism string; Username string; Password string; ResponseHex string }
type Request struct { Operation string; Port int; Candidates []Candidate; Locale string }
type Custom struct { name string; response string }
func (a *Custom) Mechanism() string { return a.name }
func (a *Custom) Response() string { return a.response }
func run(r Request) (any,error) {
 auths:=[]amqp.Authentication{}
 for _,candidate:=range r.Candidates {
  switch candidate.Mechanism {
  case "PLAIN":auths=append(auths,&amqp.PlainAuth{Username:candidate.Username,Password:candidate.Password})
  case "AMQPLAIN":auths=append(auths,&amqp.AMQPlainAuth{Username:candidate.Username,Password:candidate.Password})
  case "EXTERNAL":auths=append(auths,&amqp.ExternalAuth{})
  default:
   bytes,err:=hex.DecodeString(candidate.ResponseHex);if err!=nil{return nil,err}
   auths=append(auths,&Custom{candidate.Mechanism,string(bytes)})
  }
 }
 if r.Operation=="response" {
  values:=[]map[string]string{}
  for _,auth:=range auths {values=append(values,map[string]string{"mechanism":auth.Mechanism(),"responseHex":hex.EncodeToString([]byte(auth.Response()))})}
  return values,nil
 }
 c,err:=amqp.DialConfig(fmt.Sprintf("amqp://127.0.0.1:%d/",r.Port),amqp.Config{SASL:auths,Locale:r.Locale,Heartbeat:time.Second,ChannelMax:8,FrameSize:8192})
 if err!=nil{return nil,err};defer c.Close()
 mechanism:=c.Config.SASL[0].Mechanism();if err=c.Close();err!=nil{return nil,err}
 return map[string]string{"mechanism":mechanism},nil
}
func main() {
 scanner:=bufio.NewScanner(os.Stdin);scanner.Buffer(make([]byte,65536),4194304)
 encoder:=json.NewEncoder(os.Stdout)
 for scanner.Scan() {
  var request Request
  if err:=json.Unmarshal(scanner.Bytes(),&request);err!=nil {panic(err)}
  value,err:=run(request)
  if err!=nil {encoder.Encode(map[string]any{"ok":false,"error":err.Error()})} else {encoder.Encode(map[string]any{"ok":true,"value":value})}
 }
 if err:=scanner.Err();err!=nil {panic(err)}
}
