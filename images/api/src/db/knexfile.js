require("dotenv").config();

const environment = process.env.NODE_ENV || "development";

let connection;

if (environment === "test") {
  connection = process.env.POSTGRES_CONNECTION_STRING.replace(
    `/${process.env.POSTGRES_DATABASE}`,
    `/${process.env.POSTGRES_TEST_DATABASE}`
  );
} else {
  connection = process.env.POSTGRES_CONNECTION_STRING;
}

module.exports = {
  client: "pg",
  connection: connection,
};
