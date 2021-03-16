const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addFunFactsUser(req.body.userId, req.body.funFactsId)
        .then((funFactsUser) => {
            response.success(req, res, funFactsUser, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    const filterFunFactsUser = req.query.idFunFactsUser || null
    controller.getFunFactsUser(filterFunFactsUser)
        .then((funFactsUser) => {
            response.success(req, res, funFactsUser, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateFunFactsUser(req.params.id, req.body.userId, req.body.funFactsId)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idFunFactsUser = req.params.id
    controller.deleteFunFactsUser(idFunFactsUser)
        .then(() => {
            response.success(req, res, `FunFactsUserio ${idFunFactsUser} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router