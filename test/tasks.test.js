const request = require("supertest");
const { createApp } = require("../src/app");
const { prisma } = require("../src/utils/prisma");
const { resetDb } = require("./helpers/db");

const app = createApp();

async function registerAndGetToken() {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ name: "User", email: "user@example.com", password: "secret123" })
    .expect(201);

  return res.body.token;
}

beforeAll(async () => {
  resetDb();
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Tasks", () => {
  test("create task and list tasks", async () => {
    const token = await registerAndGetToken();

    const created = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "First Task", description: "Hello", priority: "high" })
      .expect(201);

    expect(created.body.title).toBe("First Task");

    const list = await request(app)
      .get("/api/tasks?page=1&limit=10")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(list.body.items)).toBe(true);
    expect(list.body.items.length).toBeGreaterThanOrEqual(1);
  });
});
