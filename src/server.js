const app = require("./app");
require("dotenv").config();

const logger = require("./config/logger");

const config = require("./config/env");

const { port, env } = config;

console.log(env);

app.listen(port, () => {
  console.log(`The server is up at \n http:localhost:${port}`);
  logger.info("server started")
});
