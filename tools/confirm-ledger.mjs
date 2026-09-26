import {randomUUID} from 'node:crypto';
import {confirm_ledger_call} from '../web/engine.mjs';

// One key per physical channel lifetime. Recovery constructs a fresh channel.
export class ConfirmLedger {
  #key=randomUUID(); #closed=false; next=1n; buffered=0;
  constructor() { this.#call('open'); }
  #call(action,tag='',multiple=false,ack=false) {
    const raw=confirm_ledger_call(this.#key,action,String(tag),multiple,ack);
    if(raw.startsWith('ERROR:'))throw Error(raw.slice(7));
    const value=JSON.parse(raw);
    // Keep the last next value readable after close, as in the existing API.
    if(action!=='close')this.next=value.next===null?null:BigInt(value.next);
    this.buffered=value.buffered;
    return value.result;
  }
  issue() { return BigInt(this.#call('issue')); }
  confirm(tag,multiple,ack) { return this.#call('confirm',tag,multiple,ack); }
  close() { if(this.#closed)return [];this.#closed=true;return this.#call('close'); }
}
