const fs = require("fs");

// Define a constant object for text to IPA conversion
const textToIpa = {};

// Read dictionary
const wordsInLine = fs.readFileSync("./ipadict.txt", "utf-8");

// Parse the file and store the text-to-IPA mappings in the textToIpa object
const parsingFile = (lines) => {
  for (const line of lines) {
    const [word, ipa] = line.split(/\s+/g);
    textToIpa[word] = ipa;
  }
  console.log(`Done parsing. ${Object.keys(textToIpa).length} items loaded.`);
};

// Call the parsingFile function with the words in lines
parsingFile(wordsInLine.split("\n"));

// Find the IPA text for an English word
const findWord = (word) => {
  let text = textToIpa[word];

  if (text === undefined) {
    return undefined;
  }

  // Iterate from 1 - 3. There are no more than 3 extra pronunciations.
  for (let i = 1; i < 4; i++) {
    // See if pronunciation i exists...
    if (typeof textToIpa[word + "(" + i + ")"] != "undefined") {
      // ...If it does we know that the error should be multi and the text
      // is always itself plus the new pronunciation
      error = "multi";
      text += " / " + textToIpa[word + "(" + i + ")"];
      // ...Otherwise no need to keep iterating
    } else {
      break;
    }
  }

  return text;
};

// Translate an IPA text to English words
const translateWord = (word) => {
  try {
    let wordIPA = findWord(word);

    let wordEn = "";

    const ipaToEn = {
      b: "b",
      l: "l",
      ʌ: "uh",
      d: "d",
      dʒ: "g",
      θ: "th",
      h: "rr",
      e: "e",
      æ: "a",
      p: "p",
      y: "i",
      i: "ee",
      aɪ: "ai",
      oʊ: "ow",
      ʊ: "uh",
      aʊ: "au",
      u: "uw",
      ɔɪ: "ói",
      ə: "á",
      k: "k",
      m: "m",
      n: "n",
      s: "s",
      v: "v",
      t: "t",
      ɛ: "é",
      ɔ: "ao",
      ʧ: "ch",
      ər: "êr",
      ɪ: "ih",
      j: "y",
      a: "a",
      g: "g",
      z: "z",
      f: "f",
      r: "r",
      ɹ: "r",
      w: "w",
      o: "o",
      ɑ: "aa",
      ŋ: "ng",
      ɚ: "er",
      ð: "dh",
      "/": " ou ",
      ʒ: "zh",
      ʃ: "sh",
      ˈ: "ˈ",
      ʤ: "j",
    };

    for (const char of wordIPA) {
      for (let letter in ipaToEn) {
        if (letter == char) {
          wordEn += ipaToEn[letter];
        }
      }
    }

    return wordEn;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = { translateWord };
