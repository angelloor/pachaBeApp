const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addYourShopping(req.body.itemId, req.body.userId)
        .then((yourShopping) => {
            response.success(req, res, yourShopping, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    const filterYourShopping = req.query.idYourShopping || null
    controller.getYourShopping(filterYourShopping)
        .then((yourShopping) => {
            response.success(req, res, yourShopping, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateYourShopping(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idYourShopping = req.params.id
    controller.deleteYourShopping(idYourShopping)
        .then(() => {
            response.success(req, res, `YourShoppingio ${idYourShopping} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router