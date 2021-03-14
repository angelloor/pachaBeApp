const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    day: {
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
        ref: 'Category'
    }

})

const Calendar = mongoose.model('Calendar', mySchema)

module.exports = Calendar