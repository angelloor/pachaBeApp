const db = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const Connect = () => {
    let connectStr = `mongodb+srv://${process.env.USERNAMEDB}:${process.env.PASSWORD}@devpacha.s5qbu.mongodb.net/${process.env.DB}`
    try {
        db.Promise = global.Promise
        db.connect(connectStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    } catch (error) {
        console.log('ocurrio un error: ', error)
    }
}

const Close = function () {
    try {
        db.disconnect()
    } catch (error) {
        console.log('ocurrio un error: ', error)
    }
}

module.exports = {
    Connect,
    Close
}
