const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addStoreItem(req.body.title, req.body.description, req.body.price, req.body.urlImage)
        .then((storeItem) => {
            response.success(req, res, storeItem, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e);
        })
})

router.get('/', (req, res) => {
    console.log(req.query.idStoreItem)
    const filterStoreItem = req.query.idStoreItem || null;
    controller.getStoreItem(filterStoreItem)
        .then((storeItem) => {
            response.success(req, res, storeItem, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e);
        })

})

router.patch('/:id', (req, res) => {
    controller.updateStoreItem(req.params.id, req.body.title, req.body.description, req.body.price, req.body.urlImage)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err);
        })
})

router.delete('/:id', (req, res) => {
    let idStoreItem = req.params.id
    controller.deleteStoreItem(idStoreItem)
        .then(() => {
            response.success(req, res, `storeItem ${idStoreItem} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err);
        })
})



module.exports = router