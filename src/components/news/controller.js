const store = require("./store")
const LENGTHSHORTDESCRIPTION = 50
const nowDate = require('../../utils/Date')

addNews = (title, description, imageUrl, nameButton, linkButton) => {
    return new Promise((resolve, reject) => {
        if (!title || !description || !imageUrl) {
            reject("No se ha recibido todos los datos")
            return false
        }
        const date = nowDate.getFullDate()

        console.log(date)

        let shortDescription = description.slice(0, 49)

        if (description.length >= LENGTHSHORTDESCRIPTION) {
            shortDescription = `${shortDescription}...`
        }

        const news = {
            title,
            description,
            shortDescription: shortDescription,
            datePublished: date,
            imageUrl,
            nameButton,
            linkButton
        }

        store.addNews(news)
        resolve(news)
    })
}

getNews = (filterNews) => {
    return new Promise((resolve, reject) => {
        resolve(store.getNews(filterNews))
    })
}

updateNews = (idNews, title, description, imageUrl) => {
    return new Promise(async (resolve, reject) => {
        if (!idNews || !title || !description || !imageUrl) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const date = nowDate.getDate()

        let shortDescription = description.slice(0, 49)

        if (description.length >= LENGTHSHORTDESCRIPTION) {
            shortDescription = `${shortDescription}...`
        }

        const result = await store.updateNews(idNews, title, description, shortDescription, date, imageUrl)
        resolve(result)
    })
}

deleteNews = (idNews) => {
    return new Promise((resolve, reject) => {
        if (!idNews) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteNews(idNews)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addNews,
    getNews,
    updateNews,
    deleteNews
}