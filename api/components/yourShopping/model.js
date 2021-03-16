const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        ref: 'StoreItem'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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
})

const YourShopping = mongoose.model('YourShopping', mySchema)

module.exports = YourShopping
