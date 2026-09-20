// Test adapter only; the pinned upstream AMQP implementation remains unchanged.
package main

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	amqp "github.com/rabbitmq/amqp091-go"
	"os"
	"sort"
	"strings"
	"time"
)

type Request struct {
	Port         int
	Mode, Prefix string
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
// Channel StateOpen can precede the separate topology pass. Wait for the
// default strategy itself before issuing application RPCs in this adapter.
type completedTopology struct { done chan error }
func (t *completedTopology) RecoverTopology(c *amqp.Connection, channels []*amqp.Channel) ([]amqp.TopologyRecoveryEntity, error) {
 skipped, err := (&amqp.DefaultTopologyRecovery{}).RecoverTopology(c, channels)
 t.done <- err
 return skipped, err
}
func main() {
	var r Request
	check(json.NewDecoder(os.Stdin).Decode(&r))
	emit := json.NewEncoder(os.Stdout)
	cfg := amqp.Config{Heartbeat: 2 * time.Second}
	recovering := r.Mode == "recovery" || r.Mode == "channel-recovery"
	if recovering {
		cfg.Recovery = &amqp.Recovery{ReconnectionConfig: &amqp.ReconnectionConfig{MaxRetryCount: 8, RetryInterval: 40 * time.Millisecond}}
	}

	var topologyDone chan error
	if r.Mode == "channel-recovery" {
		topologyDone = make(chan error, 8)
		cfg.Recovery.TopologyRecovery = &completedTopology{done: topologyDone}
	}
	c, e := amqp.DialConfig(fmt.Sprintf("amqp://demo:test-only@127.0.0.1:%d/", r.Port), cfg)
	check(e)
	defer c.Close()
	ch, e := c.Channel()
	check(e)
	events := ch.NotifyPublish(make(chan amqp.Confirmation, 16))
	yes, no := ch.NotifyConfirm(make(chan uint64, 16), make(chan uint64, 16))
	confirm := func() { check(ch.Confirm(false)) }
	publish := func(key string, body []byte, mandatory bool) *amqp.DeferredConfirmation {
		h, e := ch.PublishWithDeferredConfirm("", key, mandatory, false, amqp.Publishing{Body: body})
		check(e)
		return h
	}
	notices := func(count int) []map[string]any {
		rows := []map[string]any{}
		for i := 0; i < count; i++ {
			select {
			case v := <-events:
				rows = append(rows, map[string]any{"tag": v.DeliveryTag, "ack": v.Ack})
			case <-time.After(5 * time.Second):
				panic("confirmation notice timeout")
			}
		}
		return rows
	}
	split := func(rows []map[string]any) map[string]any {
		a, n := []uint64{}, []uint64{}
		for _, row := range rows {
			var tag uint64
			select {
			case tag = <-func() <-chan uint64 {
				if row["ack"].(bool) {
					return yes
				}
				return no
			}():
			case <-time.After(5 * time.Second):
				panic("split confirmation timeout")
			}
			if row["ack"].(bool) {
				a = append(a, tag)
			} else {
				n = append(n, tag)
			}
		}
		return map[string]any{"acks": a, "nacks": n}
	}
	completed := func(h *amqp.DeferredConfirmation) bool {
		select {
		case <-h.Done():
			return true
		default:
			return false
		}
	}
	out := map[string]any{}
	if strings.HasPrefix(r.Mode, "wire-") {
		if r.Mode == "wire-normal" {
			out["handleNil"] = publish("q", []byte("x"), false) == nil
			out["next"] = ch.GetNextPublishSeqNo()
		} else {
			confirm()
			count := 3
			if r.Mode == "wire-wait" || r.Mode == "wire-future" {
				count = 1
			}
			handles := []*amqp.DeferredConfirmation{}
			for i := 0; i < count; i++ {
				handles = append(handles, publish("q", []byte("x"), false))
			}
			check(emit.Encode(map[string]any{"stage": "published"}))
			if r.Mode == "wire-order" {
				if !handles[2].Wait() {
					panic("third not acked")
				}
				out["early"] = []bool{completed(handles[0]), completed(handles[1]), completed(handles[2])}
				check(emit.Encode(map[string]any{"stage": "out-of-order"}))
			}
			if r.Mode == "wire-wait" {
				ctx, cancel := context.WithCancel(context.Background())
				cancel()
				_, e = handles[0].WaitContext(ctx)
				out["cancelled"] = e == context.Canceled
				ctx, cancel = context.WithTimeout(context.Background(), 5*time.Millisecond)
				_, e = handles[0].WaitContext(ctx)
				cancel()
				out["timedOut"] = e == context.DeadlineExceeded
				out["pendingAfterWaits"] = !completed(handles[0])
				check(emit.Encode(map[string]any{"stage": "wait-done"}))
			}
			if r.Mode == "wire-zero" || r.Mode == "wire-future" {
				ctx, cancel := context.WithTimeout(context.Background(), 60*time.Millisecond)
				_, _ = handles[0].WaitContext(ctx)
				cancel()
				observed := []bool{}
				for _, h := range handles {
					observed = append(observed, h.Acked())
				}
				out["probeAcked"] = observed
				out["probeConnectionOpen"] = !c.IsClosed()
				check(emit.Encode(map[string]any{"stage": "probe-done"}))
			}
			values, tags, done := []bool{}, []uint64{}, []bool{}
			for _, h := range handles {
				values = append(values, h.Wait())
				tags = append(tags, h.DeliveryTag)
				done = append(done, completed(h))
			}
			out["acked"] = values
			out["tags"] = tags
			out["done"] = done
			out["next"] = ch.GetNextPublishSeqNo()
			count = len(handles)
			if r.Mode == "wire-close" {
				count = 0
			}
			rows := notices(count)
			out["events"] = rows
			out["split"] = split(rows)
			out["connectionOpen"] = !c.IsClosed()
		}
	} else {
		q := r.Prefix + "q"
		_, e = ch.QueueDeclare(q, false, false, true, false, nil)
		check(e)
		get := func() amqp.Delivery {
			m, ok, e := ch.Get(q, true)
			check(e)
			if !ok {
				panic("queue empty")
			}
			return m
		}
		if r.Mode == "normal" || r.Mode == "transaction" {
			if r.Mode == "transaction" {
				check(ch.Tx())
			}
			out["handleNil"] = publish(q, []byte("x"), false) == nil
			if r.Mode == "transaction" {
				check(ch.TxCommit())
			}
			out["body"] = string(get().Body)
			out["next"] = ch.GetNextPublishSeqNo()
		} else {
			confirm()
			if r.Mode == "pre-aborted" {
				ctx, cancel := context.WithCancel(context.Background())
				cancel()
				h, e := ch.PublishWithDeferredConfirmWithContext(ctx, "", q, false, false, amqp.Publishing{Body: []byte("x")})
				out["rejected"] = e == context.Canceled
				out["handleNil"] = h == nil
				out["next"] = ch.GetNextPublishSeqNo()
				_, ok, e := ch.Get(q, true)
				check(e)
				out["empty"] = !ok
			} else if r.Mode == "mandatory" {
				returns := ch.NotifyReturn(make(chan amqp.Return, 1))
				h := publish(r.Prefix+"absent", []byte("returned"), true)
				out["acked"] = h.Wait()
				select {
				case m := <-returns:
					out["body"] = string(m.Body)
					out["code"] = m.ReplyCode
				case <-time.After(5 * time.Second):
					panic("return timeout")
				}
				out["events"] = notices(1)
			} else if r.Mode == "multi-channel" {
				other, e := c.Channel()
				check(e)
				check(other.Confirm(false))
				h := publish(q, []byte("first"), false)
				b, e := other.PublishWithDeferredConfirm("", q, false, false, amqp.Publishing{Body: []byte("second")})
				check(e)
				out["acked"] = []bool{h.Wait(), b.Wait()}
				out["tags"] = []uint64{h.DeliveryTag, b.DeliveryTag}
				out["next"] = []uint64{ch.GetNextPublishSeqNo(), other.GetNextPublishSeqNo()}
				bodies := []string{string(get().Body), string(get().Body)}
				sort.Strings(bodies)
				out["bodies"] = bodies
			} else if recovering {
				h := publish(q, []byte("before"), false)
				if !h.Wait() {
					panic("before nack")
				}
				out["before"] = string(get().Body)
				first := notices(1)
				states := make(chan *amqp.StateChanged, 16)
				if r.Mode == "recovery" {
					c.NotifyStateChange(states)
					check(emit.Encode(map[string]any{"stage": "ready"}))
				} else {
					ch.NotifyStateChange(states)
					_, e = ch.QueueInspect(r.Prefix + "absent")
					if e == nil {
						panic("expected 404")
					}
				}
				changed := false
				deadline := time.After(10 * time.Second)
			waiting:
				for {
					select {
					case s := <-states:
						if s.To == amqp.StateReconnecting {
							changed = true
						}
						if changed && s.To == amqp.StateOpen {
							break waiting
						}
						if s.To == amqp.StateClosed {
							panic("recovery closed")
						}
					case <-deadline:
						panic("recovery timeout")
					}
				}
				if topologyDone != nil {
					select {
					case err := <-topologyDone: check(err)
					case <-time.After(10 * time.Second): panic("topology completion timeout")
					}
				}
				out["nextAfterRecovery"] = ch.GetNextPublishSeqNo()
				next := publish(q, []byte("after"), false)
				out["acked"] = []bool{h.Acked(), next.Wait()}
				out["tags"] = []uint64{h.DeliveryTag, next.DeliveryTag}
				out["after"] = string(get().Body)
				out["events"] = append(first, notices(1)...)
				out["next"] = ch.GetNextPublishSeqNo()
			} else {
				body := []byte("hello")
				if r.Mode == "stream" {
					body = bytes.Repeat([]byte{0, 255, 42, 128}, 262144)
				}
				h := publish(q, body, false)
				out["acked"] = h.Wait()
				out["done"] = completed(h)
				out["tag"] = h.DeliveryTag
				out["next"] = ch.GetNextPublishSeqNo()
				message := get()
				hash := sha256.Sum256(message.Body)
				out["bytes"] = len(message.Body)
				out["sha256"] = hex.EncodeToString(hash[:])
				out["events"] = notices(1)
			}
		}
		out["connectionOpen"] = !c.IsClosed()
	}
	if !c.IsClosed() {
		check(c.Close())
	}
	check(emit.Encode(out))
}
