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

router.post('/changePassword', (req, res) => {
    const { user, passwordActually, passwordNew } = req.body
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    if (user == null || passwordActually == null || passwordNew == null) {
        response.error(req, res, 'Se necesita que se envie el usuario y contraseña a actualizar', 500, 'No se ha recibido los datos')
        return
    }
    controllerUser.changePassword(user, passwordActually, passwordNew)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(err => {
            response.error(req, res, err, 500, err)
        })
})

router.post('/changeCoint', (req, res) => {
    const { userId, newCoint } = req.body
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    if (userId == null || newCoint == null) {
        response.error(req, res, 'Se necesita que se envie el userId y el newCoint para actualizar', 500, 'No se ha recibido los datos')
        return
    }
    controllerUser.changeCoint(userId, newCoint)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(err => {
            response.error(req, res, err, 500, err)
        })
})

router.post('/changeExperience', (req, res) => {
    const { userId, newExperience } = req.body
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    if (userId == null || newExperience == null) {
        response.error(req, res, 'Se necesita que se envie el userId y el newExperience para actualizar', 500, 'No se ha recibido los datos')
        return
    }
    controllerUser.changeExperience(userId, newExperience)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(err => {
            response.error(req, res, err, 500, err)
        })
})

router.post('/changeReward', (req, res) => {
    const { userId, newCoint, newExperience } = req.body
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    if (userId == null || newCoint == null || newExperience == null) {
        response.error(req, res, 'Se necesita que se envie el userId, newCoint y el newExperience para actualizar', 500, 'No se ha recibido los datos')
        return
    }
    controllerUser.changeReward(userId, newCoint, newExperience)
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