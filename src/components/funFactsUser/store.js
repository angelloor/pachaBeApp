const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addFunFactsUser = (funFactsUser) => {
    const myFunFactsUser = new Model(funFactsUser)
    myFunFactsUser.save()
}

getFunFactsUser = async (filterFunFactsUser) => {
    let filter = {}
    if (filterFunFactsUser != null) {
        filter = { _id: filterFunFactsUser }
    }
    const FunFactsUser = await Model.find(filter)
    return FunFactsUser
}

updateFunFactsUser = async (idFunFactsUser, userId, funFactsId) => {
    const foundFunFactsUser = await Model.findOne({
        _id: idFunFactsUser
    })

    foundFunFactsUser.userId = userId
    foundFunFactsUser.funFactsId = funFactsId

    const newFunFactsUser = await foundFunFactsUser.save()
    return newFunFactsUser
}

deleteFunFactsUser = (idFunFactsUser) => {
    return Model.deleteOne({
        _id: idFunFactsUser
    })
}

module.exports = {
    addFunFactsUser,
    getFunFactsUser,
    updateFunFactsUser,
    deleteFunFactsUser
}