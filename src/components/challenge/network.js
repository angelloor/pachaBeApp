const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')
const upload = require('../../utils/storage')

router.post('/', (req, res) => {
    controller.addChallenge(req.body.name, req.body.categoryId, req.body.description, req.body.reward, req.body.ambientalImpact)
        .then((challenge) => {
            response.success(req, res, challenge, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.post('/saveImage', upload.array('image', 3), (req, res) => {
    console.log('body', req.body);
    res.status(200).json({
        message: 'success!',
    });
    // controller.addChallenge(req.body.name, req.body.categoryId, req.body.description, req.body.reward, req.body.ambientalImpact)
    //     .then((challenge) => {
    //         response.success(req, res, challenge, 200)
    //     })
    //     .catch(e => {
    //         response.error(req, res, 'Error Interno', 500, e)
    //     })
})

router.get('/', (req, res) => {
    const filterChallenge = req.query.idChallenge || null
    controller.getChallenge(filterChallenge)
        .then((challenge) => {
            response.success(req, res, challenge, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateChallenge(req.params.id, req.body.name, req.body.categoryId, req.body.description, req.body.reward, req.body.ambientalImpact)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idChallenge = req.params.id
    controller.deleteChallenge(idChallenge)
        .then(() => {
            response.success(req, res, `Challengeio ${idChallenge} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router