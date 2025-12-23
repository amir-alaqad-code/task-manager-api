const express = require("express");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");
const healthRoutes = require("./routes/health.routes");
const { notFound } = require("./middleware/notfound.middleware");
const { errorMiddleware } = require("./middleware/error.middleware");

function createApp() {
  const app = express();

  app.use(express.json());
  app.use(morgan("dev"));

  app.use("/health", healthRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/tasks", taskRoutes);

  app.use(notFound);
  app.use(errorMiddleware);

  return app;
}

module.exports = { createApp };
