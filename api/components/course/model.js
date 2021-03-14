const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    categoryId: {
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