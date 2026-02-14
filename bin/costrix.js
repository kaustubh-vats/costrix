#!/usr/bin/env node

const { main } = require("../src/cli");

main().catch((error) => {
  const message = error && error.message ? error.message : String(error);
  console.error(`[ERROR] Failed to scaffold project: ${message}`);
  process.exit(1);
});
