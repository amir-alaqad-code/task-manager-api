const express = require("express");
const { authRequired } = require("../middleware/auth.middleware");
const { validate } = require("../middleware/validate.middleware");
const {
  createTaskSchema,
  updateTaskSchema,
  taskIdSchema,
  listTasksSchema,
} = require("../validators/task.validators");
const taskController = require("../controllers/task.controller");

const router = express.Router();

router.use(authRequired);

router.post("/", validate(createTaskSchema), taskController.create);
router.get("/", validate(listTasksSchema), taskController.list);
router.get("/:id", validate(taskIdSchema), taskController.getOne);
router.put("/:id", validate(updateTaskSchema), taskController.update);
router.delete("/:id", validate(taskIdSchema), taskController.remove);

module.exports = router;
