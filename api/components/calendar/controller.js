const store = require("./store")


addCalendar = (dayText, dayCelebrate, isCelebrated, description, categoryId) => {
    return new Promise((resolve, reject) => {
        if (!dayText || !dayCelebrate || !isCelebrated || !description || !categoryId) {
            reject("No se ha recibido todos los datos");
            return false;
        }

        const calendar = {
            dayText,
            dayCelebrate,
            isCelebrated,
            description,
            categoryId
        };

        store.addCalendar(calendar);
        resolve(calendar);
    });

}

getCalendar = (filterCalendar) => {
    return new Promise((resolve, reject) => {
        resolve(store.getCalendar(filterCalendar));
    });
}

updateCalendar = (idCalendar, dayText, dayCelebrate, isCelebrated, description, categoryId) => {
    return new Promise(async (resolve, reject) => {
        if (!idCalendar || !dayText || !dayCelebrate || !isCelebrated || !description || !categoryId) {
            reject("No se ha recibido todos los datos");
            return false;
        }

        const result = await store.updateCalendar(idCalendar, dayText, dayCelebrate, isCelebrated, description, categoryId)
        resolve(result);
    })
}

deleteCalendar = (idCalendar) => {
    return new Promise((resolve, reject) => {
        if (!idCalendar) {
            reject("No se ha encontrado la categoria");
            return false;
        }

        store.deleteCalendar(idCalendar)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addCalendar,
    getCalendar,
    updateCalendar,
    deleteCalendar
}