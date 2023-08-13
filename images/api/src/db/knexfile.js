// Exporting knex configurations for different environments.

module.exports = {
  // Development environment configuration
  development: {
    client: "pg", // Database client name
    connection: process.env.POSTGRES_CONNECTION_STRING, // Connection string sourced from environment variable
    pool: {
      min: 0, // Minimum number of connections in the pool
      max: 7, // Maximum number of connections in the pool
    },
  },

  // Test environment configuration
  test: {
    client: "pg", // Database client name
    connection: process.env.TEST_POSTGRES_CONNECTION_STRING, // Connection string for the test environment, sourced from environment variable
    pool: {
      min: 0, // Minimum number of connections in the pool
      max: 7, // Maximum number of connections in the pool
    },
  },
};
