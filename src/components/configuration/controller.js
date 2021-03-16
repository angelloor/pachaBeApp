const store = require("./store")

addConfiguration = (dailyActivity, socialLinks, Links) => {
    return new Promise((resolve, reject) => {
        if (!dailyActivity || !socialLinks || !Links) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const configuration = {
            dailyActivity,
            socialLinks,
            Links,
        }

        store.addConfiguration(configuration)
        resolve(configuration)
    })

}

getConfiguration = (filterConfiguration) => {
    return new Promise((resolve, reject) => {
        resolve(store.getConfiguration(filterConfiguration))
    })
}

updateConfiguration = (idConfiguration, dailyActivity, socialLinks, Links) => {
    return new Promise(async (resolve, reject) => {
        if (!idConfiguration || !dailyActivity || !socialLinks || !Links) {
            reject("No se ha recibido todos los datos")
            return false
        }

        const result = await store.updateConfiguration(idConfiguration, dailyActivity, socialLinks, Links)
        resolve(result)
    })
}

deleteConfiguration = (idConfiguration) => {
    return new Promise((resolve, reject) => {
        if (!idConfiguration) {
            reject("No se ha encontrado la categoria")
            return false
        }

        store.deleteConfiguration(idConfiguration)
            .then(() => {
                resolve()
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addConfiguration,
    getConfiguration,
    updateConfiguration,
    deleteConfiguration
}