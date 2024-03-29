const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
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
        type: String,
        required: false,
    },
    imageUrl: {
        type: String,
        default: ''
    },
    nameButton: {
        type: String,
        default: ''
    },
    linkButton: {
        type: String,
        default: ''
    }
}, { collection: 'news' })

module.exports = mongoose.model('news', mySchema)
