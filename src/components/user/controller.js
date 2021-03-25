const store = require('./store')
const nowDate = require('../../utils/Date')

addUser = (numberID, names, birdOfDate, email, phone, password, coint, experience, imageUrl) => {
    return new Promise((resolve, reject) => {
        if (!numberID || !names || !birdOfDate || !email || !phone || !password || !coint || !experience || !imageUrl) {
            reject("No se ha recibido todos los datos")
            return false
        }
        const date = nowDate.getDate()

        const userAdd = {
            numberID,
            names,
            birdOfDate,
            email,
            phone,
            password,
            registerOfDate: date,
            coint,
            experience,
            imageUrl,
        }

        store.addUser(userAdd)
        resolve(userAdd)
    })
}

loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        resolve(store.loginUser(email, password))
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
}