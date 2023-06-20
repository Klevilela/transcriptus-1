"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var fs = require("fs");

var detLanguage = require("detectlanguage");

var reverso = require("./reversoController");

require("dotenv").config(); // detect language


var detectLanguage = function detectLanguage(word) {
  var apiKey, detectlanguage, result, language;
  return regeneratorRuntime.async(function detectLanguage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          apiKey = process.env.DETLANGUAGE_API_KEY;
          detectlanguage = new detLanguage("3696e5e886882611817659f12533bb88");
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(detectlanguage.detectCode(word));

        case 5:
          result = _context.sent;
          language = JSON.parse(JSON.stringify(result));

          if (!(language == "en")) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", true);

        case 11:
          return _context.abrupt("return", language);

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](2);
          console.error(_context.t0);
          throw _context.t0;

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 14]]);
};

var test = function test() {
  var x;
  return regeneratorRuntime.async(function test$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(detectLanguage("despacito"));

        case 2:
          x = _context2.sent;
          console.log(x);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

test();

function generateTranslate(word) {
  return new Promise(function (resolve, reject) {
    reverso.getTranslation(word, "english", "portuguese", function (err, response) {
      if (err) reject(err);

      var translations = _toConsumableArray(new Set(response.translations));

      resolve(translations);
    });
  });
} // // simple translate
// const simpleTranslate = (word) => {
//   return new Promise((resolve, reject) => {
//     reverso.getTranslation(word, "english", "portuguese", (err, response) => {
//       if (err) reject(err);
//       const translations = [...new Set(response.translations)];
//       resolve(translations[0]);
//     });
//   });
// };
// // Define a constant object for text to IPA conversion
// const textToIpa = {};
// // Read dictionary
// const wordsInLine = fs.readFileSync("./ipadict.txt", "utf-8");
// // Parse the file and store the text-to-IPA mappings in the textToIpa object
// const parsingFile = (lines) => {
//   for (const line of lines) {
//     const [word, ipa] = line.split(/\s+/g);
//     textToIpa[word] = ipa;
//   }
//   console.log(`Done parsing. ${Object.keys(textToIpa).length} items loaded.`);
// };
// // Call the parsingFile function with the words in lines
// parsingFile(wordsInLine.split("\n"));
// // Find the IPA text for an English word
// const findWord = (word) => {
//   if (!detectLanguage(word)) {
//     word = simpleTranslate(word);
//   }
//   console.log(word);
//   let text = textToIpa[word];
//   if (text === undefined) {
//     return undefined;
//   }
//   // Iterate from 1 - 3. There are no more than 3 extra pronunciations.
//   for (let i = 1; i < 4; i++) {
//     // See if pronunciation i exists...
//     if (typeof textToIpa[word + "(" + i + ")"] != "undefined") {
//       // ...If it does we know that the error should be multi and the text
//       // is always itself plus the new pronunciation
//       error = "multi";
//       text += " / " + textToIpa[word + "(" + i + ")"];
//       // ...Otherwise no need to keep iterating
//     } else {
//       break;
//     }
//   }
//   return text;
// };
// // Translate an IPA text to English words
// const translateWord = (word) => {
//   let wordIPA = findWord(word);
//   let wordEn = "";
//   const ipaToEn = {
//     b: "b",
//     l: "l",
//     ʌ: "uh",
//     d: "d",
//     dʒ: "g",
//     θ: "th",
//     h: "rr",
//     e: "e",
//     æ: "a",
//     p: "p",
//     y: "i",
//     i: "ee",
//     aɪ: "ai",
//     oʊ: "ow",
//     ʊ: "uh",
//     aʊ: "au",
//     u: "uw",
//     ɔɪ: "ói",
//     ə: "á",
//     k: "k",
//     m: "m",
//     n: "n",
//     s: "s",
//     v: "v",
//     t: "t",
//     ɛ: "é",
//     ɔ: "ao",
//     ʧ: "ch",
//     ər: "êr",
//     ɪ: "ih",
//     j: "y",
//     a: "a",
//     g: "g",
//     z: "z",
//     f: "f",
//     r: "r",
//     ɹ: "r",
//     w: "w",
//     o: "o",
//     ɑ: "aa",
//     ŋ: "ng",
//     ɚ: "er",
//     ð: "dh",
//     "/": " ou ",
//     ʒ: "zh",
//     ʃ: "sh",
//     ˈ: "ˈ",
//     ʤ: "j",
//   };
//   for (const char of wordIPA) {
//     for (let letter in ipaToEn) {
//       if (letter == char) {
//         wordEn += ipaToEn[letter];
//       }
//     }
//   }
//   return wordEn;
// };
// module.exports = { translateWord };