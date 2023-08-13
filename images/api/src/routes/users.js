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
  /**
   * GET route to retrieve all users from the database.
   * @name Get All Users
   * @route {GET} /
   */
  .get((req, res) => {
    knex
      .select()
      .from("users")
      .then((users) => res.json(users))
      .catch((err) => handleError(err, res));
  })

  /**
   * POST route to create a new user in the database.
   * Checks if a user with the same name already exists before adding.
   * @name Create User
   * @route {POST} /
   * @bodyparam {string} lastName - The last name of the user.
   * @bodyparam {string} firstName - The first name of the user.
   */
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

// Routes for '/users/:id' endpoint
router
  .route("/:id")
  /**
   * PUT route to update an existing user by ID.
   * @name Update User by ID
   * @route {PUT} /:id
   * @routeparam {number} id - The ID of the user to update.
   * @bodyparam {string} lastName - The updated last name of the user.
   * @bodyparam {string} firstName - The updated first name of the user.
   */
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

  /**
   * DELETE route to remove a user by ID from the database.
   * @name Delete User by ID
   * @route {DELETE} /:id
   * @routeparam {number} id - The ID of the user to delete.
   */
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
