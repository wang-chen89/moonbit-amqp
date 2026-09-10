import fs from 'node:fs';
import {inspect_wire, schemas} from '../web/engine.mjs';

try {
  const args = process.argv.slice(2);
  if (args.length === 1 && args[0] === '--help') {
    console.log('Usage: node tools/inspect.mjs [--binary FILE | --hex HEX | --file HEXFILE] [--assemble]\nReads hex from stdin by default. --schema lists 64 method schemas. Binary limit 1 MiB; text limit 3 MiB. Exit 0 success, 2 invalid wire, 1 host/argument error.');
  } else if (args.length === 1 && args[0] === '--schema') {
    console.log(schemas());
  } else {
    let input, assemble = false;
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg === '--assemble' && !assemble) { assemble = true; continue; }
      if (!['--binary', '--hex', '--file'].includes(arg) || input !== undefined || i + 1 >= args.length) throw Error('Expected exactly one input source');
      const value = args[++i];
      if (arg === '--hex') input = value;
      else {
        const limit = arg === '--binary' ? 1048576 : 3145728;
        if (fs.statSync(value).size > limit) throw Error('Input exceeds size limit');
        const bytes = fs.readFileSync(value);
        if (bytes.length > limit) throw Error('Input exceeds size limit');
        input = arg === '--binary' ? bytes.toString('hex') : new TextDecoder('utf-8', {fatal: true}).decode(bytes);
      }
    }
    if (input === undefined) {
      const chunks = []; let size = 0;
      for await (const chunk of process.stdin) {
        size += chunk.length;
        if (size > 3145728) throw Error('Input exceeds size limit');
        chunks.push(chunk);
      }
      input = new TextDecoder('utf-8', {fatal: true}).decode(Buffer.concat(chunks));
    }
    if (Buffer.byteLength(input) > 3145728) throw Error('Input exceeds size limit');
    const result = inspect_wire(input, assemble);
    if (result.startsWith('ERROR:')) {
      console.error(result); process.exitCode = 2;
    } else console.log(result);
  }
} catch (error) { console.error(error.message); process.exitCode = 1; }
