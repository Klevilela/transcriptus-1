const Reverso = require("reverso-api");
const reverso = new Reverso();

// generate phrases in english and portuguese
const generatePhrase = (word) => {
  return new Promise((resolve, reject) => {
    reverso.getContext(word, "english", "portuguese", (err, response) => {
      if (err) {
        reject(err);
      } else {
        const phrases = response.examples.map((example) => ({
          english: example.source,
          portuguese: example.target,
        }));
        resolve(phrases);
      }
    });
  });
};

// generate translations to pt
const generateTranslate = (word) => {
  return new Promise((resolve, reject) => {
    reverso.getTranslation(word, "english", "portuguese", (err, response) => {
      if (err) reject(err);

      const translations = [...new Set(response.translations)];
      resolve(translations);
    });
  });
};

module.exports = { generatePhrase, generateTranslate };
