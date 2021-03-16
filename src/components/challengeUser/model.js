const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    challengeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Challenge'
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
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

})

const ChallengeUser = mongoose.model('ChallengeUser', mySchema)

module.exports = ChallengeUser


