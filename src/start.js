require("dotenv").config();
const { execSync } = require("child_process");

try {
  execSync("npx prisma migrate deploy", { stdio: "inherit", env: process.env });
} catch (e) {
  console.error("Migration step failed:", e?.message || e);
  process.exit(1);
}

require("./server");
