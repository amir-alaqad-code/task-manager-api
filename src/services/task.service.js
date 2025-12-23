const { prisma } = require("../utils/prisma");

function buildWhere(userId, { status, priority, q }) {
  const where = { userId };

  if (status) where.status = status;
  if (priority) where.priority = priority;

  if (q) {
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  return where;
}

async function createTask(userId, data) {
  return prisma.task.create({
    data: {
      userId,
      title: data.title,
      description: data.description || null,
      status: data.status || "todo",
      priority: data.priority || "medium",
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    },
  });
}

async function listTasks(userId, query) {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const where = buildWhere(userId, query);

  const orderBy = { [query.sort || "createdAt"]: query.order || "desc" };

  const [items, total] = await Promise.all([
    prisma.task.findMany({ where, skip, take: limit, orderBy }),
    prisma.task.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    meta: { page, limit, total, totalPages },
    items,
  };
}

async function getTaskById(userId, id) {
  const task = await prisma.task.findFirst({ where: { id, userId } });
  if (!task) {
    const err = new Error("Task not found");
    err.statusCode = 404;
    throw err;
  }
  return task;
}

async function updateTask(userId, id, data) {
  // Ensure ownership
  await getTaskById(userId, id);

  return prisma.task.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description || null } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.priority !== undefined ? { priority: data.priority } : {}),
      ...(data.dueDate !== undefined ? { dueDate: data.dueDate ? new Date(data.dueDate) : null } : {}),
    },
  });
}

async function deleteTask(userId, id) {
  // Ensure ownership
  await getTaskById(userId, id);

  await prisma.task.delete({ where: { id } });
  return { deleted: true };
}

module.exports = { createTask, listTasks, getTaskById, updateTask, deleteTask };
