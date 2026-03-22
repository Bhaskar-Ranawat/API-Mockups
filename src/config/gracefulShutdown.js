const mongoose = require("mongoose");
const logger = require("./logger");

const gracefulShutdown = (server, exitCode) => {
  if (!server || !server.listening) {
    setTimeout(() => {
      process.exit(exitCode);
    }, 1000);
  } else {
    server.close(() => {
      mongoose.connection.close(false, () => {
        logger.info("MongoDB connection close");
        setTimeout(() => {
          process.exit(exitCode);
        }, 1000);
      });
    });
  }
};

module.exports = gracefulShutdown;
