const express = require("express");
const app = express();

app.use("/role",require("./role"));

module.exports = app;