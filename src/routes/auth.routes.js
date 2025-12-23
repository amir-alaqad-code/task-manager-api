const express = require("express");
const { validate } = require("../middleware/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validators");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

module.exports = router;
