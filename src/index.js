const express = require('express')
// const https = require('https')
const http = require('http')
const fs = require('fs')
const routes = require('./network/routes')
const path = require("path")

var app = express()

const port = 3000

const credentials = {
    cert: fs.readFileSync(path.resolve("./public.crt")),
    key: fs.readFileSync(path.resolve("./private.key"))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', express.static('./public'))
routes(app)

// var httpsServer = https.createServer(credentials, app)
var httpServer = http.createServer(app)

httpServer.listen(port)
// httpsServer.listen(port)
console.log(`La aplicación esta escuchando en http://localhost:${port}`)








// const express = require('express')
// const fs = require('fs')
// const routes = require('./network/routes')
// const https = require('https')

// var app = express()

// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))
// app.use('/src', express.static('./public'))

// const port = 443
// const credentials = {
//     cert: fs.readFileSync('src/public.crt'),
//     key: fs.readFileSync('src/private.key')
// }

// var httpsServer = https.createServer(credentials, app)
// routes(httpsServer)

// httpsServer.listen(port)

// console.log(`La aplicación esta escuchando en http://localhost:${port}`)
