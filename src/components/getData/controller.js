const store = require("./store")

getData = (emailUser) => {
    return new Promise((resolve, reject) => {
        resolve(store.getData(emailUser))
    })
}

module.exports = {
    getData
}