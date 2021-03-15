const mongoose = require('mongoose')

const Schema = mongoose.Schema;

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
    },

})

const Category = mongoose.model('Category', mySchema)

module.exports = Category