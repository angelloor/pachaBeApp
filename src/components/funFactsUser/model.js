const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    funFactsId: {
        type: Schema.Types.ObjectId,
        ref: 'funFacts'
    }
}, { collection: 'funFactsUser' })

module.exports = mongoose.model('funFactsUser', mySchema)