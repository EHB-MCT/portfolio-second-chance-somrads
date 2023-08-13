const app = require("./app"); // Import the Express app instance
const PORT = process.env.PORT || 3000; // Set the listening port, defaulting to 3000 if not set in environment variables

/**
 * Start the Express server, listening on the specified PORT.
 * Log success or errors to the console.
 * 
 * @function
 * @name startServer
 * @param {number} PORT - The port number to listen on.
 */
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`API server listening on port ${PORT}`);
  } else {
    console.error(err);
  }
});
