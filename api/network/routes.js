const category = require('../components/category/network')
const user = require('../components/user/network')
const calendar = require('../components/calendar/network')
const configuration = require('../components/configuration/network')

const routes = (app) => {
    app.use('/category', category);
    app.use('/user', user);
    app.use('/calendar', calendar);
    app.use('/configuration', configuration);
}

module.exports = routes
