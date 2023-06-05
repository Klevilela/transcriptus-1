// Função para formatar o XML com quebras de linha e indentação
function formatXml(xml) {
    let formattedXml = '';
    const reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    const pad = 2;
    xml.split('\r\n').forEach((node) => {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (formattedXml.lastIndexOf('\r\n') > -1) {
          indent = formattedXml.lastIndexOf('\r\n');
        }
      } else if (node.match(/^<\w([^>]*[^\/])?>.*$/)) {
        if (formattedXml.lastIndexOf('\r\n') > -1) {
          indent = formattedXml.lastIndexOf('\r\n');
        }
        indent += pad;
      } else {
        if (formattedXml.lastIndexOf('\r\n') > -1) {
          indent = formattedXml.lastIndexOf('\r\n');
        }
        indent += pad;
      }
  
      formattedXml += ' '.repeat(indent) + node + '\r\n';
    });
  
    return formattedXml;
  }

// Função para fazer a requisição da definição da palavra
function getWordDefinition() {
    const input = document.getElementById('word_input');
    const palavra = input.value;

    axios.get(`/verbete/${palavra}/xml`)
        .then(response => {
            const xml = response.data;
            const verbete = document.getElementById('verbete');
            verbete.innerHTML = formatXml(xml);
        })
        .catch(error => {
            console.error(error);
        });
}

// Adicionando o evento de clique ao botão
const button = document.getElementById('genarate_random_word');
button.addEventListener('click', getWordDefinition);
