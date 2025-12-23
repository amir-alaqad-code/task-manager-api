require("dotenv").config();
const { execSync } = require("child_process");

try {
  execSync("npx prisma migrate deploy", { stdio: "inherit", env: process.env });
} catch (e) {
  // eslint-disable-next-line no-console
  console.error("Migration step failed:", e);
  process.exit(1);
}

require("./server");
