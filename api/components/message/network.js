const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response')

router.get('/', (req, res) => {
    const filterMessage = req.query.user || null;
    controller.getMessages(filterMessage)
        .then((messageList) => {
            response.success(req, res, messageList, 200)
        })
        .catch(e => {
            response.error(req, res, 'urlencoded eeror', 500, e);
        })
    // console.log(req.headers)
    // res.header({
    //     "custom-header": "header personalizado",
    // })
    // response.success(req, res, 'lista de mensajes', 201)
})

router.post('/', (req, res) => {
    controller.addMessage(req.query.user, req.query.message)
        .then((fullMessage) => {
            response.success(req, res, fullMessage, 200)
        })
        .catch(e => {
            response.error(req, res, 'urlencoded eeror', 500, e);
        })
    // console.log(req.query)
    // console.log(req.body)
    // if (req.query.error == 'ok') {
    //     response.error(req, res, 'Error Inesperado', 500, 'Es solo una simulación de los errores')
    // } else {
    //     res.status(300).send({ error: '', body: 'Creado correctamente' })
    // }
})

router.patch('/:id', (req, res) => {
    controller.updateMessage(req.params.id, req.body.message)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err);
        })
})

router.delete('/:id', (req, res) => {
    let idMessage = req.params.id
    controller.deleteMessage(idMessage)
        .then(() => {
            response.success(req, res, `Mensaje ${idMessage} Eliminado`, 200)
        })
        .catch((err) => {
            response.error(req, res, 'Error Interno', 500, err);
        })
})


module.exports = router