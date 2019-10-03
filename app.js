// const http = require('http');

// const hostname = '127.0.0.1'; //this is local host
// const port = process.env.PORT || 3000; //this is a node convention, change to anything

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello World\n');
// });

const express = require("express");
const hbs = require("hbs");
const path = require("path");
const sql = require("./utils/sql");

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", path.join(__dirname + "/views"));

app.get("/", (req, res) => {
    res.render("home", {homemessage: "hey there", bio: "some bios here and there"});
})

app.get("/users", (req, res) => {
  //get user data when hit this

  //try a connection
  //if error happens
  sql.getConnection((err, connection) => {
    if (err) {
      return console.log(err,message);
    }

    let query = "SELECT * FROM tbl_card";

    sql.query(query, (err, rows) => {
      //done with db connect, let someone else use it
      connection.release(); 

      if (err) {return console.log(err.message)}

      console.log(rows);

      res.render("user", rows[0]);
    })


  })
})

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
})