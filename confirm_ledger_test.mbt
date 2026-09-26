///|
test "confirmation ledger preserves mixed out-of-order terminal results" {
  let ledger = @amqp.ConfirmLedger::new("channel-A", capacity=3)
  let tokens = [ledger.issue(), ledger.issue(), ledger.issue()]
  let early = ledger.confirm("channel-A", 3UL, multiple=false, ack=true)
  assert_eq(early.settled[0].token, tokens[2])
  assert_eq(early.ordered, [])
  assert_eq(ledger.buffered_notices(), 1)
  assert_true(
    try {
      ignore(ledger.issue())
      false
    } catch {
      _ => true
    },
  )
  let later = ledger.confirm("channel-A", 3UL, multiple=true, ack=false)
  assert_eq(later.settled.map(x => x.token.sequence), [1UL, 2UL])
  assert_eq(later.ordered.map(x => x.outcome), [
    @amqp.Nacked,
    @amqp.Nacked,
    @amqp.Confirmed,
  ])
  assert_eq(ledger.pending_count(), 0)
  assert_eq(ledger.buffered_notices(), 0)
  assert_eq(ledger.issue().sequence, 4UL)
}

///|
test "confirmation epochs isolate reconnects and unknown from broker nack" {
  let old = @amqp.ConfirmLedger::new("old")
  let a = old.issue()
  ignore(old.issue())
  ignore(old.confirm("old", 2UL, multiple=false, ack=true))
  assert_eq(old.close().map(x => (x.token, x.outcome)), [(a, @amqp.Unknown)])
  assert_eq(old.close(), [])
  let current = @amqp.ConfirmLedger::new("new")
  assert_eq(current.issue().sequence, 1UL)
  assert_true(
    try {
      ignore(current.confirm("old", 1UL, multiple=false, ack=true))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(current.pending_count(), 1)
  assert_eq(
    current.confirm("new", 1UL, multiple=false, ack=false).settled[0].outcome,
    @amqp.Nacked,
  )
  assert_true(
    try {
      ignore(old.issue())
      false
    } catch {
      _ => true
    },
  )
}

///|
test "confirmation range and zero policy reject invalid tags without mutation" {
  let ledger = @amqp.ConfirmLedger::new("strict")
  ignore(ledger.issue())
  for tag in [0UL, 2UL, 18446744073709551615UL] {
    assert_true(
      try {
        ignore(ledger.confirm("strict", tag, multiple=true, ack=true))
        false
      } catch {
        _ => true
      },
    )
  }
  assert_eq(ledger.pending_count(), 1)
  ignore(ledger.confirm("strict", 1UL, multiple=false, ack=true))
  assert_true(
    try {
      ignore(ledger.confirm("strict", 1UL, multiple=false, ack=true))
      false
    } catch {
      _ => true
    },
  )
  assert_eq(ledger.confirm("strict", 1UL, multiple=true, ack=true).settled, [])
  let compatible = @amqp.ConfirmLedger::new(
    "compatible",
    zero_multiple_all=true,
  )
  ignore(compatible.issue())
  ignore(compatible.issue())
  assert_eq(
    compatible.confirm("compatible", 0UL, multiple=true, ack=true).settled.length(),
    2,
  )
}
