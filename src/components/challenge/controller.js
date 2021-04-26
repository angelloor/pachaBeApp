const store = require("./store")
const LENGTHSHORTDESCRIPTION = 50
const storeChallengueUser = require("../challengeUser/store")
const storeUser = require("../user/store")
const fs = require("fs")

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

addChallengeUser = (idUser, idChallenge, newCoint, newExperience) => {
    return new Promise(async (resolve, reject) => {
        if (!idUser || !idChallenge || !newCoint || !newExperience) {
            reject({ message: 'Error Interno, consulte al soporte' })
            return false
        }

        const challengeUser = {
            challengeId: idChallenge,
            userId: idUser
        }

        const resultOne = await storeChallengueUser.addChallengeUser(challengeUser)

        if (!resultOne) {
            reject({ message: 'Ocurrió un error al guardar el reto' })
        } else {
            const resultTwo = await storeUser.changeReward(idUser, newCoint, newExperience)
            if (!resultTwo) {
                await storeChallengueUser.deleteChallengeUserByIdChallenge(idChallenge)
                const path = `./public/img/challengeUser/${idUser}/${idChallenge}.jpg`
                fs.unlinkSync(path)
                reject({ message: 'Ocurrió un error al aumentar tu experiencia y AmbientalsCoints' })
            } else {
                resolve({ message: 'ok' })
            }
        }
    })
}

module.exports = {
    addChallenge,
    getChallenge,
    updateChallenge,
    deleteChallenge,
    addChallengeUser
}