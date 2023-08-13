// Import necessary modules
const environment = process.env.NODE_ENV || "development"; // Set the environment variable or default to 'development'
const config = require("./knexfile"); // Import the knex configuration
const knexConfig = config[environment] || config.development; // Use the configuration based on the environment
console.log("Using configuration:", knexConfig); // Log the current configuration
const knex = require("knex")(knexConfig); // Initialize knex with the chosen configuration

module.exports = {
  knexConfig, // Export the chosen configuration

  /**
   * Connect to the PostgreSQL server.
   *
   * @returns {Promise} A promise that resolves when connection is successful.
   */
  connect: () => {
    return knex
      .raw("SELECT 1+1 AS result")
      .then(() => console.log("Connected to PostgreSQL server"));
  },

  /**
   * Execute a raw SQL query.
   *
   * @param {string} sql - The SQL query string.
   * @param {Array} params - Parameters to pass into the SQL query.
   * @returns {Promise} A promise that resolves with the query result.
   */
  query: (sql, params) => {
    return knex.raw(sql, params);
  },
};
