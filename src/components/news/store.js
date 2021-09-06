const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addNews = (news) => {
    const myNews = new Model(news)
    myNews.save()
}

getNews = async (filterNews) => {
    let filter = {}
    if (filterNews != null) {
        filter = { _id: filterNews }
    }

    const news = await Model.find(filter).sort([['datePublished', -1]])
    return news
}

updateNews = async (idNews, title, description, shortDescription, date, imageUrl) => {
    const foundNews = await Model.findOne({
        _id: idNews
    })

    foundNews.title = title
    foundNews.description = description
    foundNews.shortDescription = shortDescription
    foundNews.datePublished = date
    foundNews.imageUrl = imageUrl

    const newNews = await foundNews.save()
    return newNews
}

deleteNews = (idNews) => {
    return Model.deleteOne({
        _id: idNews
    })
}

updateUrl = async (imageUrl) => {
    const foundNews = await Model.findOne({
        imageUrl: imageUrl
    })

    foundNews.imageUrl = `/img/news/${foundNews._id}.jpg`

    const newNews = await foundNews.save()
    return newNews
}

module.exports = {
    addNews,
    getNews,
    updateNews,
    deleteNews,
    updateUrl
}