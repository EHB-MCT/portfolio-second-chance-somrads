const express = require("express");
const app = express();
const db = require("./db/db.js");
const PORT = process.env.PORT || 3000;

db.connect();

app.get("/", (req, resp) => {
  resp.send({ message: "hello world" });
});

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`API server listening on port ${PORT}`);
  } else {
    console.error(err);
  }
});
