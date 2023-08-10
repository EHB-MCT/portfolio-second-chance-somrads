const express = require("express");
const router = express.Router();
const knex = require("knex")(require("../db/knexfile"));
const { makeTableUser } = require("../db/create-tables");
const bodyParser = require("body-parser");

router.use(bodyParser.json());

makeTableUser();

const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

router
  .route("/")
  .get((req, res) => {
    knex
      .select()
      .from("users")
      .then((users) => res.json(users))
      .catch((err) => handleError(err, res));
  })
  .post((req, res) => {
    const { lastName, firstName } = req.body;
    knex
      .select()
      .from("users")
      .where({ lastName, firstName })
      .then((users) => {
        if (users.length > 0) {
          res
            .status(400)
            .json({ error: "User with the same name already exists" });
        } else {
          knex
            .insert({ lastName, firstName })
            .into("users")
            .then(() => {
              res.status(201).json({
                message: `Created user with name ${firstName} ${lastName}`,
              });
            })
            .catch((err) => handleError(err, res));
        }
      })
      .catch((err) => handleError(err, res));
  });

module.exports = router;
