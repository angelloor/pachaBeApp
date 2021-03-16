const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addTopics = (topics) => {
    const myTopics = new Model(topics)
    myTopics.save()
}

getTopics = async (filterTopics) => {
    let filter = {}
    if (filterTopics != null) {
        filter = { _id: filterTopics }
    }
    const topics = await Model.find(filter)
    return topics
}

updateTopics = async (idTopics, name, content, courseId, question, answers, correctAnswer, reward) => {
    const foundTopics = await Model.findOne({
        _id: idTopics
    })

    foundTopics.name = name
    foundTopics.content = content
    foundTopics.courseId = courseId
    foundTopics.question = question
    foundTopics.answers = answers
    foundTopics.correctAnswer = correctAnswer
    foundTopics.reward = reward

    const newTopics = await foundTopics.save()
    return newTopics
}

deleteTopics = (idTopics) => {
    return Model.deleteOne({
        _id: idTopics
    })
}

module.exports = {
    addTopics,
    getTopics,
    updateTopics,
    deleteTopics
}