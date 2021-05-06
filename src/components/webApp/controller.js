const store = require('./store')
const Model = require('./model')
const ModelUser = require('../user/model')
const ModelYourShopping = require('../yourShopping/model')
const nowDate = require('../../utils/Date')
const ModelNews = require('../news/model')
const LENGTHSHORTDESCRIPTION = 50
const ModelStoreItem = require('../storeItem/model')

addUser = (username, password) => {
    return new Promise(async (resolve, reject) => {
        if (!username || !password) {
            reject("No se ha recibido todos los datos")
            return false
        }

        filter = { username: username }
        const userFilter = await Model.find(filter)

        if (userFilter.length >= 1) {
            reject("El usuario existente")
            return
        }

        const userAdd = {
            username,
            password
        }

        store.addUser(userAdd)
        resolve(userAdd)
    })
}

updateUser = (username, password, newPassword) => {
    return new Promise(async (resolve, reject) => {
        if (!username || !password || !newPassword) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const foundUser = await Model.findOne({ username: username })

        if (!foundUser) {
            reject("el usuario no existe")
            return false
        }

        if (foundUser.password != password) {
            reject("la contraseña actual es incorrecta")
            return false
        }

        const result = await store.updateUser(username, newPassword)
        resolve(result)
    })
}

loginUser = (username, password) => {
    return new Promise(async (resolve, reject) => {
        const user = await Model.findOne({ username: username })
        if (!user) {
            reject('El usuario no existe')
            return
        }
        if (user.password != password) {
            reject('Contraseña incorrecta')
            return
        }
        if (user.username == username && user.password == password) {
            resolve('Ok')
        }
    })
}

getUsers = () => {
    return new Promise(async (resolve, reject) => {
        const users = await ModelUser.find()
        resolve(users)
    })
}

getData = (idUser) => {
    return new Promise(async (resolve, reject) => {
        let user
        try {
            user = await ModelUser.findOne({ _id: idUser.toString() })
        } catch (error) {
            reject(error)
        }
        resolve(store.getData(user.email))
    })
}

delivery = (itemBuy) => {
    return new Promise(async (resolve, reject) => {
        if (!itemBuy) {
            reject("No se ha recibido el item de compra")
            return false
        }

        const foundItemBuy = await ModelYourShopping.findOne({ _id: itemBuy })
        const date = nowDate.getDate()

        if (!foundItemBuy) {
            reject("el item de compra no existe")
            return false
        }

        const result = await store.delivery(itemBuy, date)
        resolve(result)
    })
}

returnDelivery = (itemBuy) => {
    return new Promise(async (resolve, reject) => {
        if (!itemBuy) {
            reject("No se ha recibido el item de compra")
            return false
        }

        const foundItemBuy = await ModelYourShopping.findOne({ _id: itemBuy })

        if (!foundItemBuy) {
            reject("el item de compra no existe")
            return false
        }

        const result = await store.returnDelivery(itemBuy)
        resolve(result)
    })
}

updateNewsSI = (id, title, description, nameBtn, url) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !title || !description || !nameBtn || !url) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const foundNews = await ModelNews.findOne({
            _id: id
        })

        const date = nowDate.getDate()

        let shortDescription = description.slice(0, 49)

        if (description.length >= LENGTHSHORTDESCRIPTION) {
            shortDescription = `${shortDescription}...`
        }

        foundNews.title = title
        foundNews.description = description
        foundNews.shortDescription = shortDescription
        foundNews.datePublished = date
        foundNews.nameButton = nameBtn
        foundNews.linkButton = url

        const newNews = await foundNews.save()
        resolve(newNews)
    })
}

updateNewsCI = (id, title, description, nameBtn, url) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !title || !description || !nameBtn || !url) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const foundNews = await ModelNews.findOne({
            _id: id
        })

        const date = nowDate.getDate()

        let shortDescription = description.slice(0, 49)

        if (description.length >= LENGTHSHORTDESCRIPTION) {
            shortDescription = `${shortDescription}...`
        }

        foundNews.title = title
        foundNews.description = description
        foundNews.shortDescription = shortDescription
        foundNews.datePublished = date
        foundNews.nameButton = nameBtn
        foundNews.linkButton = url
        foundNews.imageUrl = `/img/news/${id}.jpg`


        const newNews = await foundNews.save()
        resolve({ newNews, id })
    })
}

updateNewsSIStoreItem = (id, name, description, price) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !name || !description || !price) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const foundStoreItem = await ModelStoreItem.findOne({
            _id: id
        })

        foundStoreItem.title = name
        foundStoreItem.description = description
        foundStoreItem.price = price

        const newStoreItem = await foundStoreItem.save()
        resolve(newStoreItem)
    })
}

updateNewsCIStoreItem = (id, name, description, price) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !name || !description || !price) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const foundStoreItem = await ModelStoreItem.findOne({
            _id: id
        })

        foundStoreItem.title = name
        foundStoreItem.description = description
        foundStoreItem.price = price
        foundStoreItem.urlImage = `/img/storeItem/${id}.jpg`

        const newStoreItem = await foundStoreItem.save()
        resolve({ newStoreItem, id })
    })
}

module.exports = {
    addUser,
    updateUser,
    loginUser,
    getUsers,
    getData,
    delivery,
    returnDelivery,
    updateNewsSI,
    updateNewsCI,
    updateNewsSIStoreItem,
    updateNewsCIStoreItem
}