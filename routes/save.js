const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const openai = require("../controllers/openaiController");
const dictOp = require("../controllers/operationsController");
const Phrase = require("../controllers/phraseController");
const gAudio = require("../controllers/audioController");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// router to save the transcription of word
router.post("/text/save", async (req, res) => {
  let text = req.body.text.toLowerCase();
  await gAudio.generateAudio(text);
  const phrases = await Phrase.generatePhrase(text);
  const urlImage = await openai.generateImage(text);

  // traslating IPA to words
  text = await dictOp.findWord(text);
  const engWord = dictOp.translateWord(text);
  res.render("../views/transcripited/newText.ejs", {
    text: text,
    audio: "../audio.mp3",
    engWord: engWord,
    urlImage: urlImage,
    phrases: phrases,
  });
});

module.exports = router;
