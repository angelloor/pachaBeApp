const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addChallengeUser = (challengeUser) => {
    const myChallengeUser = new Model(challengeUser)
    myChallengeUser.save()
}

getChallengeUser = async (filterChallengeUser) => {
    let filter = {}
    if (filterChallengeUser != null) {
        filter = { _id: filterChallengeUser }
    }
    const challengeUser = await Model.find(filter)
    return challengeUser
}

updateChallengeUser = async (idChallengeUser, challengeId, userId) => {
    const foundChallengeUser = await Model.findOne({
        _id: idChallengeUser
    })

    foundChallengeUser.challengeId = challengeId
    foundChallengeUser.userId = userId

    const newChallengeUser = await foundChallengeUser.save()
    return newChallengeUser
}

deleteChallengeUser = (idChallengeUser) => {
    return Model.deleteOne({
        _id: idChallengeUser
    })
}

module.exports = {
    addChallengeUser,
    getChallengeUser,
    updateChallengeUser,
    deleteChallengeUser
}