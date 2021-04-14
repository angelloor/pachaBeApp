const db = require('../../network/db')
const ModelUser = require('../user/model')
const ModelCourse = require('../course/model')
const ModelTopicsUser = require('../topicsUser/model')
const ModelFunFacts = require('../funFacts/model')
const ModelFunFactsUser = require('../funFactsUser/model')
const ModelChallenge = require('../challenge/model')
const ModelStoreItem = require('../storeItem/model')
const ModelCategory = require('../category/model')
const ModelCalendar = require('../calendar/model')
const ModelTopics = require('../topics/model')
const ModelYourShopping = require('../yourShopping/model')
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

    const populateItemStore = { path: 'itemId', select: 'title description urlImage' }

    let yourShopping
    yourShopping = await ModelYourShopping.find({ userId: user._id }).populate(populateItemStore)
    {/* funFacts */ }
    const funFacts = await ModelFunFacts.find()
    const funFactsUser = await ModelFunFactsUser.find({ userId: user._id })

    let newArayFunFacts = []
    funFacts.map((item) => {
        newArayFunFacts.push((item._id).toString())
    })

    let newArayFunFactsUser = []
    funFactsUser.map((item) => {
        newArayFunFactsUser.push((item.funFactsId).toString())
    })

    var result = newArayFunFacts.filter(element => !newArayFunFactsUser.includes(element));
    const cantidaElementosArray = result.length

    console.log(`solo me quedan ${cantidaElementosArray} funfact para mostrar`)

    let positionElement
    let funFactsFinal
    if (cantidaElementosArray != 0) {
        do {
            positionElement = getRandomInt(0, cantidaElementosArray)
        } while (positionElement == cantidaElementosArray)

        const funFactsOpen = result[positionElement]
        funFactsFinal = await ModelFunFacts.findOne({ _id: funFactsOpen })
    } else {
        funFactsFinal = {}
    }

    {/* funFacts */ }

    const { isBirthday, edad } = Age.getAge(user.birdOfDate)

    let courses = []
    let content = []

    let populateCategory = { path: 'categoryId', select: 'colorPosition imageUrl' }

    const topicsUser = await ModelTopicsUser.find({ userId: user._id })
    let newArrayTipicsUser = []
    topicsUser.map((item) => {
        newArrayTipicsUser.push((item.topics).toString())
    })
    console.log(newArrayTipicsUser)

    if (edad < AGEMAXPUBLIC) {
        courses = await ModelCourse.find().populate(populateCategory)

        let topics = []
        let course = {}
        for (let i = 0; i < courses.length; i++) {
            topics = await ModelTopics.find({ courseId: courses[i]._id })

            topics.map((itemTopic, index) => {

                newArrayTipicsUser.map((itemTopicUser) => {
                    if (itemTopic._id == itemTopicUser) {
                        let element = topics[index]

                        console.log(element)
                        element = {
                            ...element,
                        }

                        // contentGeneral[indexOne].topic.splice(indexTwo, 1)
                        // contentGeneral[indexOne].topic.splice(indexTwo, 0, element)

                        // console.log('son iguales')
                    }
                })
            })

            // console.log(topics)
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
        configuration,
        yourShopping,
        funFacts: funFactsFinal
    }
    return data
}

getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    getData
}