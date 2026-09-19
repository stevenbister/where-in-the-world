import { execSync } from "node:child_process";
import { unlink } from "node:fs";

try {
  const fileName = "d1-remote.sql";
  const options = {
    encoding: "utf8",
    stdio: "inherit",
    env: { ...process.env },
  };

  console.log("Migrating data...");
  execSync(`drizzle-kit migrate`, {
    ...options,
    env: { ...process.env, NODE_ENV: "production" },
  });

  console.log("Exporting remote database...");
  execSync(`wrangler d1 export DB --remote --output=${fileName} -y`, options);

  console.log("Importing local database...");
  execSync(`wrangler d1 execute DB --local --file=${fileName}`, options);

  console.log("Seeding local database...");
  execSync("wrangler d1 execute DB --local --file=src/db/seed.sql", options);

  console.log("Local database initialised");
  unlink(fileName, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
  execSync(
    'wrangler d1 execute DB --local --command="SELECT * FROM trips"',
    options,
  );
} catch (err) {
  console.error("Wrangler command failed:");
  console.error("--- stdout ---");
  console.error(err.stdout || "(empty)");
  console.error("--- stderr ---");
  console.error(err.stderr || "(empty)");
  process.exit(1);
}
