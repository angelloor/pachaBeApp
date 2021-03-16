const store = require("./store")

addCategory = (name, colorPosition, imageUrl) => {
    return new Promise((resolve, reject) => {
        if (!name || !colorPosition || !imageUrl) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const category = {
            name,
            colorPosition,
            imageUrl
        }

        store.addCategory(category)
        resolve(category)
    })

}

getCategory = (filterCategory) => {
    return new Promise((resolve, reject) => {
        resolve(store.getCategory(filterCategory))
    })
}

updateCategory = (id, name, colorPosition, imageUrl) => {
    return new Promise(async (resolve, reject) => {
        if (!name || !colorPosition || !imageUrl) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const result = await store.updateCategory(id, name, colorPosition, imageUrl)
        resolve(result)
    })
}

deleteCategory = (idCategory) => {
    return new Promise((resolve, reject) => {
        if (!idCategory) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteCategory(idCategory)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory
}