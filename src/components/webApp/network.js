const express = require('express')
const router = express.Router()
const { uploadNew, uploadStoreItem } = require('../../utils/storage')
const controllerUser = require('./controller')
const response = require('../../network/response')
const { passImgNew } = require('../../utils/generateFolder')
const { addNews } = require('../news/controller')
const { addStoreItem } = require('../storeItem/controller')

router.post('/saveImageNew', uploadNew.single('image'), async (req, res) => {
    const linkTemporal = "/"
    addNews(req.body.title, req.body.description, linkTemporal, req.body.nameBtn, req.body.url)
        .then((news) => {
            passImgNew(news._id)
            response.success(req, res, news, 200)
        })
        .catch(e => {
            response.error(req, res, e, 500, e)
        })
})

router.post('/', (req, res) => {
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }

    controllerUser.addUser(req.body.username, req.body.password)
        .then((userAdd) => {
            response.success(req, res, userAdd, 200)
        })
        .catch(err => {
            response.error(req, res, err, 500, err)
        })
})

router.post('/changePassword', (req, res) => {
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    controllerUser.updateUser(req.body.username, req.body.password, req.body.newPassword)
        .then((response) => {
            response.success(req, res, response, 200)
        })
        .catch(err => {
            response.error(req, res, err, 500, err)
        })
})

router.post('/login', (req, res) => {
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    controllerUser.loginUser(req.body.username, req.body.password)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(err => {
            response.error(req, res, err, 400, err)
        })
})

//Listar los usuarios
router.get('/listUsers', (req, res) => {
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }

    controllerUser.getUsers()
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(err => {
            response.error(req, res, err, 400, err)
        })
})

//Traer datos de un usuario
router.post('/getData', (req, res) => {
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    controllerUser.getData(req.body._id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(err => {
            response.error(req, res, err, 400, err)
        })
})

//delivery 
router.post('/delivery', (req, res) => {
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    controllerUser.delivery(req.body.itemBuy)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(err => {
            response.error(req, res, err, 400, err)
        })
})

//return delivery 
router.post('/returnDelivery', (req, res) => {
    if (req.headers.token != '4C79A286C3ADE40D27696F617F94D646B7A38236FF385DF962EFAA9755BB2CBD') {
        response.error(req, res, 'Acceso denegado', 500, 'La password de la req es incorrecta')
        return
    }
    controllerUser.returnDelivery(req.body.itemBuy)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(err => {
            response.error(req, res, err, 400, err)
        })
})

//guardar sin imagenes
router.post('/saveSImage', (req, res) => {
    console.log(req.body)
    controllerUser.updateNewsSI(req.body.id, req.body.title, req.body.description, req.body.nameBtn, req.body.url)
        .then((news) => {
            response.success(req, res, news, 200)
        })
        .catch(e => {
            response.error(req, res, e, 500, e)
        })
})

//guardar con imagen
router.post('/saveCImage', uploadNew.single('image'), async (req, res) => {
    // const linkTemporal = "/"
    controllerUser.updateNewsCI(req.body.id, req.body.title, req.body.description, req.body.nameBtn, req.body.url)
        .then((news) => {
            passImgNew(news.id)
            response.success(req, res, news, 200)
        })
        .catch(e => {
            response.error(req, res, e, 500, e)
        })
})

//Store item
router.post('/saveImageStoreItem', uploadStoreItem.single('image'), async (req, res) => {
    const linkTemporal = "/"
    console.log(req.body)
    addStoreItem(req.body.name, req.body.description, req.body.price, linkTemporal)
        .then((storeItem) => {
            console.log(storeItem)
            passImgStoreItem(storeItem._id)
            response.success(req, res, storeItem, 200)
        })
        .catch(e => {
            response.error(req, res, e, 500, e)
        })
})

//guardar sin imagenes StoreItem
router.post('/saveSImageStoreItem', (req, res) => {
    console.log(req.body)
    controllerUser.updateNewsSIStoreItem(req.body.id, req.body.name, req.body.description, req.body.price)
        .then((news) => {
            response.success(req, res, news, 200)
        })
        .catch(e => {
            response.error(req, res, e, 500, e)
        })
})

//guardar con imagen StoreItem
router.post('/saveCImageStoreItem', uploadStoreItem.single('image'), async (req, res) => {
    controllerUser.updateNewsCIStoreItem(req.body.id, req.body.name, req.body.description, req.body.price)
        .then((storeItem) => {
            passImgStoreItem(storeItem.id)
            response.success(req, res, storeItem, 200)
        })
        .catch(e => {
            response.error(req, res, e, 500, e)
        })
})

module.exports = router