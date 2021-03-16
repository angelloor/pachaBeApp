const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addCourse(req.body.name, req.body.description, req.body.categoryId)
        .then((course) => {
            response.success(req, res, course, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    const filterCourse = req.query.idCourse || null
    controller.getCourse(filterCourse)
        .then((course) => {
            response.success(req, res, course, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateCourse(req.params.id, req.body.name, req.body.description, req.body.categoryId)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idCourse = req.params.id
    controller.deleteCourse(idCourse)
        .then(() => {
            response.success(req, res, `Curso ${idCourse} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router