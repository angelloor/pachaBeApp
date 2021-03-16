const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    urlImage: {
        type: String,
        required: true,
        default: String
    }
})

const StoreItem = mongoose.model('StoreItem', mySchema)

module.exports = StoreItem