const store = require("./store")


addFunFacts = (content) => {
    return new Promise((resolve, reject) => {
        if (!content) {
            reject("No se ha recibido todos los datos");
            return false;
        }

        const funFacts = {
            content
        };

        store.addFunFacts(funFacts);
        resolve(funFacts);
    });

}

getFunFacts = (filterFunFacts) => {
    return new Promise((resolve, reject) => {
        resolve(store.getFunFacts(filterFunFacts));
    });
}

updateFunFacts = (idFunFacts, content) => {
    return new Promise(async (resolve, reject) => {
        if (!idFunFacts || !content) {
            reject("No se ha recibido todos los datos");
            return false;
        }

        const result = await store.updateFunFacts(idFunFacts, content)
        resolve(result);
    })
}

deleteFunFacts = (idFunFacts) => {
    return new Promise((resolve, reject) => {
        if (!idFunFacts) {
            reject("No se ha encontrado la categoria");
            return false;
        }

        store.deleteFunFacts(idFunFacts)
            .then(() => {
                resolve();
            })
            .catch(err => {
                reject(err)
            })
    })
}

module.exports = {
    addFunFacts,
    getFunFacts,
    updateFunFacts,
    deleteFunFacts
}