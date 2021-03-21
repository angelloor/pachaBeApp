const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addTopicsUser = (topicsUser) => {
    const myTopicsUser = new Model(topicsUser)
    myTopicsUser.save()
}

getTopicsUser = async (filterTopicsUser) => {
    let filter = {}
    if (filterTopicsUser != null) {
        filter = { _id: filterTopicsUser }
    }
    const topicsUser = await Model.find(filter)
    return topicsUser
}

updateTopicsUser = async (idTopicsUser, userId, topics, status) => {
    const foundTopicsUser = await Model.findOne({
        _id: idTopicsUser
    })

    foundTopicsUser.userId = userId
    foundTopicsUser.topics = topics
    foundTopicsUser.status = status

    const newTopicsUser = await foundTopicsUser.save()
    return newTopicsUser
}

deleteTopicsUser = (idTopicsUser) => {
    return Model.deleteOne({
        _id: idTopicsUser
    })
}

module.exports = {
    addTopicsUser,
    getTopicsUser,
    updateTopicsUser,
    deleteTopicsUser
}