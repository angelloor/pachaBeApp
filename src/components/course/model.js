const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    status: {
        type: Boolean,
        required: false,
        default: false
    }
})

const Course = mongoose.model('Course', mySchema)

module.exports = Course