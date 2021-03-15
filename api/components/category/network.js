const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addCategory(req.body.name, req.body.colorPosition, req.body.imageUrl)
        .then((category) => {
            response.success(req, res, category, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e);
        })
})

router.get('/', (req, res) => {
    console.log(req.query.name)
    const filterCategory = req.query.name || null;
    controller.getCategory(filterCategory)
        .then((category) => {
            response.success(req, res, category, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e);
        })

})

router.patch('/:id', (req, res) => {
    controller.updateCategory(req.params.id, req.body.name, req.body.colorPosition, req.body.imageUrl)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err);
        })
})

router.delete('/:id', (req, res) => {
    let idCategory = req.params.id
    controller.deleteCategory(idCategory)
        .then(() => {
            response.success(req, res, `Categoria ${idCategory} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err);
        })
})


module.exports = router