const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get('/', (req, res) => {
    res.json({ message: "Bem-vindo ao servidor!" });
});

// login page route
app.get('/login', (req, res) => {
    res.json(true);
});

// set port, listen for requests
app.listen(3030, () => {
    console.log("Servidor rodando na porta 3030.");
});
