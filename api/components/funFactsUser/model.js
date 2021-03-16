const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    funFactsId: {
        type: Schema.Types.ObjectId,
        ref: 'FunFacts'
    }
})

const FunFactsUser = mongoose.model('FunFactsUser', mySchema)

module.exports = FunFactsUser