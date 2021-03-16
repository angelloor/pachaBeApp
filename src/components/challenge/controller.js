const store = require("./store")
const LENGTHSHORTDESCRIPTION = 50

addChallenge = (name, categoryId, description, reward, ambientalImpact) => {
    return new Promise((resolve, reject) => {
        if (!name || !categoryId || !description || !reward || !ambientalImpact) {
            reject("No se ha recibido todos los datos")
            return false
        }

        let shortDescription = description.slice(0, 49)

        if (description.length >= LENGTHSHORTDESCRIPTION) {
            shortDescription = `${shortDescription}...`
        }

        const challenge = {
            name,
            categoryId,
            description,
            shortDescription,
            reward,
            ambientalImpact
        }

        store.addChallenge(challenge)
        resolve(challenge)
    })

}

getChallenge = (filterChallenge) => {
    return new Promise((resolve, reject) => {
        resolve(store.getChallenge(filterChallenge))
    })
}

updateChallenge = (idChallenge, name, categoryId, description, reward, ambientalImpact) => {
    return new Promise(async (resolve, reject) => {
        if (!idChallenge || !name || !categoryId || !description || !reward || !ambientalImpact) {
            reject("No se ha recibido todos los datos")
            return false
        }

        let shortDescription = description.slice(0, 49)

        if (description.length >= LENGTHSHORTDESCRIPTION) {
            shortDescription = `${shortDescription}...`
        }

        const result = await store.updateChallenge(idChallenge, name, categoryId, description, shortDescription, reward, ambientalImpact)
        resolve(result)
    })
}

deleteChallenge = (idChallenge) => {
    return new Promise((resolve, reject) => {
        if (!idChallenge) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteChallenge(idChallenge)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addChallenge,
    getChallenge,
    updateChallenge,
    deleteChallenge
}