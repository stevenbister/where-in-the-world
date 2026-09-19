import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { parseArgs } from "node:util";

/**
 * Script to run drizzle-kit against local D1 sqlite file.
 */

// Any drizzle-kit command e.g. "studio" or "migrate"
const [, , subcommand] = process.argv;
if (!subcommand) {
  console.error("Usage: node scripts/run-drizzle.js <drizzle-kit-subcommand>");
  process.exit(1);
}

const { values } = parseArgs({
  args: ["--remote"],
  options: {
    remote: { type: "boolean", default: false },
  },
});

let child;

if (values.remote) {
  console.log("Running remote command...");
  child = spawn(`drizzle-kit ${subcommand}`, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, NODE_ENV: "production" },
  });

  child.on("exit", (code) => process.exit(code));
} else {
  const dbDir = ".wrangler/state/v3/d1/miniflare-D1DatabaseObject";
  const files = readdirSync(dbDir)
    .filter((f) => f.endsWith(".sqlite"))
    .map((f) => ({
      path: join(dbDir, f),
      mtime: statSync(join(dbDir, f)).mtimeMs,
    }))
    .sort((a, b) => b.mtime - a.mtime);

  if (!files.length) {
    console.error("No .sqlite file found in", dbDir);
    process.exit(1);
  }

  child = spawn(`drizzle-kit ${subcommand}`, {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, LOCAL_D1_DB: files[0].path },
  });

  child.on("exit", (code) => process.exit(code));
}
