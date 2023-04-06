const express = require("express");
let server = express();
server.use(express.static("public"));
server.set("view engine", "ejs");
server.get("/App.html", (req, res) => {
  res.render("App");
});
server.get("/", (req, res) => {
  res.render("LandingPage");
});
server.listen(4000);