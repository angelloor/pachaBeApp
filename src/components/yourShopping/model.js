const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'storeItem'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    shoppingDate: {
        type: String,
        required: true,
    },
    deliveryDate: {
        type: String,
        required: false,
        default: ''
    },
    deliveryStatus: {
        type: Boolean,
        required: false,
        default: false
    }
}, { collection: 'yourShopping' })

module.exports = mongoose.model('yourShopping', mySchema)
