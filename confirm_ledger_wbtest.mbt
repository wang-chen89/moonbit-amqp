///|
test "confirmation uint64 final sequence never wraps to zero" {
  let ledger = ConfirmLedger::new("last")
  ledger.next = 18446744073709551615UL
  ledger.notice = 18446744073709551615UL
  let token = ledger.issue()
  assert_eq(token.sequence, 18446744073709551615UL)
  assert_eq(ledger.next_sequence(), None)
  assert_true(
    try {
      ignore(ledger.issue())
      false
    } catch {
      _ => true
    },
  )
  let result = ledger.confirm("last", token.sequence, multiple=false, ack=true)
  assert_eq(result.ordered.length(), 1)
  assert_eq(ledger.pending_count(), 0)
  assert_eq(ledger.close(), [])
}
