const store = require("./store")

addStoreItem = (title, description, price, urlImage) => {
    return new Promise((resolve, reject) => {
        if (!title || !description || !price || !urlImage) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const storeItem = {
            title,
            description,
            price: parseInt(price),
            urlImage,
        }

        const item = store.addStoreItem(storeItem)
        resolve(item)
    })

}

getStoreItem = (filterStoreItem) => {
    return new Promise((resolve, reject) => {
        resolve(store.getStoreItem(filterStoreItem))
    })
}

updateStoreItem = (idStoreItem, title, description, price, urlImage) => {
    return new Promise(async (resolve, reject) => {
        if (!idStoreItem || !title || !description || !price || !urlImage) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const result = await store.updateStoreItem(idStoreItem, title, description, price, urlImage)
        resolve(result)
    })
}

deleteStoreItem = (idStoreItem) => {
    return new Promise((resolve, reject) => {
        if (!idStoreItem) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteStoreItem(idStoreItem)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addStoreItem,
    getStoreItem,
    updateStoreItem,
    deleteStoreItem
}