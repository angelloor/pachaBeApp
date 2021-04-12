const db = require('../../network/db')
const ModelUser = require('../user/model')
const ModelCourse = require('../course/model')
const ModelChallenge = require('../challenge/model')
const ModelStoreItem = require('../storeItem/model')
const ModelCategory = require('../category/model')
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
                _id: courses[i]._id,
                name: courses[i].name,
                description: courses[i].description,
                categoryId: courses[i].categoryId,
                topic: topics
            }

            content.push(course)
        }
    } else {
        challenges = await ModelChallenge.find()

        const arrayCategory = []
        challenges.map((item) => {
            if (!(arrayCategory.includes((item.categoryId).toString()))) {
                arrayCategory.push((item.categoryId).toString())
            }
        })
        let element = {}
        for (let i = 0; i < arrayCategory.length; i++) {

            categoryChallenge = await ModelCategory.find({ _id: arrayCategory[i] }).select({
                _id: 1,
                name: 1,
                colorPosition: 1,
                imageUrl: 1
            })

            console.log(categoryChallenge);

            challengue = await ModelChallenge.find({ categoryId: arrayCategory[i] }).select({
                _id: 1,
                name: 1,
                description: 1,
                shortDescription: 1,
                ambientalImpact: 1,
                reward: 1
            })
            element = {
                _id: categoryChallenge[0]._id,
                name: categoryChallenge[0].name,
                categoryId: {
                    colorPosition: categoryChallenge[0].colorPosition,
                    imageUrl: categoryChallenge[0].imageUrl
                },
                challengue
            }
            content.push(element)
        }
    }

    const storeItem = await ModelStoreItem.find()

    const calendar = await ModelCalendar.find().populate(populateCategory)
    const news = await ModelNews.find().sort([['datePublished', -1]])
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