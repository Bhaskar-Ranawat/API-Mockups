const express = require("express");
const app = express();
const transactionRoutes = require("./routes/transactionRoute");

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", transactionRoutes);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

module.exports = app;
