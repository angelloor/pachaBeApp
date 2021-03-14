const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    userId: {
        ref: 'User'
    },
    funFactsId: {
        ref: 'FunFacts'
    }
})

const FunFactsUser = mongoose.model('FunFactsUser', mySchema)

module.exports = FunFactsUser