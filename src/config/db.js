const logger = require("./logger");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/MockUpAPI");
    logger.info("DB Connected successfully");
  } catch (error) {
    logger.error(`DB connection failed: ${error.message}`);
    // Important senior dev level code below (error.stack),
    // provides all stack detail, important for prod evn
    logger.error(error.stack);
    throw error;
  }
};

module.exports = connectDB;
