const store = require("./store")
const nowDate = require('../../utils/Date')

addYourShopping = (itemId, userId) => {
    return new Promise((resolve, reject) => {
        if (!itemId || !userId) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const date = nowDate()

        const yourShopping = {
            itemId,
            userId,
            shoppingDate: date,
        }

        store.addYourShopping(yourShopping)
        resolve(yourShopping)
    })
}

getYourShopping = (filterYourShopping) => {
    return new Promise((resolve, reject) => {
        resolve(store.getYourShopping(filterYourShopping))
    })
}

updateYourShopping = (idYourShopping) => {
    return new Promise(async (resolve, reject) => {
        if (!idYourShopping) {
            reject("No se ha recibido ningun id")
            return false
        }

        const date = nowDate()

        const result = await store.updateYourShopping(idYourShopping, date)
        resolve(result)
    })
}

deleteYourShopping = (idYourShopping) => {
    return new Promise((resolve, reject) => {
        if (!idYourShopping) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteYourShopping(idYourShopping)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addYourShopping,
    getYourShopping,
    updateYourShopping,
    deleteYourShopping
}