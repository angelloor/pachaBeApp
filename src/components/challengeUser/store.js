const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addChallengeUser = async (challengeUser) => {
    const myChallengeUser = new Model(challengeUser)
    const result = await myChallengeUser.save()
    return result
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

deleteChallengeUserByIdChallenge = (idChallengeUser) => {
    return Model.deleteOne({
        challengeId: idChallengeUser
    })
}

module.exports = {
    addChallengeUser,
    getChallengeUser,
    updateChallengeUser,
    deleteChallengeUser,
    deleteChallengeUserByIdChallenge
}