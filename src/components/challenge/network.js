const express = require('express')
const router = express.Router()
const controller = require('./controller')
const response = require('../../network/response')
const { uploadChallengeUser } = require('../../utils/storage')
const { generateFolder, passImg } = require('../../utils/generateFolder')

router.post('/saveImage', uploadChallengeUser.single('photoChallengue'), async (req, res) => {
    await generateFolder(req.body.idUser)
    await passImg(req.body.idUser, req.body.idChallenge)

    console.log(req.body)

    controller.addChallengeUser(req.body.idUser, req.body.idChallenge, req.body.newCoint, req.body.newExperience)
        .then((challenge) => {
            response.success(req, res, challenge.message, 200)
        })
        .catch(e => {
            response.error(req, res, e.message, 500, e)
        })
})

router.post('/', (req, res) => {
    controller.addChallenge(req.body.name, req.body.categoryId, req.body.description, req.body.reward, req.body.ambientalImpact)
        .then((challenge) => {
            response.success(req, res, challenge, 200)
        })
        .catch(e => {
            response.error(req, res, 'Error Interno', 500, e)
        })
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