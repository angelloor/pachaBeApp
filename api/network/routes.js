const message = require('../components/message/network')

const routes = (app) => {
    app.use('/message', message);
}

module.exports = routes
