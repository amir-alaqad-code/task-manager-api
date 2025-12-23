require("dotenv").config();
const { createApp } = require("./app");
const { prisma } = require("./utils/prisma");

const PORT = process.env.PORT || 3000;

async function start() {
  await prisma.$connect();

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
