const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addStoreItem(req.body.title, req.body.description, req.body.price, req.body.urlImage)
        .then((storeItem) => {
            response.success(req, res, storeItem, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.post('/listStoreItem', (req, res) => {
    const filterStoreItem = req.query.idStoreItem || null
    controller.getStoreItem(filterStoreItem)
        .then((storeItem) => {
            response.success(req, res, storeItem, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateStoreItem(req.params.id, req.body.title, req.body.description, req.body.price, req.body.urlImage)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idStoreItem = req.params.id
    controller.deleteStoreItem(idStoreItem)
        .then((r) => {
            response.success(req, res, r, 200)
        })
        .catch((err) => {
            response.error(req, res, err, 500, err)
        })
})

module.exports = router