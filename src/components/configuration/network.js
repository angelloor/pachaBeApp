const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addConfiguration(req.body.dailyActivity, req.body.socialLinks, req.body.Links)
        .then((configuration) => {
            response.success(req, res, configuration, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    console.log(req.query.idConfiguration)
    const filterConfiguration = req.query.idConfiguration || null
    controller.getConfiguration(filterConfiguration)
        .then((configuration) => {
            response.success(req, res, configuration, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateConfiguration(req.params.id, req.body.dailyActivity, req.body.socialLinks, req.body.Links)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idConfiguration = req.params.id
    controller.deleteConfiguration(idConfiguration)
        .then(() => {
            response.success(req, res, `Configuration ${idConfiguration} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router