const { knexConfig } = require("./db");
const knex = require("knex")(knexConfig);

/**
 * Create a table if it doesn't already exist.
 *
 * @param {string} tableName - Name of the table to create.
 * @param {Function} tableSchema - Schema of the table.
 */
const createTableIfNotExists = async (tableName, tableSchema) => {
  try {
    // Check if the table already exists
    const tableExists = await knex.schema.hasTable(tableName);

    if (!tableExists) {
      // Create the table if it doesn't exist
      await knex.schema.createTable(tableName, tableSchema);
      console.log(`${tableName} table created!`);
    } else {
      console.log(`${tableName} table already exists, skipping creation`);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  /**
   * Create the 'users' table if it doesn't already exist.
   */
  makeTableUser: () =>
    createTableIfNotExists("users", (table) => {
      table.increments("id"); // Primary key
      table.string("lastName"); // Last name column
      table.string("firstName"); // First name column
    }),

  /**
   * Create the 'journal_entries' table if it doesn't already exist.
   */
  makeTableJournalEntry: () =>
    createTableIfNotExists("journal_entries", (table) => {
      table.increments("id"); // Primary key
      table.string("title"); // Title column
      table.text("entry"); // Entry content column
      table.timestamp("date").defaultTo(knex.fn.now()); // Date column with default value as the current timestamp
    }),
};
