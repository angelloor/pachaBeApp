const store = require("./store")

addChallengeUser = (challengeId, userId) => {
    return new Promise((resolve, reject) => {
        if (!challengeId || !userId) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const challengeUser = {
            challengeId,
            userId
        }

        store.addChallengeUser(challengeUser)
        resolve(challengeUser)
    })

}

getChallengeUser = (filterChallengeUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.getChallengeUser(filterChallengeUser))
    })
}

updateChallengeUser = (idChallengeUser, challengeId, userId) => {
    return new Promise(async (resolve, reject) => {
        if (!idChallengeUser || !challengeId || !userId) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const result = await store.updateChallengeUser(idChallengeUser, challengeId, userId)
        resolve(result)
    })
}

deleteChallengeUser = (idChallengeUser) => {
    return new Promise((resolve, reject) => {
        if (!idChallengeUser) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteChallengeUser(idChallengeUser)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addChallengeUser,
    getChallengeUser,
    updateChallengeUser,
    deleteChallengeUser
}