// Native reference adapter; protocol and recovery are supplied by unchanged upstream files.
package main

import (
	"context"
	"encoding/json"
	"fmt"
	amqp "github.com/rabbitmq/amqp091-go"
	"os"
	"time"
)

type Request struct {
	Port         int
	Prefix, Mode string
}

func check(e error) {
	if e != nil {
		panic(e)
	}
}
func next(messages <-chan amqp.Delivery) amqp.Delivery {
	select {
	case m, ok := <-messages:
		if !ok {
			panic("consumer closed")
		}
		return m
	case <-time.After(8 * time.Second):
		panic("delivery timeout")
	}
}
func drain(messages <-chan amqp.Delivery) {
	deadline := time.After(8 * time.Second)
	for {
		select {
		case _, ok := <-messages:
			if !ok {
				return
			}
		case <-deadline:
			panic("consumer close timeout")
		}
	}
}
func main() {
	input := json.NewDecoder(os.Stdin)
	var r Request
	check(input.Decode(&r))
	emit := json.NewEncoder(os.Stdout)
	cfg := amqp.Config{Heartbeat: 2 * time.Second}
	recovering := r.Mode == "cancel-before-recovery" || r.Mode == "recovery-after" || r.Mode == "offline-cancel"
	if recovering {
		cfg.Recovery = &amqp.Recovery{ReconnectionConfig: &amqp.ReconnectionConfig{MaxRetryCount: 8, RetryInterval: 40 * time.Millisecond}}
	}
	c, e := amqp.DialConfig(fmt.Sprintf("amqp://demo:test-only@127.0.0.1:%d/", r.Port), cfg)
	check(e)
	defer c.Close()
	ch, e := c.Channel()
	check(e)
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()
	out := map[string]any{}
	q := r.Prefix + "q"
	consume := func(channel *amqp.Channel, queue, tag string, ctx context.Context, noWait bool) <-chan amqp.Delivery {
		messages, e := channel.ConsumeWithContext(ctx, queue, tag, false, false, false, noWait, nil)
		check(e)
		return messages
	}
	publish := func(body string) { check(ch.Publish("", q, false, false, amqp.Publishing{Body: []byte(body)})) }
	get := func() amqp.Delivery {
		m, ok, e := ch.Get(q, true)
		check(e)
		if !ok {
			panic("queue empty")
		}
		return m
	}
	inspect := func() int { state, e := ch.QueueInspect(q); check(e); return state.Consumers }
	if r.Mode == "wire" || r.Mode == "wire-nowait" || r.Mode == "wire-busy" {
		messages := consume(ch, "q", "consumer", ctx, r.Mode == "wire-nowait")
		if r.Mode == "wire-busy" {
			done := make(chan error, 1)
			go func() { done <- ch.Qos(1, 0, false) }()
			var command struct{ Cancel bool }
			check(input.Decode(&command))
			if !command.Cancel {
				panic("expected cancellation command")
			}
			cancel()
			check(emit.Encode(map[string]any{"stage": "cancelled"}))
			// The peer observes cancel while qos-ok remains withheld. Stop this
			// deliberately incomplete probe without claiming an RPC outcome.
			var finish struct{ Finish bool }
			check(input.Decode(&finish))
			if !finish.Finish {
				panic("expected probe completion")
			}
			check(emit.Encode(map[string]any{"cancelBeforeQosReply": true, "probeOnly": true}))
			os.Exit(0)
		} else {
			cancel()
		}
		drain(messages)
		check(ch.Qos(0, 0, false))
		out["cancelled"] = true
		out["connectionOpen"] = !c.IsClosed()
	} else {
		_, e = ch.QueueDeclare(q, false, r.Mode == "auto-delete", true, false, nil)
		check(e)
		if r.Mode == "pre-aborted" {
			cancel()
			_, e = ch.ConsumeWithContext(ctx, q, "consumer", false, false, false, false, nil)
			out["rejected"] = e == context.Canceled
			out["consumers"] = inspect()
			out["connectionOpen"] = !c.IsClosed()
		} else if r.Mode == "shared" {
			first := consume(ch, q, "first", ctx, false)
			second := consume(ch, q, "second", ctx, false)
			cancel()
			drain(first)
			drain(second)
			out["consumers"] = inspect()
			out["connectionOpen"] = !c.IsClosed()
		} else if r.Mode == "siblings" {
			sibling, e := c.Channel()
			check(e)
			other := r.Prefix + "other"
			_, e = sibling.QueueDeclare(other, false, false, true, false, nil)
			check(e)
			first := consume(ch, q, "consumer", ctx, false)
			second := consume(sibling, other, "consumer", context.Background(), false)
			cancel()
			drain(first)
			check(ch.Publish("", other, false, false, amqp.Publishing{Body: []byte("sibling")}))
			m := next(second)
			check(m.Ack(false))
			out["body"] = string(m.Body)
			out["consumers"] = inspect()
			state, e := sibling.QueueInspect(other)
			check(e)
			out["siblingConsumers"] = state.Consumers
		} else {
			check(ch.Qos(1, 0, false))
			messages := consume(ch, q, "consumer", ctx, r.Mode == "no-wait")
			if r.Mode == "manual-reuse" {
				check(ch.Cancel("consumer", false))
				drain(messages)
				messages = consume(ch, q, "consumer", context.Background(), false)
				cancel()
				drain(messages)
				out["consumers"] = inspect()
				out["newClosed"] = true
			} else if r.Mode == "unacked" {
				publish("before")
				next(messages)
				cancel()
				drain(messages)
				_, ok, e := ch.Get(q, true)
				check(e)
				out["emptyBeforeChannelClose"] = !ok
				check(ch.Close())
				ch, e = c.Channel()
				check(e)
				m := get()
				out["after"] = string(m.Body)
				out["redelivered"] = m.Redelivered
			} else if r.Mode == "auto-delete" {
				cancel()
				drain(messages)
				probe, e := c.Channel()
				check(e)
				_, e = probe.QueueInspect(q)
				if failure, ok := e.(*amqp.Error); ok {
					out["queueCode"] = failure.Code
				} else {
					panic("expected missing queue")
				}
				out["connectionOpen"] = !c.IsClosed()
			} else if recovering {
				if r.Mode == "cancel-before-recovery" {
					cancel()
					drain(messages)
				}
				states := make(chan *amqp.StateChanged, 16)
				c.NotifyStateChange(states)
				check(ch.Qos(1, 0, false))
				check(emit.Encode(map[string]any{"stage": "ready"}))
				seen := false
				deadline := time.After(12 * time.Second)
			wait:
				for {
					select {
					case state := <-states:
						if state.To == amqp.StateReconnecting && !seen {
							seen = true
							if r.Mode == "offline-cancel" {
								cancel()
								// The proxy remains blocked while the context watcher runs.
								time.Sleep(50 * time.Millisecond)
								check(emit.Encode(map[string]any{"stage": "offline-cancelled"}))
							}
						}
						if seen && state.To == amqp.StateOpen {
							break wait
						}
						if state.To == amqp.StateClosed {
							panic(state.Err)
						}
					case <-deadline:
						panic("recovery timeout")
					}
				}
				if r.Mode == "recovery-after" {
					cancel()
					drain(messages)
				}
				out["consumers"] = inspect()
				publish("after-cancel")
				if r.Mode == "cancel-before-recovery" {
					out["after"] = string(get().Body)
					out["connectionOpen"] = !c.IsClosed()
				} else if r.Mode == "recovery-after" {
					out["body"] = string(get().Body)
					out["delivered"] = false
				} else {
					m := next(messages)
					check(m.Ack(false))
					out["body"] = string(m.Body)
					out["delivered"] = true
				}
			} else {
				publish("before")
				m := next(messages)
				check(m.Ack(false))
				out["before"] = string(m.Body)
				cancel()
				drain(messages)
				out["consumers"] = inspect()
				publish("after")
				out["after"] = string(get().Body)
				out["connectionOpen"] = !c.IsClosed()
			}
		}
	}
	if !c.IsClosed() {
		check(c.Close())
	}
	check(emit.Encode(out))
}
