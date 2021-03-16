const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addFunFacts(req.body.content)
        .then((funFacts) => {
            response.success(req, res, funFacts, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    console.log(req.query.idFunFacts)
    const filterFunFacts = req.query.idFunFacts || null
    controller.getFunFacts(filterFunFacts)
        .then((funFacts) => {
            response.success(req, res, funFacts, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateFunFacts(req.params.id, req.body.content)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idFunFacts = req.params.id
    controller.deleteFunFacts(idFunFacts)
        .then(() => {
            response.success(req, res, `funFactsio ${idFunFacts} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router