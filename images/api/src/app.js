const express = require("express");
const app = express();
const db = require("./db/db");
const usersRouter = require("./routes/users");

// Connect to the database
db.connect();

app.get("/", (req, resp) => {
  resp.send({ message: "hello world" });
});

// Users routes
app.use("/users", usersRouter);

module.exports = app;
