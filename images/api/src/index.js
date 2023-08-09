const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, resp)=>{
  resp.send({message: "hello world"})
})

app.listen(3000, (err) => {
  if (!err){
    console.log(`API server listening on port ${PORT}`);
  } else {
    console.error(err);
  }
} )