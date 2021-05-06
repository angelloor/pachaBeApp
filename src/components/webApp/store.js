const Model = require('./model')
const db = require('../../network/db')
const ModelUser = require('../user/model')
const ModelTopicsUser = require('../topicsUser/model')
const ModelChallengeUser = require('../challengeUser/model')
const ModelYourShopping = require('../yourShopping/model')
const ModelCategory = require('../category/model')
const Age = require('../../utils/Age')
const AGEMAXPUBLIC = 15

db.Connect()

addUser = (user) => {
    const myUser = new Model(user)
    myUser.save()
}

updateUser = async (username, newPassword) => {
    const foundUser = await Model.findOne({ username: username })
    foundUser.password = newPassword
    const updateNew = await foundUser.save()
    return updateNew
}

getData = async (email) => {
    let data = {}
    data = await get(email)
    return data
}


get = async (emailUser) => {
    return new Promise(async (resolve, reject) => {
        if (emailUser != null) {
            filter = { email: emailUser }
        }
        const user = await ModelUser.findOne(filter).select({
            _id: 1,
            names: 1,
            birdOfDate: 1,
            coint: 1,
            experience: 1,
            imageUrl: 1,
            numberID: 1,
            email: 1,
            phone: 1,
            registerOfDate: 1
        })

        if (user == null) {
            reject('El usuario no esta registrado')
            return
        }

        const populateItemStore = { path: 'itemId', select: 'title description urlImage' }
        let yourShopping = await ModelYourShopping.find({ userId: user._id }).populate(populateItemStore)

        const { isBirthday, edad } = Age.getAge(user.birdOfDate)

        let content = []

        if (edad < AGEMAXPUBLIC) {
            let populateTopic = { path: 'topics', select: 'name imageTopic' }
            const topicsUser = await ModelTopicsUser.find({ userId: user._id }).populate(populateTopic)

            let element = {}
            for (let i = 0; i < topicsUser.length; i++) {
                element = {
                    _id: topicsUser[i]._id,
                    name: topicsUser[i].topics.name,
                    imageUrl: topicsUser[i].topics.imageTopic
                }
                content.push(element)
            }
        } else {
            let populateChallenge = { path: 'challengeId', select: 'name categoryId' }
            const challengeUser = await ModelChallengeUser.find({ userId: user._id }).select({
                _id: 1,
                imageUrl: 1,
                challengeId: 1,
            }).populate(populateChallenge)

            let element = {}
            for (let i = 0; i < challengeUser.length; i++) {
                const category = await ModelCategory.findOne({ _id: challengeUser[i].challengeId.categoryId }).select({
                    imageUrl: 1
                })
                element = {
                    _id: challengeUser[i]._id,
                    name: challengeUser[i].challengeId.name,
                    imageUrl: challengeUser[i].imageUrl,
                    imageCategory: category.imageUrl
                }
                content.push(element)
            }
        }

        const data = {
            user: {
                _id: user._id,
                names: user.names,
                birdOfDate: user.birdOfDate,
                age: edad,
                isBirthday: isBirthday,
                imageUrl: user.imageUrl,
                experience: user.experience,
                coint: user.coint,
                numberID: user.numberID,
                email: user.email,
                phone: user.phone,
                registerOfDate: user.registerOfDate,
            },
            content: content,
            yourShopping,
        }
        resolve(data)
    })
}

delivery = async (itemBuy, date) => {
    const foundItemBuy = await ModelYourShopping.findOne({ _id: itemBuy })

    foundItemBuy.deliveryDate = date
    foundItemBuy.deliveryStatus = true

    const updateNew = await foundItemBuy.save()
    return updateNew
}

returnDelivery = async (itemBuy) => {
    const foundItemBuy = await ModelYourShopping.findOne({ _id: itemBuy })

    foundItemBuy.deliveryDate = ""
    foundItemBuy.deliveryStatus = false

    const updateNew = await foundItemBuy.save()
    return updateNew
}

module.exports = {
    addUser,
    updateUser,
    getData,
    delivery,
    returnDelivery
}