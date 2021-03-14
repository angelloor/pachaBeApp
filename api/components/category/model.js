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
    colorPosition: {
        start: {
            type: String
        },
        end: {
            type: String
        }
    },
    imageUrl: {
        type: String,
        defaul: ''
    },

})

const Category = mongoose.model('Category', mySchema)

module.exports = Category