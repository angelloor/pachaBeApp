const Model = require('./model')
const db = require('../../network/db')
db.Connect()

addCalendar = (calendar) => {
    const myCalendar = new Model(calendar)
    myCalendar.save()
}

getCalendar = async (filterCalendar) => {
    let filter = {};
    if (filterCalendar != null) {
        filter = { _id: filterCalendar };
    }
    const calendar = await Model.find(filter)
    return calendar
}

updateCalendar = async (idCalendar, dayText, dayCelebrate, isCelebrated, description, categoryId) => {
    const foundCalendar = await Model.findOne({
        _id: idCalendar
    });

    foundCalendar.dayText = dayText;
    foundCalendar.dayCelebrate = dayCelebrate;
    foundCalendar.isCelebrated = isCelebrated;
    foundCalendar.description = description;
    foundCalendar.categoryId = categoryId;

    const newCalendar = await foundCalendar.save()
    return newCalendar
}

deleteCalendar = (idCalendar) => {
    return Model.deleteOne({
        _id: idCalendar
    })
}

module.exports = {
    addCalendar,
    getCalendar,
    updateCalendar,
    deleteCalendar
}