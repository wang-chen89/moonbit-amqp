import fs from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';

export const digest = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');
export function sourceSnapshot(paths) {
  if(paths.includes('tools/client.mjs')||paths.includes('tools/recovery-channel.mjs'))paths=['tools/consumer-signal.mjs',...paths];
  return Object.fromEntries([...new Set(['tools/evidence-source.mjs',...paths])]
    .map(path => [path,digest(new URL('../'+path,import.meta.url))]));
}
export function assertSourceUnchanged(before) {
  assert.deepEqual(sourceSnapshot(Object.keys(before)),before,'Source changed during validation; rerun after edits finish');
}
