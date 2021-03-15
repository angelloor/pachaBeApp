const express = require('express');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const port = process.env.PORT || 5000

const routes = require('./network/routes')
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/src', express.static('./public'));

routes(app)

app.listen(port)
console.log('La aplicación esta escuchando en http://localhost:3000')