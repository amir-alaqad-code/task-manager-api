const taskService = require("../services/task.service");

async function create(req, res, next) {
  try {
    const task = await taskService.createTask(req.user.userId, req.body);
    res.status(201).json(task);
  } catch (e) {
    next(e);
  }
}

async function list(req, res, next) {
  try {
    const data = await taskService.listTasks(req.user.userId, req.query);
    res.json(data);
  } catch (e) {
    next(e);
  }
}

async function getOne(req, res, next) {
  try {
    const task = await taskService.getTaskById(req.user.userId, req.params.id);
    res.json(task);
  } catch (e) {
    next(e);
  }
}

async function update(req, res, next) {
  try {
    const task = await taskService.updateTask(req.user.userId, req.params.id, req.body);
    res.json(task);
  } catch (e) {
    next(e);
  }
}

async function remove(req, res, next) {
  try {
    const result = await taskService.deleteTask(req.user.userId, req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

module.exports = { create, list, getOne, update, remove };
