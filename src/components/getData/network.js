const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.get('/', (req, res) => {
    const emailUser = req.body.email || null
    if (!emailUser) {
        response.error(req, res, 'No se ha recibido el email', 500, 'No se ha recibido el email')
        return
    }
    controller.getData(emailUser)
        .then((news) => {
            response.success(req, res, news, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

module.exports = router