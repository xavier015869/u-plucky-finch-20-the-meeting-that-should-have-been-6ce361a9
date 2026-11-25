// The Meeting That Should Have Been an Email — entry program.
//
// Writes a single one-line joke about a meeting that should have been
// an email to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The gate requires 1-200 characters of non-blank UTF-8 text, so the
// entry is validated before it is written and the program fails loudly
// instead of shipping an invalid line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "He shared his screen to read the email aloud, slowly, like a bedtime story — the email we were all already CC'd on.";

function main(): void {
  if (ENTRY.length < 1 || ENTRY.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${ENTRY.length}`);
  }
  if (!ENTRY.trim()) {
    throw new Error("entry must not be only whitespace");
  }
  if (ENTRY.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
