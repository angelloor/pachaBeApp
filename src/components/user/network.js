const express = require('express')
const router = express.Router()
const controllerUser = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    controllerUser.addUser(
        req.body.numberID,
        req.body.names,
        req.body.birdOfDate,
        req.body.email,
        req.body.phone,
        req.body.password,
        req.body.coint,
        req.body.experience,
        req.body.imageUrl,
    )
        .then((userAdd) => {
            response.success(req, res, userAdd, 200)
        })
        .catch(err => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (email == null || password == null) {
        response.error(req, res, 'Se necesita que se envie el correo y contraseña', 500, 'No se ha recibido las credenciales')
        return
    }
    controllerUser.loginUser(email, password)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(err => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.patch('/:id', (req, res) => {
    controllerUser.updateUser(
        req.params.id,
        req.body.numberID,
        req.body.names,
        req.body.birdOfDate,
        req.body.email,
        req.body.phone,
        req.body.password,
        req.body.coint,
        req.body.experience,
        req.body.imageUrl,
    )
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

router.delete('/:id', (req, res) => {
    let idUser = req.params.id
    controllerUser.deleteUser(idUser)
        .then(() => {
            response.success(req, res, `Usuario ${idUser} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err)
        })
})

module.exports = router