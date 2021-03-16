const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addChallenge = (challenge) => {
    const myChallenge = new Model(challenge)
    myChallenge.save()
}

getChallenge = async (filterChallenge) => {
    let filter = {}
    if (filterChallenge != null) {
        filter = { _id: filterChallenge }
    }
    const challenge = await Model.find(filter)
    return challenge
}

updateChallenge = async (idChallenge, name, categoryId, description, shortDescription, reward, ambientalImpact) => {
    const foundChallenge = await Model.findOne({
        _id: idChallenge
    })

    foundChallenge.name = name
    foundChallenge.categoryId = categoryId
    foundChallenge.description = description
    foundChallenge.shortDescription = shortDescription
    foundChallenge.reward = reward
    foundChallenge.ambientalImpact = ambientalImpact

    const newChallenge = await foundChallenge.save()
    return newChallenge
}

deleteChallenge = (idChallenge) => {
    return Model.deleteOne({
        _id: idChallenge
    })
}

module.exports = {
    addChallenge,
    getChallenge,
    updateChallenge,
    deleteChallenge
}