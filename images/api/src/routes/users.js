const express = require("express");
const router = express.Router();
const knexConfig = require("../db/db").knexConfig;
const knex = require("knex")(knexConfig);
const { makeTableUser } = require("../db/create-tables");

// Initialize the user table
makeTableUser();

/**
 * Centralized error handler.
 * @param {Error} err - The error object.
 * @param {express.Response} res - The Express response object.
 */
const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

// Routes for base '/users' endpoint
router
  .route("/")
  .get((req, res) => {
    // Fetch all users from the 'users' table
    knex
      .select()
      .from("users")
      .then((users) => res.json(users))
      .catch((err) => handleError(err, res));
  })
  .post((req, res) => {
    const { lastName, firstName } = req.body;

    // Check if a user with the same name already exists
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
          // Insert new user into 'users' table
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

// Routes for '/users/:id' endpoint
router
  .route("/:id")
  .put((req, res) => {
    const { lastName, firstName } = req.body;

    /**
     * Update user with specified ID.
     * @param {number} id - The user's ID.
     */
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
    /**
     * Delete user with specified ID.
     * @param {number} id - The user's ID.
     */
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
