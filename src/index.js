const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const routes = require('./network/routes')
const path = require("path")
var app = express()
const cors = require('cors')

let port

if (process.env.NODE_ENV == 'production') {
    port = 443
    const credentials = {
        cert: fs.readFileSync(path.resolve("./public.crt")),
        key: fs.readFileSync(path.resolve("./private.key"))
    }

    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({ extended: false }))
    app.use('/', express.static('./public'))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(path.resolve('./'), 'public/index.html'), (err) => {
            if (err) {
                res.status(500).send(err)
            }
        })
    })

    routes(app)

    var httpsServer = https.createServer(credentials, app)
    httpsServer.listen(port)
    console.log(`La aplicación esta escuchando en https://localhost:${port}`)

} else {
    const port = process.env.PORT || 5000

    require('dotenv').config()

    app.use(express.json())
    app.use(cors())
    app.use(express.urlencoded({ extended: false }))
    app.use('/', express.static('./public'))

    app.get('/*', (req, res) => {
        res.sendFile(path.join(path.resolve('./'), 'public/index.html'), (err) => {
            if (err) {
                res.status(500).send(err)
            }
        })
    })

    routes(app)

    var httpServer = http.createServer(app)
    httpServer.listen(port)
    console.log(`La aplicación esta escuchando en http://localhost:${port}`)

}