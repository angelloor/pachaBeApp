const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    itemId: {
        ref: 'StoreItem'
    },
    userId: {
        ref: 'User'
    },
    shoppingDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    deliveryDate: {
        type: Date,
        required: false,
    },
    deliveryStatus: {
        type: Boolean,
        required: false,
        default: falzse
    }
})

const YourShopping = mongoose.model('YourShopping', mySchema)

module.exports = YourShopping
