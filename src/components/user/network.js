const express = require('express')
const router = express.Router()
const controllerUser = require('./controller')
const response = require('../../network/response')

router.post('/', (req, res) => {
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    controllerUser.addUser(
        req.body.idNumber,
        req.body.Names,
        req.body.dateOfBirth,
        req.body.Email,
        req.body.phone,
        req.body.password
    )
        .then((userAdd) => {
            response.success(req, res, userAdd, 200)
        })
        .catch(err => {
            response.error(req, res, err, 500, err)
        })
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    if (email == null || password == null) {
        response.error(req, res, 'Se necesita que se envie el correo y contraseña', 500, 'No se ha recibido las credenciales')
        return
    }
    controllerUser.loginUser(email, password)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(err => {
            response.error(req, res, err, 500, err)
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