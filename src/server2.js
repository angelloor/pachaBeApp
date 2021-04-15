const express = require('express')
const fs = require('fs')
const https = require('https')
var app = express()

// if (process.env.NODE_ENV !== 'production') {
//     require('dotenv').config()
// }

// const port = process.env.PORT || 5000

const port = 443

const routes = require('./network/routes')

https.createServer({
    cert: fs.readFileSync('src/server.crt'),
    key: fs.readFileSync('src/server.key')
}, app).listen(port, () => {
    console.log(`La aplicación esta escuchando en https://localhost:${port}`)
})

app.use('/src', express.static('./public'))

app.get('/', (req, res) => {
    console.log(req)
    res.send('hola estas en la pagina pricipal')
    console.log('se recibio una peticio get')
})

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// routes(app)
