const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addNews(req.body.title, req.body.description, req.body.imageUrl)
        .then((news) => {
            response.success(req, res, news, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    console.log(req.query.idNews)
    const filterNews = req.query.idNews || null
    controller.getNews(filterNews)
        .then((news) => {
            response.success(req, res, news, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateNews(req.params.id, req.body.title, req.body.description, req.body.imageUrl)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idNews = req.params.id
    controller.deleteNews(idNews)
        .then(() => {
            response.success(req, res, `News ${idNews} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router