const knexConfig = require("../../../db/db").knexConfig;
const knex = require("knex")(knexConfig);

/**
 * Group of integration tests related to the Journal Entry routes and their interactions with the database.
 */
describe("Journal Entry Routes - Integration Tests", () => {
  /**
   * Test to ensure that when a new journal entry is added to the database,
   * it is correctly saved and can be retrieved.
   */
  it("should save and retrieve a journal entry from the database", async () => {
    const newEntry = {
      title: "Test title",
      entry: "Test content",
    };

    // Insert the journal entry into the database
    const insertedIds = await knex("journal_entries").insert(newEntry);
    const entryId = insertedIds[0];

    // Retrieve the journal entry from the database
    const entries = await knex("journal_entries").where({ id: entryId });
    const savedEntry = entries[0];

    expect(savedEntry.title).toBe(newEntry.title);
    expect(savedEntry.entry).toBe(newEntry.entry);
  });

  /**
   * Test to ensure that when a journal entry's details are updated in the database,
   * the changes are correctly saved and can be retrieved.
   */
  it("should update a journal entry's details in the database", async () => {
    const originalEntry = {
      title: "Original title",
      entry: "Original content",
    };

    // Insert the original journal entry into the database
    const insertedIds = await knex("journal_entries").insert(originalEntry);
    const entryId = insertedIds[0];

    // Update the journal entry's details in the database
    const updatedEntry = {
      title: "Updated title",
      entry: "Updated content",
    };
    await knex("journal_entries").where({ id: entryId }).update(updatedEntry);

    // Retrieve the updated journal entry from the database
    const entries = await knex("journal_entries").where({ id: entryId });
    const savedEntry = entries[0];

    expect(savedEntry.title).toBe(updatedEntry.title);
    expect(savedEntry.entry).toBe(updatedEntry.entry);
  });

  /**
   * Test to ensure that when a journal entry is deleted from the database,
   * it is correctly removed and cannot be retrieved.
   */
  it("should delete a journal entry from the database", async () => {
    const entryToDelete = {
      title: "Delete this title",
      entry: "Delete this content",
    };

    // Insert the journal entry into the database
    const insertedIds = await knex("journal_entries").insert(entryToDelete);
    const entryId = insertedIds[0];

    // Delete the journal entry from the database
    await knex("journal_entries").where({ id: entryId }).del();

    // Attempt to retrieve the deleted journal entry from the database
    const entries = await knex("journal_entries").where({ id: entryId });

    expect(entries.length).toBe(0);
  });
});

/**
 * After all tests have completed, close the database connection
 * to ensure that the Jest process doesn't hang.
 */
afterAll(() => {
  knex.destroy();
});
