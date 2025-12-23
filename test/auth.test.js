const request = require("supertest");
const { createApp } = require("../src/app");
const { prisma } = require("../src/utils/prisma");
const { resetDb } = require("./helpers/db");

const app = createApp();

beforeAll(async () => {
  resetDb();
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Auth", () => {
  test("register then login", async () => {
    const reg = await request(app)
      .post("/api/auth/register")
      .send({ name: "Amir", email: "amir@example.com", password: "secret123" })
      .expect(201);

    expect(reg.body).toHaveProperty("token");
    expect(reg.body.user.email).toBe("amir@example.com");

    const login = await request(app)
      .post("/api/auth/login")
      .send({ email: "amir@example.com", password: "secret123" })
      .expect(200);

    expect(login.body).toHaveProperty("token");
  });
});
