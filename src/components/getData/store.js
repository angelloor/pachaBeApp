const db = require('../../network/db')
db.Connect()

getData = async (emailUser) => {
    return `estoy listo: ${emailUser}`
}

module.exports = {
    getData
}