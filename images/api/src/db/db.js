const environment = process.env.NODE_ENV || "development";
const config = require("./knexfile");
const knexConfig = config[environment] || config.development;
console.log("Using configuration:", knexConfig);
const knex = require("knex")(knexConfig);

module.exports = {
  knexConfig,
  connect: () => {
    return knex
      .raw("SELECT 1+1 AS result")
      .then(() => console.log("Connected to PostgreSQL server"));
    // .finally(() => knex.destroy());
  },
  query: (sql, params) => {
    return knex.raw(sql, params);
  },
};
