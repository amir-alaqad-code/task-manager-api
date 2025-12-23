const Joi = require("joi");

const status = Joi.string().valid("todo", "doing", "done");
const priority = Joi.string().valid("low", "medium", "high");

const createTaskSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(1).max(200).required(),
    description: Joi.string().max(2000).allow("").optional(),
    status: status.optional(),
    priority: priority.optional(),
    dueDate: Joi.date().iso().optional(),
  }).required(),
});

const updateTaskSchema = Joi.object({
  body: Joi.object({
    title: Joi.string().min(1).max(200).optional(),
    description: Joi.string().max(2000).allow("").optional(),
    status: status.optional(),
    priority: priority.optional(),
    dueDate: Joi.date().iso().allow(null).optional(),
  }).min(1).required(),
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }).required(),
});

const taskIdSchema = Joi.object({
  params: Joi.object({
    id: Joi.string().uuid().required(),
  }).required(),
});

const listTasksSchema = Joi.object({
  query: Joi.object({
    status: status.optional(),
    priority: priority.optional(),
    q: Joi.string().max(200).optional(),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid("createdAt", "dueDate").default("createdAt"),
    order: Joi.string().valid("asc", "desc").default("desc"),
  }).required(),
});

module.exports = { createTaskSchema, updateTaskSchema, taskIdSchema, listTasksSchema };
