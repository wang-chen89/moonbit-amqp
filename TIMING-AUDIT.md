# Timing fixture maintenance — 2026-09-21

Only test orchestration and evidence changed; no codec, client, recovery runtime,
generated engine, workflow or module identity changed in this maintenance patch.

## Preserved teammate fixes

The stream flow case listens on **Channel**, not Connection. The recovery
fixture exports `until` (4-second deadline). Delivery count, consumer restoration,
and receipt of the peer's ack are awaited explicitly. These changes preserve the
latest remote patch set at `0409fcb6a1ee2ca5ce28be3b7b78f372b25ab871`.

## Additional static-audit repairs

- Client close acknowledgement: wait for its independently encoded peer frame.
- Recovery: wait for sent publication, reconnect handshake, recovering event,
  consumer callback and second channel-open attempt. A held channel-open reply
  replaces the race between a 25 ms sleep and an 80 ms server timer.
- Auto-delete and topology: wait for the pending consume/bind/declaration to
  reach the peer before testing its unacknowledged state.
- Connection strategy: wait for callbacks, context cancellation and all sixteen
  channel decisions; asynchronous `late` rejection cannot be accidentally skipped.
- Topology strategy: use bounded message waits; hold the restoration reply until
  the test inspects the intermediate state instead of racing two timers.
- Close deadline and secret update: observe source entry/cleanup and request
  arrival before initiating shutdown.
- URI constructor: observe outgoing handshake, then await a usable channel RPC.
  Only the known pre-ready error is retried, within a 4-second deadline.
- Broker cancellation and native transport cleanup: await callback/socket state.
  These two broker-dependent scripts received syntax checks only in this run.

Negative observation windows, intentional slow producers/readers, protocol
timeouts/heartbeats, expiry/performance intervals and existing bounded polling
were retained. This is a scoped audit, not a guarantee that every possible CI
scheduling race is eliminated.

## Verification boundary

The ten changed local TCP/URI fixture scripts passed (181 groups): stream 23,
recovery 25, client 18, auto-delete 13, connection strategy 22, topology 14,
topology strategy 25, close deadline 17, secret update 10 and URI 14.
`evidence/team-sync-validation.json` records commands and the intermediate URI
probe failure before its handshake precondition was added. Only that affected
script was repeated after correction.

No RabbitMQ/Go-native rerun, Docker restart, remote CI run or push is claimed.
Historical broker/native evidence remains historical and contains earlier source
hashes. The current tree's integrity manifest is `evidence/team-sync-20260921.json`;
its hashes bind files, not new behavioral validation of every historical report.
