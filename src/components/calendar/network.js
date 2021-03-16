const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addCalendar(req.body.dayText, req.body.dayCelebrate, req.body.isCelebrated, req.body.description, req.body.categoryId)
        .then((calendar) => {
            response.success(req, res, calendar, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    console.log(req.query.idCalendar)
    const filterCalendar = req.query.idCalendar || null
    controller.getCalendar(filterCalendar)
        .then((calendar) => {
            response.success(req, res, calendar, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateCalendar(req.params.id, req.body.dayText, req.body.dayCelebrate, req.body.isCelebrated, req.body.description, req.body.categoryId)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idCalendar = req.params.id
    controller.deleteCalendar(idCalendar)
        .then(() => {
            response.success(req, res, `Calendario ${idCalendar} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router