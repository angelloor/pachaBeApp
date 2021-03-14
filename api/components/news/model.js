const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: false,
    },
    datePublished: {
        type: Date,
        required: false,
        default: new Date()
    },
    imageUrl: {
        type: String,
        defaul: ''
    },

})

const News = mongoose.model('News', mySchema)

module.exports = News
