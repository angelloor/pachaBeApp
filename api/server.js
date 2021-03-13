const express = require('express');

const routes = require('./network/routes')

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/src', express.static('./public'));

routes(app)

app.listen(3000)
console.log('La aplicación esta escuchando en http://localhost:3000')