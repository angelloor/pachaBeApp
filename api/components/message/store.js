const db = require('mongoose')
const Model = require('./model')

try {
    db.Promise = global.Promise
    db.connect('mongodb+srv://admin-pacha-app:App_2021_Pacha@devpacha.s5qbu.mongodb.net/telegram', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log('DB conectada')

} catch (error) {
    console.log('ocurrio un error: ', error)
}

function addMessage(message) {
    const myMessage = new Model(message)
    myMessage.save()
}

async function getMessage(filterUser) {
    let filter = {};
    if (filterUser != null) {
        filter = { user: filterUser };
    }
    const messages = await Model.find(filter)
    return messages
}

const updateMessage = async (id, message) => {
    const foundMessage = await Model.findOne({
        _id: id
    });
    foundMessage.message = message;
    const newMessage = await foundMessage.save()
    return newMessage
}

const deleteMessage = (id) => {
    return Model.deleteOne({
        _id: id
    })
}

module.exports = {
    add: addMessage,
    list: getMessage,
    updateMessage: updateMessage,
    remove: deleteMessage
}