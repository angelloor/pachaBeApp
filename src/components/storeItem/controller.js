const store = require("./store")
const ModelYourShopping = require("../yourShopping/model")
const fs = require('fs')

addStoreItem = (title, description, price, urlImage) => {
    return new Promise(async (resolve, reject) => {
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

        await store.addStoreItem(storeItem)

        const r = await store.updateUrl(urlImage)

        resolve(r)
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
    return new Promise(async (resolve, reject) => {
        if (!idStoreItem) {
            resolve("No se ha encontrado el store Item")
            return false
        }

        const itemExiste = await ModelYourShopping.findOne({ itemId: idStoreItem })

        if (itemExiste) {
            resolve("No se puede eliminar el Item, los usuarios ya han realizado compras con este Item.")
            return false
        }

        let path = `./public/img/storeItem/${idStoreItem}.jpg`
        fs.unlinkSync(path)

        store.deleteStoreItem(idStoreItem)
            .then(() => {
                resolve('item eliminado correctamente')
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