const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addYourShopping = (yourShopping) => {
    const myYourShopping = new Model(yourShopping)
    myYourShopping.save()
}

getYourShopping = async (filterYourShopping) => {
    let filter = {}
    if (filterYourShopping != null) {
        filter = { _id: filterYourShopping }
    }
    const yourShopping = await Model.find(filter)
    return yourShopping
}

updateYourShopping = async (idYourShopping, date) => {
    const foundYourShopping = await Model.findOne({
        _id: idYourShopping
    })

    foundYourShopping.deliveryDate = date
    foundYourShopping.deliveryStatus = !foundYourShopping.deliveryStatus

    const newYourShopping = await foundYourShopping.save()
    return newYourShopping
}

deleteYourShopping = (idYourShopping) => {
    return Model.deleteOne({
        _id: idYourShopping
    })
}

module.exports = {
    addYourShopping,
    getYourShopping,
    updateYourShopping,
    deleteYourShopping
}