const gTTS = require("gtts");

// Função para gerar o áudio
const generateAudio = (text) => {
  const gtts = new gTTS(text, "en");
  gtts.save("./audio.mp3");
  console.log("Text to speech converted!");
};

module.exports = { generateAudio };
