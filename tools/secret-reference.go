// Test-only adapter for the unmodified, pinned amqp091-go implementation.
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
type Request struct { Port int; Mode string; InitialSecret string; NewSecret string; SecretHex string; Reason string }
type Result struct { Connected bool `json:"connected"`; Updated bool `json:"updated"`; OperationSucceeded bool `json:"operationSucceeded"`; Code int `json:"code"` }
func code(err error) int {if value,ok:=err.(*amqp.Error);ok{return value.Code};return 0}
func run(request Request) Result {
 result:=Result{}
 c,err:=amqp.DialConfig(fmt.Sprintf("amqp://127.0.0.1:%d/",request.Port),amqp.Config{SASL:[]amqp.Authentication{&amqp.PlainAuth{Username:"ignored",Password:request.InitialSecret}},Heartbeat:time.Second,FrameSize:8192})
 if err!=nil {result.Code=code(err);return result};defer c.Close();result.Connected=true
 secret:=request.NewSecret
 if request.Mode=="wire" {b,e:=hex.DecodeString(request.SecretHex);if e!=nil{panic(e)};secret=string(b)}
 if err=c.UpdateSecret(secret,request.Reason);err!=nil{result.Code=code(err);return result};result.Updated=true
 if request.Mode=="wire" {return result}
 ch,err:=c.Channel();if err!=nil{result.Code=code(err);return result};defer ch.Close()
 q,err:=ch.QueueDeclare("",false,false,true,false,nil);if err!=nil{result.Code=code(err);return result}
 if err=ch.Confirm(false);err!=nil{panic(err)}
 confirms:=ch.NotifyPublish(make(chan amqp.Confirmation,1))
 if err=ch.Publish("",q.Name,false,false,amqp.Publishing{Body:[]byte("after-update")});err!=nil{panic(err)}
 select {case confirmation:=<-confirms:if !confirmation.Ack{panic("negative confirmation")};case <-time.After(4*time.Second):panic("confirmation timeout")}
 message,ok,err:=ch.Get(q.Name,true);if err!=nil||!ok||string(message.Body)!="after-update"{panic("message mismatch")}
 result.OperationSucceeded=true
 return result
}
func main() {
 scanner:=bufio.NewScanner(os.Stdin);scanner.Buffer(make([]byte,65536),4194304);encoder:=json.NewEncoder(os.Stdout)
 for scanner.Scan(){var request Request;if err:=json.Unmarshal(scanner.Bytes(),&request);err!=nil{panic(err)};if err:=encoder.Encode(run(request));err!=nil{panic(err)}}
 if err:=scanner.Err();err!=nil{panic(err)}
}
