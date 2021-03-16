const store = require("./store")

addCourse = (name, description, categoryId) => {
    return new Promise((resolve, reject) => {
        if (!name || !description || !categoryId) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const course = {
            name,
            description,
            categoryId
        }

        store.addCourse(course)
        resolve(course)
    })

}

getCourse = (filterCourse) => {
    return new Promise((resolve, reject) => {
        resolve(store.getCourse(filterCourse))
    })
}

updateCourse = (idCourse, name, description, categoryId) => {
    return new Promise(async (resolve, reject) => {
        if (!idCourse || !name || !description || !categoryId) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const result = await store.updateCourse(idCourse, name, description, categoryId)
        resolve(result)
    })
}

deleteCourse = (idCourse) => {
    return new Promise((resolve, reject) => {
        if (!idCourse) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteCourse(idCourse)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse
}