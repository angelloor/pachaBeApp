const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    dayText: {
        type: String,
        required: true,
    },
    dayCelebrate: {
        type: String,
        required: true,
    },
    isCelebrated: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        defaul: ''
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }

})

const Calendar = mongoose.model('Calendar', mySchema)

module.exports = Calendar