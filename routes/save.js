const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const openai = require("../controllers/openaiController");
const dictOp = require("../controllers/operationsController");
const reverso = require("../controllers/reversoController");
const gAudio = require("../controllers/audioController");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// router to save the transcription of word
router.post("/text/save", async (req, res) => {
  try {
    let text = req.body.text.toLowerCase().trim();

    // generate audio, translation, phrases and image
    const originalText = text;
    gAudio.generateAudio(text);
    const translation = await reverso.generateTranslate(text);
    const phrases = await reverso.generatePhrase(text);
    // const urlImage = openai.generateImage(text);
    // translating IPA to words
    let engWord = dictOp.translateWord(text);

    res.render("../views/transcripited/newText.ejs", {
      text: text,
      audio: "../audio.mp3",
      engWord: engWord,
      // urlImage: urlImage,
      phrases: phrases,
      originalText: originalText,
      translation: translation,
    });
  } catch (err) {
    console.error(err);
    res.render("../views/error.ejs", {
      message: "An error occurred while processing your request.",
    });
  }
});

module.exports = router;
