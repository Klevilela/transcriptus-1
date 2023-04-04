const Reverso = require("reverso-api");
const reverso = new Reverso();

// generate phrases in english and portuguese
const generatePhrase = async (word) => {
  try {
    const response = await reverso.getContext(word, "english", "portuguese");
    const phrases = response.examples.map((example) => ({
      english: example.source,
      portuguese: example.target,
    }));
    return phrases;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// generate translations to pt
const generateTranslate = async (word) => {
  try {
    const response = await reverso.getTranslation(
      word,
      "english",
      "portuguese"
    );
    const translations = [...new Set(response.translations)];
    return translations;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { generatePhrase, generateTranslate };
