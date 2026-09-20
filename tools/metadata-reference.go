// Independent adapter around the pinned, unmodified upstream implementation.
package main

import (
 "crypto/tls"
 "crypto/x509"
 "encoding/hex"
 "encoding/json"
 "math"
 "net"
 "os"
 "strconv"
 "time"
 "unicode/utf8"
 amqp "github.com/rabbitmq/amqp091-go"
)

type Request struct {URI,Mode,CAFile,CertFile,KeyFile,ServerName,Locale,Vhost string; TLS12,Insecure bool}
func check(e error){if e!=nil{panic(e)}}
func sample() amqp.Table {return amqp.Table{
 "product":"shared client","connection_name":"metadata-test",
 "nested":amqp.Table{"flags":[]any{true,nil,"文"},"amount":amqp.Decimal{Scale:2,Value:314}},
 "counter":int64(9223372036854775807),"timestamp":time.Unix(1700000000,0),"bytes":[]byte{0,255,1},"opaque":string([]byte{255,0}),"float":float32(1.5),"double":float64(1),
}}
func normalized(value any) any {switch v:=value.(type){
 case amqp.Table:out:=map[string]any{};for key,item:=range v{out[key]=normalized(item)};return out
 case []any:out:=[]any{};for _,item:=range v{out=append(out,normalized(item))};return out
 case []byte:return map[string]any{"$type":"bytes","hex":hex.EncodeToString(v)}
 case string:if utf8.ValidString(v){return v};return map[string]any{"$type":"longstr","hex":hex.EncodeToString([]byte(v))}
 case int64:return map[string]any{"$type":"int64","value":strconv.FormatInt(v,10)}
 case float32:return map[string]any{"$type":"float32-bits","value":math.Float32bits(v)}
 case float64:return map[string]any{"$type":"float64-bits","value":strconv.FormatUint(math.Float64bits(v),10)}
 case time.Time:return map[string]any{"$type":"timestamp","value":strconv.FormatInt(v.Unix(),10)}
 case amqp.Decimal:return map[string]any{"$type":"decimal","scale":v.Scale,"value":v.Value}
 default:return v
}}
func address(addr net.Addr) any {host,port,e:=net.SplitHostPort(addr.String());check(e);n,e:=strconv.Atoi(port);check(e);family:="IPv6";if net.ParseIP(host).To4()!=nil{family="IPv4"};return map[string]any{"address":host,"port":n,"family":family}}
func main(){
 var r Request;check(json.NewDecoder(os.Stdin).Decode(&r));out:=json.NewEncoder(os.Stdout)
 if r.Mode=="defaults"{check(out.Encode(normalized(amqp.NewConnectionProperties())));return}
 cfg:=amqp.Config{FrameSize:131072,ChannelMax:64,Heartbeat:time.Second,Locale:r.Locale,Vhost:r.Vhost}
 switch r.Mode {case "custom","mutate","caps":cfg.Properties=sample();case "only-caps":cfg.Properties=amqp.Table{"capabilities":"invalid"};case "empty":cfg.Properties=amqp.Table{}}
 if r.Mode=="caps"{cfg.Properties["capabilities"]=amqp.Table{"publisher_confirms":false,"unknown":true}}
 if r.CAFile!=""||r.Insecure {
  t:=&tls.Config{MinVersion:tls.VersionTLS12,ServerName:r.ServerName,InsecureSkipVerify:r.Insecure}
  if r.CAFile!=""{pem,e:=os.ReadFile(r.CAFile);check(e);t.RootCAs=x509.NewCertPool();t.RootCAs.AppendCertsFromPEM(pem)}
  if r.CertFile!=""{cert,e:=tls.LoadX509KeyPair(r.CertFile,r.KeyFile);check(e);t.Certificates=[]tls.Certificate{cert}}
  if r.TLS12{t.MaxVersion=tls.VersionTLS12;t.CipherSuites=[]uint16{tls.TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256}}
  cfg.TLSClientConfig=t
 }
 c,e:=amqp.DialConfig(r.URI,cfg);check(e);defer c.Close()
 state:=c.ConnectionState();protocol:="";if state.Version==tls.VersionTLS12{protocol="TLSv1.2"};if state.Version==tls.VersionTLS13{protocol="TLSv1.3"}
 leaf:="";if len(state.PeerCertificates)>0{leaf=hex.EncodeToString(state.PeerCertificates[0].Raw)}
 row:=map[string]any{"serverProperties":normalized(c.Properties),"serverLocales":c.Locales,"serverVersion":map[string]any{"major":c.Major,"minor":c.Minor},"localAddress":address(c.LocalAddr()),"remoteAddress":address(c.RemoteAddr()),
  "vhost":c.Config.Vhost,"locale":c.Config.Locale,"authenticationMechanism":c.Config.SASL[0].Mechanism(),"limits":map[string]any{"channelMax":c.Config.ChannelMax,"frameMax":c.Config.FrameSize,"heartbeat":int(c.Config.Heartbeat/time.Second)},
  "tls":map[string]any{"handshakeComplete":state.HandshakeComplete,"protocol":protocol,"serverName":state.ServerName,"cipher":tls.CipherSuiteName(state.CipherSuite),"verified":len(state.VerifiedChains)>0,"peerDER":leaf,"resumed":state.DidResume}}
 if cfg.Properties!=nil{row["callerPropertiesAfterConnect"]=normalized(cfg.Properties)}
 if r.Mode=="mutate"{cfg.Properties["nested"].(amqp.Table)["changed"]="caller mutation";row["configPropertiesAfterMutation"]=normalized(c.Config.Properties)}
 check(out.Encode(row))
}
