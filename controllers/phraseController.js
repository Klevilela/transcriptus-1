const Reverso = require("reverso-api");
const reverso = new Reverso();

// generate phrases in english and portuguese
const generatePhrase = async (word) => {
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

module.exports = { generatePhrase };
