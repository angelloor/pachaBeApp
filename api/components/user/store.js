const Model = require('./model')
const db = require('../../network/db')
const nowDate = require('../../utils/Date')
db.Connect()

addUser = (user) => {
    const myUser = new Model(user);
    myUser.save();
}

getUser = async (filterUser) => {
    let filter = {};
    if (filterUser != null) {
        filter = { _id: filterUser };
    }
    const user = await Model.find(filter);
    return user;
}

updateUser = async (idUser, numberID, names, birdOfDate, email, phone, password, coint, experience, imageUrl) => {
    const foundUser = await Model.findOne({ _id: idUser });

    const date = nowDate();

    foundUser.numberID = numberID;
    foundUser.names = names;
    foundUser.birdOfDate = birdOfDate;
    foundUser.email = email;
    foundUser.phone = phone;
    foundUser.password = password;
    foundUser.registerOfDate = date;
    foundUser.coint = coint;
    foundUser.experience = experience;
    foundUser.imageUrl = imageUrl;

    const updateNew = await foundUser.save();
    return updateNew;
}

deleteUser = (idUser) => {
    return Model.deleteOne({
        _id: idUser
    })
}

module.exports = {
    addUser,
    getUser,
    updateUser,
    deleteUser,
}