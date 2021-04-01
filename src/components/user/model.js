const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    numberID: {
        type: String,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    birdOfDate: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registerOfDate: {
        type: String,
        required: true
    },
    coint: {
        type: Number,
        required: false,
        default: 0,
    },
    experience: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        default: ''
    },
}, { collection: 'user' })

module.exports = mongoose.model('user', mySchema)