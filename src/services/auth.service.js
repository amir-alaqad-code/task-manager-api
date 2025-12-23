const { prisma } = require("../utils/prisma");
const { hashPassword, comparePassword } = require("../utils/password");
const { signToken } = require("../utils/jwt");

async function register({ name, email, password }) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("Email already in use");
    err.statusCode = 409;
    throw err;
  }

  const hashed = await hashPassword(password);
  const user = await prisma.user.create({
    data: { name, email, password: hashed },
    select: { id: true, name: true, email: true, createdAt: true },
  });

  const token = signToken({ userId: user.id });
  return { user, token };
}

async function login({ email, password }) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const ok = await comparePassword(password, user.password);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const token = signToken({ userId: user.id });
  return {
    user: { id: user.id, name: user.name, email: user.email },
    token,
  };
}

module.exports = { register, login };
