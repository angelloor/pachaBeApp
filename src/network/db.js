const db = require('mongoose')

const Connect = () => {
    let connectStr = `mongodb://localhost:27017/pachaapp`

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
