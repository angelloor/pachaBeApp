const store = require('./store')
const nowDate = require('../../utils/Date')
const Model = require('./model')

addUser = (numberID, names, birdOfDate, email, phone, password) => {
    return new Promise(async (resolve, reject) => {
        if (!numberID || !names || !birdOfDate || !email || !phone || !password) {
            reject("No se ha recibido todos los datos")
            return false
        }

        filter = { email: email }
        const userFilter = await Model.find(filter)
        console.log(userFilter.length);
        if (userFilter.length >= 1) {
            reject("El usuario existente")
            return
        }

        const date = nowDate.getDate()

        const userAdd = {
            numberID,
            names,
            birdOfDate,
            email,
            phone,
            password,
            registerOfDate: date
        }

        store.addUser(userAdd)
        resolve(userAdd)
    })
}

loginUser = (email, password) => {
    return new Promise(async (resolve, reject) => {
        const user = await Model.findOne({ email: email })
        if (!user) {
            reject('El usuario no existe')
            return
        }
        if (user.password != password) {
            reject('Contraseña incorrecta')
            return
        }
        resolve(store.loginUser(email, password))
    })
}

changePassword = (user, passwordActually, passwordNew) => {
    return new Promise(async (resolve, reject) => {
        const userConsulted = await Model.findOne({ _id: user })
        if (!userConsulted) {
            reject('El usuario no existe')
            return
        }
        if (!(userConsulted.password == passwordActually)) {
            reject('Contraseña actual incorrecta')
            return
        }
        const result = await store.updatePassword(user, passwordNew)
        resolve(result)

    })
}

changeCoint = (userId, newCoint) => {
    return new Promise(async (resolve, reject) => {
        const userConsulted = await Model.findOne({ _id: userId })
        console.log(userConsulted);
        if (!userConsulted) {
            reject('El usuario no existe')
            return
        }
        const result = await store.changeCoint(userId, newCoint)
        resolve(result)
    })
}

changeExperience = (userId, newExperience) => {
    return new Promise(async (resolve, reject) => {
        const userConsulted = await Model.findOne({ _id: userId })
        if (!userConsulted) {
            reject('El usuario no existe')
            return
        }
        const result = await store.changeExperience(userId, newExperience)
        resolve(result)

    })
}

changeReward = (userId, newCoint, newExperience) => {
    return new Promise(async (resolve, reject) => {
        const userConsulted = await Model.findOne({ _id: userId })
        if (!userConsulted) {
            reject('El usuario no existe')
            return
        }
        const result = await store.changeReward(userId, newCoint, newExperience)
        resolve(result)

    })
}

updateUser = (idUser, numberID, names, birdOfDate, email, phone, password, coint, experience, imageUrl) => {
    return new Promise(async (resolve, reject) => {
        if (!idUser || !numberID || !names || !birdOfDate || !email || !phone || !password || !coint || !experience || !imageUrl) {
            reject("No se ha recibido todos los datos")
            return false
        }
        const result = await store.updateUser(idUser, numberID, names, birdOfDate, email, phone, password, coint, experience, imageUrl)
        resolve(result)
    })
}

deleteUser = (userId) => {
    return new Promise((resolve, reject) => {
        if (!userId) {
            reject("No se ha recibido el id del usuario")
            return false
        }
        store.deleteUser(userId)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addUser,
    loginUser,
    updateUser,
    deleteUser,
    changePassword,
    changeCoint,
    changeExperience,
    changeReward
}