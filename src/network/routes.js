const category = require('../components/category/network')
const user = require('../components/user/network')
const calendar = require('../components/calendar/network')
const configuration = require('../components/configuration/network')
const news = require('../components/news/network')
const storeItem = require('../components/storeItem/network')
const yourShopping = require('../components/yourShopping/network')
const funFacts = require('../components/funFacts/network')
const challenge = require('../components/challenge/network')
const funFactsUser = require('../components/funFactsUser/network')
const challengeUser = require('../components/challengeUser/network')
const course = require('../components/course/network')
const topics = require('../components/topics/network')
const topicsUser = require('../components/topicsUser/network')
const getData = require('../components/getData/network')
const webApp = require('../components/webApp/network')

const routes = (app) => {
    app.use('/category', category)
    app.use('/user', user)
    app.use('/calendar', calendar)
    app.use('/configuration', configuration)
    app.use('/news', news)
    app.use('/storeItem', storeItem)
    app.use('/yourShopping', yourShopping)
    app.use('/funFacts', funFacts)
    app.use('/challenge', challenge)
    app.use('/funFactsUser', funFactsUser)
    app.use('/challengeUser', challengeUser)
    app.use('/course', course)
    app.use('/topics', topics)
    app.use('/topicsUser', topicsUser)
    app.use('/getData', getData)

    //webApp
    app.use('/webApp', webApp)


}

module.exports = routes
