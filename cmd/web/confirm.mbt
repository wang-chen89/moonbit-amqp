///|
let confirm_ledgers : Map[String, @lib.ConfirmLedger] = Map([])

///|
fn confirm_decision(value : @lib.PublishDecision) -> Json {
  let outcome = match value.outcome {
    Confirmed => "confirmed"
    Nacked => "nacked"
    Unknown => "unknown"
  }
  {
    "sequence": value.token.sequence.to_string().to_json(),
    "outcome": outcome.to_json(),
  }
}

///|
/// Internal Node bridge. Decimal strings preserve all 64 sequence bits.
pub fn confirm_ledger_call(
  key : String,
  action : String,
  tag : String,
  multiple : Bool,
  ack : Bool,
) -> String {
  try {
    if key.is_empty() || key.length() > 128 {
      raise Failure("confirmation key")
    }
    if action == "open" {
      if confirm_ledgers.contains(key) || confirm_ledgers.length() >= 4096 {
        raise Failure("confirmation bridge ledger limit/duplicate")
      }
      confirm_ledgers[key] = @lib.ConfirmLedger::new(
        key,
        zero_multiple_all=true,
      )
    }
    let ledger = confirm_ledgers
      .get(key)
      .unwrap_or_else(() => raise Failure("unknown confirmation ledger"))
    let result : Json = match action {
      "open" | "info" => Json::null()
      "issue" => ledger.issue().sequence.to_string().to_json()
      "confirm" => {
        if tag.is_empty() ||
          tag.length() > 20 ||
          !tag.iter().all(c => c >= '0' && c <= '9') {
          raise Failure("confirmation uint64")
        }
        let number : UInt64 = @json.from_json(tag.to_json())
        let update = ledger.confirm(key, number, multiple~, ack~)
        {
          "settled": update.settled.map(confirm_decision).to_json(),
          "ordered": update.ordered.map(confirm_decision).to_json(),
        }
      }
      "close" => {
        let decisions = ledger.close()
        confirm_ledgers.remove(key)
        decisions.map(confirm_decision).to_json()
      }
      _ => raise Failure("unknown confirmation action")
    }
    let next : Json = match ledger.next_sequence() {
      Some(value) => value.to_string().to_json()
      None => Json::null()
    }
    (
      {
        "result": result,
        "next": next,
        "buffered": ledger.buffered_notices().to_json(),
      } : Json).stringify()
  } catch {
    e => "ERROR: " + Repr(e).to_string()
  }
}
