const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: false
    },
    numberID: {
        type: String,
        required: true
    },
    names: {
        type: String,
        required: true
    },
    birdOfDate: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registerOfDate: {
        type: Date,
        required: true
    },
    coint: {
        type: Number,
        required: false,
        default: 0
    },
    experience: {
        type: number,
        default: 0
    },
    dailyActivity: {
        type: Number,
        required: false,
    },
    imageUrl: {
        type: String,
        defaul: ''
    },
})

const User = mongoose.model('User', mySchema)

module.exports = User