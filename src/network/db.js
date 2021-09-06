const db = require('mongoose')

const Connect = () => {
    // let connectStr = `mongodb://admin:Pachaapp2021_mongo@localhost:27017/pachaapp?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`
    let connectStr = `mongodb://admin:Pachaapp2021_mongo@localhost:27017/pachaapp?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`

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
