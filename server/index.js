const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const axios = require("axios");

app.use(cors());

const KEY = "AIzaSyDDu07gQt3IMkprFVEoT_xivroPRRbN_4o";

app.use(express.urlencoded({ extended: false }));

let db = {
  "Harry Potter": "JK Rowling"
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/author", function(req, res) {
  let book = req.query.book;
  book &&
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${book
          .split(" ")
          .join("%20")}`
      )
      .then(info => res.send(info.data.items[0].volumeInfo.authors[0]))
      //info.data.items[0].volume.authors[0]
      .catch(err => {
        res.send(err);
      });

  //res.send(author ? author : "Author Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
