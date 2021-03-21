const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    content: {
        type: String,
        required: true
    }
}, { collection: 'funFacts' })

module.exports = mongoose.model('funFacts', mySchema)
