const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routerSave = require("./routes/save");
const UserController = require("./users/UserController");
const port = process.env.PORT || 3000;

// define view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define path of static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/pronuncia", (req, res) => {
  res.render("index");
});

app.use("/", routerSave);
app.use("/", UserController);

app.listen(port, () => {
  console.log("server running...");
});
