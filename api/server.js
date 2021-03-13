const express = require('express');
const bodyParser = require('body-parser')

const routes = require('./network/routes')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('/public'));

routes(app)

app.listen(3000)
console.log('La aplicación esta escuchando en http://localhost:3000')