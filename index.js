const express = require("express");
const app = express();
const router = express.Router()
const bodyParser = require("body-parser");
const openai = require("./image/openaiController");
const dictOp = require("./dict/operationsDict");
const gAudio = require("./dict/audioGenerator");
const { render } = require("ejs");
const routerSave = require("./routes/save");

const port = process.env.PORT || 3000;

// define view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define path of static files
app.use(express.static("public"));
app.use(express.static("views"))

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", function (req, res){
  res.render(__dirname+"/home")
})
app.get("/login", function (req, res){
  res.render("login")
})

/*app.get("/sing-in", function (req, res){
  res.sendFile("register")
})*/
// router to save the transcription of word
app.post("/text/save", async (req, res) => {
  var text = req.body.text.toLowerCase();
  var urlImage = await openai.generateImage(text);

  // generate audio
  gAudio.generateAudio(text);
  // traslating IPA to words
  text = dictOp.findWord(text);
  var engWord = dictOp.translateWord(text);

  res.render("../views/transcripited/newText.ejs", {
    text: text,
    audioSrc: "../audio.mp3",
    engWord: engWord,
    urlImage: urlImage,
  });
});

