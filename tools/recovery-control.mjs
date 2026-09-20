// One shared settlement per lifecycle, without allocating one listener per waiter.
export class RecoveryCancellation {
  #cancelled=false; #promise; #resolve;
  wait() { return this.#promise??=this.#cancelled?Promise.resolve():new Promise(resolve=>{this.#resolve=resolve;}); }
  cancel() { this.#cancelled=true;this.#resolve?.();this.#resolve=undefined; }
  reset() { this.#cancelled=false;this.#promise=undefined;this.#resolve=undefined; }
}
export const recoveryClosed = () => Object.assign(Error('Recovery disabled or explicitly closed'),{code:'AMQP_RECOVERY_CLOSED'});
