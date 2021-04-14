const store = require("./store")

addTopicsUser = (userId, topics) => {
    return new Promise((resolve, reject) => {
        if (!userId || !topics) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const topicsUser = {
            userId,
            topics
        }

        store.addTopicsUser(topicsUser)
        resolve(topicsUser)
    })

}

getTopicsUser = (filterTopicsUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.getTopicsUser(filterTopicsUser))
    })
}

updateTopicsUser = (idTopicsUser, userId, topics, status) => {
    return new Promise(async (resolve, reject) => {
        if (!idTopicsUser || !userId || !topics || !status) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const result = await store.updateTopicsUser(idTopicsUser, userId, topics, status)
        resolve(result)
    })
}

deleteTopicsUser = (idTopicsUser) => {
    return new Promise((resolve, reject) => {
        if (!idTopicsUser) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteTopicsUser(idTopicsUser)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addTopicsUser,
    getTopicsUser,
    updateTopicsUser,
    deleteTopicsUser
}