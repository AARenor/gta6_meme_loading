// main.ts — the program half of this gta6-meme-x-01 entry.
//
// The entry is the post on X that POST.json names; the house reads that post itself. All the
// harness asks of this file is that it carry POST.json's address from the repository (mounted at
// /bot) into the writable output directory (/output), so the gate can read it there. So the run
// does two things and nothing else:
//
//   1. read POST.json from MAKEFUN_BOT_DIR (default /bot) and refuse it unless it is a JSON
//      object whose `url` is the address of a post on X;
//   2. write the very bytes it read to MAKEFUN_OUTPUT_DIR (default /output)/POST.json.
//
// The bytes are copied verbatim, not re-serialised, so the two runs of an entry write identical
// output. There is no network access, no clock reading and nothing outside Node's standard
// library here, and the exit status is 0 only when the copy was made.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// An X handle is 1 to 15 letters, digits or underscores.
const HANDLE = '[A-Za-z0-9_]{1,15}';

// The addresses the house reads as one post: /<handle>/status/<id> on x.com or twitter.com, with
// an optional www. or mobile. subdomain, or the /i/web/status/<id> form; the id is digits only.
// A query string and/or fragment may follow, and a single trailing slash may sit before them.
const POST_URL = new RegExp(
  '^https://(?:www\\.|mobile\\.)?(?:x|twitter)\\.com/' +
    '(?:' +
    HANDLE +
    '/status|i/web/status' +
    ')/[0-9]+/?(?:\\?[^#]*)?(?:#.*)?$',
);

/** Exit non-zero with a plain reason on stderr; nothing is written to the output in that case. */
function refuse(reason: string): never {
  console.error(`main.ts: ${reason}`);
  process.exit(1);
}

const postPath = join(BOT_DIR, 'POST.json');

let raw: Buffer;
try {
  raw = readFileSync(postPath);
} catch (err) {
  refuse(`cannot read ${postPath}: ${(err as Error).message}`);
}

// Validate before copying: POST.json must be a JSON object carrying a string `url` that is a
// post on X. Arrays, null, other JSON values and any other url shape are refused.
let parsed: unknown;
try {
  parsed = JSON.parse(raw.toString('utf8'));
} catch (err) {
  refuse(`${postPath} is not valid JSON: ${(err as Error).message}`);
}

if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
  refuse(`${postPath} must hold a JSON object, not ${Array.isArray(parsed) ? 'an array' : typeof parsed}`);
}

const record = parsed as Record<string, unknown>;
if (typeof record.url !== 'string') {
  refuse(`${postPath} has no string "url"`);
}
if (!POST_URL.test(record.url)) {
  refuse(`"url" is not the address of a post on X: ${JSON.stringify(record.url)}`);
}

// Copy the exact bytes read to the output directory, which may not exist yet.
const outPath = join(OUTPUT_DIR, 'POST.json');
try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(outPath, raw);
} catch (err) {
  refuse(`cannot write ${outPath}: ${(err as Error).message}`);
}

// gta6-meme-x-01: the post this entry names is the entry.
