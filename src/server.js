const logger = require("./config/logger");

// Uncaught exception --> Catches error during initialization
process.on("uncaughtException", (error) => {
  logger.error(`Uncaught Exception: ${error.stack}`);
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});

require("dotenv").config();

const app = require("./app");
const config = require("./config/env");
const connectDB = require("./config/db");
const { port, env } = config;
const mongoose = require("mongoose");
const gracefulShutdown = require("./config/gracefulShutdown");

// Implementing the senior level server architecture

let server;

// server function separation
const startServer = async () => {
  try {
    await connectDB();
    server = app.listen(port, () => {
      logger.info(`The server is up at http://localhost:${port}`);
    });
  } catch (error) {
    logger.error(`Server startup failed: ${error.message}`);
    setTimeout(() => {
      process.exit(1);
    }, 1000);
  }
};

startServer();

// Unhandled Promise Rejections
process.on("unhandledRejection", (error) => {
  logger.error(`Unhandled Rejection: ${error.stack}`);
  gracefulShutdown(server, 1);
});

// Graceful shutdown handler (Docker/Kubernetes)
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, Shutting down server.");
  gracefulShutdown(server, 0);
});

// Graceful shutdown handler (CTRL + C)
process.on("SIGINT", () => {
  logger.info("SIGINT receieved, Shutting down server.");
  gracefulShutdown(server, 1);
});
