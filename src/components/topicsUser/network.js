const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addTopicsUser(req.body.userId, req.body.topics, req.body.status)
        .then((topicsUser) => {
            response.success(req, res, topicsUser, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    const filterTopicsUser = req.query.idTopicsUser || null
    controller.getTopicsUser(filterTopicsUser)
        .then((topicsUser) => {
            response.success(req, res, topicsUser, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateTopicsUser(req.params.id, req.body.userId, req.body.topics, req.body.status)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idTopicsUser = req.params.id
    controller.deleteTopicsUser(idTopicsUser)
        .then(() => {
            response.success(req, res, `TopicsUser ${idTopicsUser} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router