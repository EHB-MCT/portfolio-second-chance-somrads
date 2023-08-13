const express = require("express");
const router = express.Router();
const knexConfig = require("../db/db").knexConfig;
const knex = require("knex")(knexConfig);
const { makeTableJournalEntry } = require("../db/create-tables");

makeTableJournalEntry();

const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

router
  .route("/")
  .get((req, res) => {
    knex
      .select()
      .from("journal_entries")
      .then((journalEntries) => res.json(journalEntries))
      .catch((err) => handleError(err, res));
  })

  .post((req, res) => {
    const { title, entry } = req.body;

    // Get the current date in ISO format (YYYY-MM-DD)
    const currentDate = new Date().toISOString().slice(0, 10);

    // Check if a journal entry with the current date already exists
    knex("journal_entries")
      .where("date", "=", currentDate)
      .then((journalEntries) => {
        if (journalEntries.length > 0) {
          res.status(400).json({
            error: "Journal entry with the current date already exists",
          });
        } else {
          // Insert the new journal entry into the database
          knex
            .insert({ title, entry, date: currentDate })
            .into("journal_entries")
            .then(() => {
              res.status(201).json({
                message: `Created journal entry with title "${title}" and entry "${entry}"`,
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
