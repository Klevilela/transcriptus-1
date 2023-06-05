const fs = require('fs');
const readline = require('readline');

import { createRequire } from 'module';

// Carregar as palavras em inglês do arquivo
const englishWords = [];
const rl = readline.createInterface({
  input: fs.createReadStream(__dirname + './english-words.txt')
});
console.log(`${__dirname}`)

rl.on('line', function(line) {
  englishWords.push(line);
});

rl.on('close', function() {
  // Função para consultar a definição de uma palavra
  function consultarDefinicao(palavra) {
    if (englishWords.includes(palavra)) {
      console.log(`Definição da palavra "${palavra}": ...`);
    } else {
      console.log(`A palavra "${palavra}" não foi encontrada nos verbetes.`);
    }
  }

  // Função para gerar uma palavra aleatória
  function gerarPalavraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * englishWords.length);
    return englishWords[indiceAleatorio];
  }

  // Exemplo de consulta de definição de palavra aleatória
  const palavraAleatoria = gerarPalavraAleatoria();
  console.log('Palavra aleatória:', palavraAleatoria);
  consultarDefinicao(palavraAleatoria);
});

console.log(gerarPalavraAleatoria())

module.exports = {gerarPalavraAleatoria}




