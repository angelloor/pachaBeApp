const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addTopics(req.body.name, req.body.content, req.body.courseId, req.body.question, req.body.answers, req.body.correctAnswer, req.body.reward, req.body.imageTopic)
        .then((topics) => {
            response.success(req, res, topics, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    const filterTopics = req.query.idTopics || null
    controller.getTopics(filterTopics)
        .then((topics) => {
            response.success(req, res, topics, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateTopics(req.params.id, req.body.name, req.body.content, req.body.courseId, req.body.question, req.body.answers, req.body.correctAnswer, req.body.reward)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idTopics = req.params.id
    controller.deleteTopics(idTopics)
        .then(() => {
            response.success(req, res, `Topics ${idTopics} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router