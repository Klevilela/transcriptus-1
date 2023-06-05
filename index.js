const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const routerSave = require("./routes/save");
const axios = require('axios')
const swaggerUi = require('swagger-ui-express')
const swaggerDocs = require('./swagger.json')

const port = process.env.PORT || 3000;

// define view engine to ejs
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// define path of static files
app.use(express.static("public"));
app.use(express.static("views"))

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get("/", (req, res) => {
  res.render("index");
});

app.get('/home', function(req, res){
  res.render("home");
})

// Rota para a requisição do campo "xml" da API do Dicionário Aberto
app.get('/verbete/:palavra/xml', (req, res) => {
  const palavra = req.params.palavra;
  const url = `https://api.dicionario-aberto.net/word/${palavra}`;

  axios.get(url)
    .then(response => {
      if (response.data.length > 0) {
        const entry = response.data[0];
        if (entry.xml) {
          const xml = entry.xml;
          res.send(xml);
        } else {
          res.status(404).json({ error: 'Definição não encontrada para a palavra informada.' });
        }
      } else {
        res.status(404).json({ error: 'Palavra não encontrada no dicionário.' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Erro ao obter a definição da palavra.' });
    });
});


app.use("/", routerSave);

app.listen(port, () => {
  console.log(`server running at http://localhost:3000`);
});