const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    challengeId: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    imageUrl: {
        type: String,
        default: ''
    },

})

const ChallengeUser = mongoose.model('ChallengeUser', mySchema)

module.exports = ChallengeUser


