const express = require("express");
const router = express.Router();
const knexConfig = require("../db/db").knexConfig;
const knex = require("knex")(knexConfig);
const { makeTableJournalEntry } = require("../db/create-tables");

// Initialize the journal entry table
makeTableJournalEntry();

/**
 * Handles errors and sends a response with an error message.
 *
 * @param {Error} err - The error object.
 * @param {express.Response} res - The Express response object.
 */
const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

router
  .route("/")
  /**
   * GET route to fetch all journal entries.
   *
   * @name Get Journal Entries
   * @route {GET} /
   * @routeparam {none} - No route parameters.
   */
  .get((req, res) => {
    knex
      .select()
      .from("journal_entries")
      .then((journalEntries) => res.json(journalEntries))
      .catch((err) => handleError(err, res));
  })

  /**
   * POST route to add a new journal entry.
   *
   * @name Create Journal Entry
   * @route {POST} /
   * @bodyparam {string} title - The title of the journal entry.
   * @bodyparam {string} entry - The content of the journal entry.
   */
  .post((req, res) => {
    const { title, entry } = req.body;
    const currentDate = new Date().toISOString().slice(0, 10);
    knex
      .insert({ title, entry, date: currentDate })
      .into("journal_entries")
      .returning("*")
      .then((entries) => {
        const createdEntry = entries[0];
        res.status(201).json(createdEntry);
      })
      .catch((err) => handleError(err, res));
  });

router
  .route("/:id")
  /**
   * PUT route to update a specific journal entry by ID.
   *
   * @name Update Journal Entry
   * @route {PUT} /:id
   * @routeparam {string} id - The ID of the journal entry to update.
   * @bodyparam {string} title - The new title of the journal entry.
   * @bodyparam {string} entry - The new content of the journal entry.
   */
  .put((req, res) => {
    const { title, entry } = req.body;
    knex("journal_entries")
      .where({ id: req.params.id })
      .update({ title, entry })
      .then(() => {
        res.status(200).json({
          message: `Updated journal entry with id ${req.params.id} and set title to "${title}" and entry to "${entry}"`,
        });
      })
      .catch((err) => handleError(err, res));
  })

  /**
   * DELETE route to remove a specific journal entry by ID.
   *
   * @name Delete Journal Entry
   * @route {DELETE} /:id
   * @routeparam {string} id - The ID of the journal entry to delete.
   */
  .delete((req, res) => {
    knex("journal_entries")
      .where({ id: req.params.id })
      .del()
      .then(() => {
        res.status(200).json({
          message: `Deleted journal entry with id ${req.params.id}`,
        });
      });
  });

module.exports = router;
