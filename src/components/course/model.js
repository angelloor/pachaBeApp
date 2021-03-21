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
        ref: 'category'
    }
}, { collection: 'course' })

module.exports = mongoose.model('course', mySchema)