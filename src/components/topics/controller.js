const store = require("./store")

addTopics = (name, content, courseId, question, answers, correctAnswer, reward, imageTopic) => {
    return new Promise((resolve, reject) => {
        if (!name || !content || !courseId || !question || !answers || !correctAnswer || !reward || !imageTopic) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const topics = {
            name,
            content,
            courseId,
            question,
            answers,
            correctAnswer,
            reward,
            imageTopic
        }

        store.addTopics(topics)
        resolve(topics)
    })
}

getTopics = (filterTopics) => {
    return new Promise((resolve, reject) => {
        resolve(store.getTopics(filterTopics))
    })
}

updateTopics = (idTopics, name, content, courseId, question, answers, correctAnswer, reward) => {
    return new Promise(async (resolve, reject) => {
        if (!idTopics || !name || !content || !courseId || !question || !answers || !correctAnswer || !reward) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const result = await store.updateTopics(idTopics, name, content, courseId, question, answers, correctAnswer, reward)
        resolve(result)
    })
}

deleteTopics = (idTopics) => {
    return new Promise((resolve, reject) => {
        if (!idTopics) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteTopics(idTopics)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addTopics,
    getTopics,
    updateTopics,
    deleteTopics
}