const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    colorPosition: {
        type: Array,
        required: true,
    },
    imageUrl: {
        type: String,
        defaul: ''
    }
}, { collection: 'category' })

module.exports = mongoose.model('category', mySchema)