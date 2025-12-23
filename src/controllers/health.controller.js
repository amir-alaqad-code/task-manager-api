const { prisma } = require("../utils/prisma");

async function health(req, res) {
  let db = "unknown";
  try {
    await prisma.$queryRaw`SELECT 1`;
    db = "ok";
  } catch {
    db = "down";
  }

  res.json({ status: "ok", db });
}

module.exports = { health };
