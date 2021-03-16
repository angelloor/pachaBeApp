const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controller.addChallengeUser(req.body.challengeId, req.body.userId)
        .then((challengeUser) => {
            response.success(req, res, challengeUser, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
})

router.get('/', (req, res) => {
    const filterChallengeUser = req.query.idChallengeUser || null
    controller.getChallengeUser(filterChallengeUser)
        .then((challengeUser) => {
            response.success(req, res, challengeUser, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })

})

router.patch('/:id', (req, res) => {
    controller.updateChallengeUser(req.params.id, req.body.challengeId, req.body.userId,)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idChallengeUser = req.params.id
    controller.deleteChallengeUser(idChallengeUser)
        .then(() => {
            response.success(req, res, `ChallengeUserio ${idChallengeUser} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router