///|
fn main raise {
  let ledger = @amqp.ConfirmLedger::new("connection-A/channel-1/lifetime-1")
  let first = ledger.issue()
  let second = ledger.issue()
  let third = ledger.issue()
  ignore(ledger.confirm(third.epoch, third.sequence, multiple=false, ack=true))
  let update = ledger.confirm(
    first.epoch,
    third.sequence,
    multiple=true,
    ack=false,
  )
  for decision in update.ordered {
    let outcome = match decision.outcome {
      Confirmed => "confirmed"
      Nacked => "nacked"
      Unknown => "unknown"
    }
    println("\{decision.token.sequence}:\{outcome}")
  }
  ignore(second)
  let uncertain = ledger.issue()
  let lost = ledger.close()
  assert_eq(lost[0].token, uncertain)
  assert_eq(lost[0].outcome, @amqp.Unknown)
  println("\{uncertain.sequence}:unknown")
}
