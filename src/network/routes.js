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


const routes = (app) => {
    app.use('/category', category)
    app.use('/user', user)
    app.use('/calendar', calendar)
    app.use('/configuration', configuration)
    app.use('/news', news)
    app.use('/storeitem', storeItem)
    app.use('/yourshopping', yourShopping)
    app.use('/funfacts', funFacts)
    app.use('/challenge', challenge)
    app.use('/funfactsuser', funFactsUser)

}

module.exports = routes
