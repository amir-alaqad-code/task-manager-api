const { prisma } = require("../utils/prisma");

async function health(req, res) {
  let db = "unknown";
  try {
    await prisma.$queryRaw`SELECT 1`;
    db = "ok";
  } catch (e) {
    db = "down";
  }

  res.json({ status: "ok", db });
}

module.exports = { health };
