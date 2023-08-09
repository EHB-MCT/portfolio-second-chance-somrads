require("dotenv").config();
const knex = require("knex")(require("./knexfile.js"));

module.exports = {
  connect: () => {
    return knex
      .raw("SELECT 1+1 AS result")
      .then(() => console.log("Connected to PostgreSQL server"))
      .finally(() => knex.destroy());
  },
  query: (sql, params) => {
    return knex.raw(sql, params);
  },
};
