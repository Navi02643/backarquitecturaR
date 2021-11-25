const express = require("express");
const app = express();

app.use("/role",require("./role"));
app.use("/register",require("./register"));
app.use("/login",require("./login"));


module.exports = app;