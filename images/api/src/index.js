const express = require("express");

const app = express();

app.get("/", (req, resp)=>{
  resp.send({message: "hello world"})
})

app.listen(3000, (err) => {
  if (!err){
    console.log("server is running");
  } else {
    console.error(err);
  }
} )