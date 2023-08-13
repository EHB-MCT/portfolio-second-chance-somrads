module.exports = {
  development: {
    client: "pg",
    connection: process.env.POSTGRES_CONNECTION_STRING,
    pool: {
      min: 0,
      max: 7,
    },
  },
  test: {
    client: "pg",
    connection: process.env.TEST_POSTGRES_CONNECTION_STRING,
    pool: {
      min: 0,
      max: 7,
    },
  }
};
