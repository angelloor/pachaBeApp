const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addStoreItem = (storeItem) => {
    const myStoreItem = new Model(storeItem)
    myStoreItem.save()
}

getStoreItem = async (filterStoreItem) => {
    let filter = {}
    if (filterStoreItem != null) {
        filter = { _id: filterStoreItem }
    }
    const storeItem = await Model.find(filter)
    return storeItem
}

updateStoreItem = async (idStoreItem, title, description, price, urlImage) => {
    const foundStoreItem = await Model.findOne({
        _id: idStoreItem
    })
    foundStoreItem.title = title
    foundStoreItem.description = description
    foundStoreItem.price = price
    foundStoreItem.urlImage = urlImage

    const newStoreItem = await foundStoreItem.save()
    return newStoreItem
}

deleteStoreItem = (idStoreItem) => {
    return Model.deleteOne({
        _id: idStoreItem
    })
}

module.exports = {
    addStoreItem,
    getStoreItem,
    updateStoreItem,
    deleteStoreItem
}