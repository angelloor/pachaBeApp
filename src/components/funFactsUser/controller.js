const store = require("./store")

addFunFactsUser = (userId, funFactsId) => {
    return new Promise((resolve, reject) => {
        if (!userId || !funFactsId) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const funFactsUser = {
            userId,
            funFactsId,
        }

        store.addFunFactsUser(funFactsUser)
        resolve(funFactsUser)
    })
}

getFunFactsUser = (filterFunFactsUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.getFunFactsUser(filterFunFactsUser))

    })
}

updateFunFactsUser = (idFunFactsUser, userId, funFactsId) => {
    return new Promise(async (resolve, reject) => {
        if (!userId || !funFactsId) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const result = await store.updateFunFactsUser(idFunFactsUser, userId, funFactsId)
        resolve(result)
    })
}

deleteFunFactsUser = (idFunFactsUser) => {
    return new Promise((resolve, reject) => {
        if (!idFunFactsUser) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteFunFactsUser(idFunFactsUser)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addFunFactsUser,
    getFunFactsUser,
    updateFunFactsUser,
    deleteFunFactsUser
}