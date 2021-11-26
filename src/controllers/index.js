const express = require("express");
const app = express();

app.use("/role", require("./role"));
app.use("/register", require("./register"));
app.use("/login", require("./login"));
app.use("/projects", require("./projects"));
app.use("/homework", require("./homeworks"));
app.use("/history", require("./history"));

module.exports = app;
