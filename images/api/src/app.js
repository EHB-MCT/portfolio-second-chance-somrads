// Load environment variables from the `.env` file
require("dotenv").config();

// Import necessary modules
const express = require("express");
const path = require("path"); // Added to handle file paths
const app = express(); // Create an instance of an Express app
const db = require("./db/db"); // Database connection and utility methods
const usersRouter = require("./routes/users"); // Router for user-related endpoints
const journalRouter = require("./routes/journal"); // Router for user-related endpoints
const bodyParser = require("body-parser"); // Middleware to parse request bodies
const cors = require("cors");

/**
 * Middleware to parse JSON bodies from HTTP requests
 */
app.use(bodyParser.json());

/**
 * Middleware to add CORS header
 */
app.use(cors());

/**
 * Middleware to serve static files from the public directory
 */
app.use(express.static(path.join(__dirname, "../public")));

/**
 * Initialize and connect to the database
 */
db.connect();

/**
 * Healthcheck endpoint to ensure the service is running
 *
 * @name Healthcheck
 * @route {GET} /healthcheck
 */
app.get("/healthcheck", (req, res) => {
  res.status(200).send("OK");
});

/**
 * Root endpoint to serve the index.html file
 *
 * @name Welcome
 * @route {GET} /
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

/**
 * Mount the users router on the "/users" path
 */
app.use("/users", usersRouter);

/**
 * Mount the journal router on the "/journal" path
 */
app.use("/journal", journalRouter);

/**
 * Export the app instance for use in other modules
 *
 * @type {express.Application}
 */
module.exports = app;
