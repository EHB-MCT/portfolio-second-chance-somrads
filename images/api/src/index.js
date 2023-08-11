const app = require("./app"); //
const PORT = process.env.PORT || 3000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`API server listening on port ${PORT}`);
  } else {
    console.error(err);
  }
});
