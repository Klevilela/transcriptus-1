const gTTS = require("gtts");

const generateAudio = (word) => {
  var gtts = new gTTS(word, "en");
  gtts.save("./public/audio.mp3", function (err, result) {
    if (err) {
      throw new Error(err);
    }
    console.log("Text to speech converted!");
  });
};

module.exports = { generateAudio };
