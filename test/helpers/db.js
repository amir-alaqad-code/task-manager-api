const { execSync } = require("child_process");

function resetDb() {
  // Uses DATABASE_URL provided in environment (CI uses Postgres service)
  execSync("npx prisma migrate reset --force --skip-seed", {
    stdio: "inherit",
    env: process.env,
  });
}

module.exports = { resetDb };
