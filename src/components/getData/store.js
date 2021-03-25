const db = require('../../network/db')
const ModelUser = require('../user/model')
const ModelCourse = require('../course/model')
const ModelChallenge = require('../challenge/model')
const ModelStoreItem = require('../storeItem/model')
const ModelCalendar = require('../calendar/model')
const ModelTopics = require('../topics/model')
const ModelNews = require('../news/model')
const ModelConfiguration = require('../configuration/model')
const Age = require('../../utils/Age')
const AGEMAXPUBLIC = 15

db.Connect()

getData = async (emailUser) => {
    if (emailUser != null) {
        filter = { email: emailUser }
    }
    const user = await ModelUser.findOne(filter).select({
        _id: 1,
        names: 1,
        birdOfDate: 1,
        coint: 1,
        experience: 1,
        imageUrl: 1
    })

    const { isBirthday, edad } = Age.getAge(user.birdOfDate)

    let courses = []
    let content = []

    let populateCategory = { path: 'categoryId', select: 'colorPosition imageUrl' }

    if (edad < AGEMAXPUBLIC) {
        courses = await ModelCourse.find().populate(populateCategory)

        let topics = []
        let course = {}
        for (let i = 0; i < courses.length; i++) {
            topics = await ModelTopics.find({ courseId: courses[i]._id })
            course = {
                name: courses[i].name,
                description: courses[i].description,
                colorPosition: courses[i].categoryId.colorPosition,
                imageUrl: courses[i].categoryId.imageUrl,
                topic: topics
            }

            content.push(course)
        }
    } else {
        content = await ModelChallenge.find().populate(populateCategory)
    }

    const storeItem = await ModelStoreItem.find()

    const calendar = await ModelCalendar.find().populate(populateCategory)
    const news = await ModelNews.find()
    const configuration = await ModelConfiguration.find()

    const data = {
        user: {
            _id: user._id,
            names: user.names,
            birdOfDate: user.birdOfDate,
            age: edad,
            isBirthday: isBirthday,
            imageUrl: user.imageUrl,
            experience: user.experience,
            coint: user.coint
        },
        content: content,
        storeItem,
        calendar,
        news,
        configuration
    }
    return data
}

module.exports = {
    getData
}