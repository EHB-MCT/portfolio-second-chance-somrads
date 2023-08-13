const express = require("express");
const app = express();
const db = require("./db/db");
const usersRouter = require("./routes/users");
const bodyParser = require("body-parser");

// Connect to the database
db.connect();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello, world!" });
});

// Users routes
app.use("/users", usersRouter);

module.exports = app;
