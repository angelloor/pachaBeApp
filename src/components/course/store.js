const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addCourse = (course) => {
    const myCourse = new Model(course)
    myCourse.save()
}

getCourse = async (filterCourse) => {
    let filter = {}
    if (filterCourse != null) {
        filter = { _id: filterCourse }
    }
    const course = await Model.find(filter)
    return course
}

updateCourse = async (idCourse, name, description, categoryId) => {
    const foundCourse = await Model.findOne({
        _id: idCourse
    })

    foundCourse.name = name
    foundCourse.description = description
    foundCourse.categoryId = categoryId

    const newCourse = await foundCourse.save()
    return newCourse
}

deleteCourse = (idCourse) => {
    return Model.deleteOne({
        _id: idCourse
    })
}

module.exports = {
    addCourse,
    getCourse,
    updateCourse,
    deleteCourse
}