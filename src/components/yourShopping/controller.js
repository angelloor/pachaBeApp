const store = require("./store")
const nowDate = require('../../utils/Date')
const ModelUser = require('../user/model')

addYourShopping = (itemId, userId, price) => {
    return new Promise(async (resolve, reject) => {
        if (!itemId || !userId) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const date = nowDate.getDate()

        const yourShopping = {
            itemId,
            userId,
            shoppingDate: date,
        }

        //actualizar AmbientalCoint
        const userFind = await ModelUser.findOne({
            _id: userId
        })

        userFind.coint = userFind.coint - price

        const updateCount = await userFind.save()

        console.log(updateCount)

        store.addYourShopping(yourShopping)
        resolve(yourShopping)
    })
}


updateYourShopping = (idYourShopping) => {
    return new Promise(async (resolve, reject) => {
        if (!idYourShopping) {
            reject("No se ha recibido ningun id")
            return false
        }

        const date = nowDate.getDate()

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