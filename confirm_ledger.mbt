///|
/// Publisher confirms are channel-local, not consumer acknowledgements. An
/// epoch must identify one physical channel lifetime, never just its reusable id.
pub struct PublishToken {
  epoch : String
  sequence : UInt64
} derive(Debug, Eq)

///|
pub(all) enum PublishOutcome {
  Confirmed
  Nacked
  Unknown
} derive(Debug, Eq)

///|
pub struct PublishDecision {
  token : PublishToken
  outcome : PublishOutcome
} derive(Debug, Eq)

///|
pub struct ConfirmUpdate {
  settled : Array[PublishDecision]
  ordered : Array[PublishDecision]
} derive(Debug, Eq)

///|
/// Pure bookkeeping after confirm.select activation. The transport owns mode
/// negotiation, queueing and the exact point a validated publish enters output.
/// Registered but unconfirmed publishes become Unknown on close, never Nacked.
pub struct ConfirmLedger {
  priv epoch : String
  priv capacity : Int
  priv zero_multiple_all : Bool
  priv slots : Map[UInt64, PublishOutcome?]
  priv mut next : UInt64
  priv mut notice : UInt64
  priv mut exhausted : Bool
  priv mut closed : Bool
  priv mut buffered : Int
}

///|
pub fn ConfirmLedger::new(
  epoch : String,
  capacity? : Int = 1024,
  zero_multiple_all? : Bool = false,
) -> ConfirmLedger raise FrameError {
  if epoch.is_empty() ||
    epoch.length() > 128 ||
    capacity < 1 ||
    capacity > 65536 {
    raise Invalid("confirmation epoch/capacity")
  }
  {
    epoch,
    capacity,
    zero_multiple_all,
    slots: Map([]),
    next: 1UL,
    notice: 1UL,
    exhausted: false,
    closed: false,
    buffered: 0,
  }
}

///|
pub fn ConfirmLedger::next_sequence(self : ConfirmLedger) -> UInt64? {
  if self.closed || self.exhausted {
    None
  } else {
    Some(self.next)
  }
}

///|
pub fn ConfirmLedger::buffered_notices(self : ConfirmLedger) -> Int {
  self.buffered
}

///|
pub fn ConfirmLedger::pending_count(self : ConfirmLedger) -> Int {
  self.slots.length() - self.buffered
}

///|
/// Register once, only after local validation and immediately before output.
/// Capacity includes settled entries blocked behind earlier missing confirms.
pub fn ConfirmLedger::issue(
  self : ConfirmLedger,
) -> PublishToken raise FrameError {
  if self.closed || self.exhausted {
    raise Invalid("confirmation ledger closed/exhausted")
  }
  if self.slots.length() >= self.capacity {
    raise Invalid("confirmation publish limit")
  }
  let sequence = self.next
  self.slots[sequence] = None
  if self.next == 18446744073709551615UL {
    self.exhausted = true
  } else {
    self.next += 1UL
  }
  { epoch: self.epoch, sequence, }
}

///|
/// Range confirmations settle ONLY unresolved slots. A later cumulative nack
/// must not overwrite an earlier individual ack waiting for ordered delivery.
/// Zero-tag multiple is an explicit compatibility policy, defaulting to reject;
/// it is not inferred from the consumer-ack direction of the protocol.
pub fn ConfirmLedger::confirm(
  self : ConfirmLedger,
  epoch : String,
  tag : UInt64,
  multiple~ : Bool,
  ack~ : Bool,
) -> ConfirmUpdate raise FrameError {
  if self.closed || epoch != self.epoch {
    raise Invalid("stale/closed confirmation epoch")
  }
  let last = if tag == 0UL && multiple && self.zero_multiple_all {
    if self.exhausted {
      18446744073709551615UL
    } else {
      self.next - 1UL
    }
  } else {
    if tag == 0UL || (!self.exhausted && tag >= self.next) {
      raise Invalid("invalid publisher confirmation tag")
    }
    tag
  }
  if !multiple && self.slots.get(last) != Some(None) {
    raise Invalid("duplicate/unknown publisher confirmation")
  }
  let sequences : Array[UInt64] = self.slots.keys().collect()
  sequences.sort()
  let settled = []
  for sequence in sequences {
    if (sequence == last || (multiple && sequence <= last)) &&
      self.slots.get(sequence) == Some(None) {
      let outcome = if ack { Confirmed } else { Nacked }
      self.slots[sequence] = Some(outcome)
      self.buffered += 1
      settled.push({ token: { epoch, sequence, }, outcome, })
    }
  }
  let ordered = []
  while self.slots.get(self.notice) is Some(Some(outcome)) {
    ordered.push({ token: { epoch, sequence: self.notice, }, outcome, })
    self.slots.remove(self.notice)
    self.buffered -= 1
    if self.notice == 18446744073709551615UL {
      break
    }
    self.notice += 1UL
  }
  { settled, ordered, }
}

///|
/// Idempotent epoch termination. Previously confirmed/nacked handles stay
/// terminal; only pending publishes become Unknown. Do not replay them here.
/// No ordered ack/nack notices are fabricated to fill a disconnect gap.
pub fn ConfirmLedger::close(self : ConfirmLedger) -> Array[PublishDecision] {
  let sequences : Array[UInt64] = self.slots.keys().collect()
  sequences.sort()
  let unknown = []
  for sequence in sequences {
    if self.slots.get(sequence) == Some(None) {
      unknown.push({
        token: { epoch: self.epoch, sequence, },
        outcome: Unknown,
      })
    }
  }
  self.slots.clear()
  self.buffered = 0
  self.closed = true
  unknown
}
