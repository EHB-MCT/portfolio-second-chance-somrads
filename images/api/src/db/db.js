require("dotenv").config();
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig);

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
