const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    challengeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'challenge'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    statusChallenge: {
        type: Number,
        required: false,
        default: 0,
    },
    imageUrl: {
        type: String,
        required: false,
        default: ''
    },
}, { collection: 'challengeUser' })

module.exports = mongoose.model('challengeUser', mySchema)


