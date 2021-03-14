const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

const FunFacts = mongoose.model('FunFacts', mySchema)

module.exports = FunFacts
