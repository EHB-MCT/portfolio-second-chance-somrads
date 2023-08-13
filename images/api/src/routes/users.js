const express = require("express");
const router = express.Router();
const knexConfig = require("../db/db").knexConfig; 
const knex = require("knex")(knexConfig);
const { makeTableUser } = require("../db/create-tables");

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

router
  .route("/:id")
  .put((req, res) => {
    const { lastName, firstName } = req.body;
    knex("users")
      .where({ id: req.params.id })
      .update({ lastName, firstName })
      .then(() => {
        res.status(200).json({
          message: `Updated user with id ${req.params.id} and set name to ${firstName} ${lastName}`,
        });
      })
      .catch((err) => handleError(err, res));
  })
  .delete((req, res) => {
    knex("users")
      .where({ id: req.params.id })
      .del()
      .then(() => {
        res.status(200).json({
          message: `Deleted user with id ${req.params.id}`,
        });
      })
      .catch((err) => handleError(err, res));
  });

module.exports = router;
