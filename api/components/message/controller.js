const store = require("./store");

const getMessages = (filterUser) =>
    new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    });

const addMessage = (user, message) =>
    new Promise((resolve, reject) => {
        if (!user || !message) {
            reject("Faltan datos");
            return false;
        }

        const fullMessage = {
            user,
            message,
            date: new Date()
        };

        store.add(fullMessage);

        resolve(fullMessage);
    });

const updateMessage = (id, message) => {
    return new Promise(async (resolve, reject) => {
        if (!id || !message) {
            reject("Datos invalidos");
            return false;
        }
        const result = await store.updateMessage(id, message)
        resolve(result);
    })
}

const deleteMessage = (idMessage) => {
    console.log(idMessage)
    return new Promise((resolve, reject) => {
        if (!idMessage) {
            reject("No se ha encontrado el mensaje");
            return false;
        }
        store.remove(idMessage)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    getMessages,
    addMessage,
    updateMessage,
    deleteMessage
};