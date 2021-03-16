const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addFunFacts = (funFacts) => {
    const myFunFacts = new Model(funFacts)
    myFunFacts.save()
}

getFunFacts = async (filterFunFacts) => {
    let filter = {}
    if (filterFunFacts != null) {
        filter = { _id: filterFunFacts }
    }
    const FunFacts = await Model.find(filter)
    return FunFacts
}

updateFunFacts = async (idFunFacts, content) => {
    const foundFunFacts = await Model.findOne({
        _id: idFunFacts
    })

    foundFunFacts.content = content

    const newFunFacts = await foundFunFacts.save()
    return newFunFacts
}

deleteFunFacts = (idFunFacts) => {
    return Model.deleteOne({
        _id: idFunFacts
    })
}

module.exports = {
    addFunFacts,
    getFunFacts,
    updateFunFacts,
    deleteFunFacts
}