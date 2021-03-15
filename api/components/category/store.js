const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addCategory = (category) => {
    const myCategory = new Model(category)
    myCategory.save()
}

getCategory = async (filterCategory) => {
    let filter = {};
    if (filterCategory != null) {
        filter = { name: filterCategory };
    }
    const category = await Model.find(filter)
    return category
}

updateCategory = async (id, name, colorPosition, imageUrl) => {
    const foundCategory = await Model.findOne({
        _id: id
    });

    foundCategory.name = name;
    foundCategory.colorPosition = colorPosition;
    foundCategory.imageUrl = imageUrl;

    const newCategory = await foundCategory.save()
    return newCategory
}

deleteCategory = (idCategory) => {
    return Model.deleteOne({
        _id: idCategory
    })
}

module.exports = {
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory
}