const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({

    content: {
        type: String,
        required: true
    }
})

const FunFacts = mongoose.model('FunFacts', mySchema)

module.exports = FunFacts
