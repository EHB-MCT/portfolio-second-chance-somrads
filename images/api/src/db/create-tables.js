const knex = require("knex")(require("./knexfile.js"));

const createTableIfNotExists = async (tableName, tableSchema) => {
  try {
    const tableExists = await knex.schema.hasTable(tableName);
    if (!tableExists) {
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
  makeTableUser: () =>
    createTableIfNotExists("users", (table) => {
      table.increments("id");
      table.string("lastName");
      table.string("firstName");
    }),
  makeTableJournalEntry: () =>
    createTableIfNotExists("journal_entries", (table) => {
      table.increments("id");
      table.string("title");
      table.text("entry");
      table.timestamp("date").defaultTo(knex.fn.now());
    }),
};
