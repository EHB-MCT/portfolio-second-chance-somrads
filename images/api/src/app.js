require("dotenv").config();

const express = require("express");
const app = express();
const db = require("./db/db");
const usersRouter = require("./routes/users");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

// Connect to the database
db.connect();


app.get("/healthcheck", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => {
  res.send({ message: "Hello, world!" });
});

// Users routes
app.use("/users", usersRouter);

module.exports = app;
