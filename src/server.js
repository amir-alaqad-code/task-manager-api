require("dotenv").config();
const { createApp } = require("./app");
const { prisma } = require("./utils/prisma");

const PORT = process.env.PORT || 3000;

async function start() {
  // Ensure DB connection early
  await prisma.$connect();

  const app = createApp();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`API running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err);
  process.exit(1);
});
