const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    challengeId: {
        ref: 'Challenge'
    },
    userId: {
        ref: 'User'
    },
    imageUrl: {
        type: String,
        defaul: ''
    },

})

const ChallengeUser = mongoose.model('ChallengeUser', mySchema)

module.exports = ChallengeUser


