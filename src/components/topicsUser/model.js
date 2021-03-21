const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    topics: {
        type: Schema.Types.ObjectId,
        ref: 'topics',
        required: true,
    },
    status: {
        type: Boolean,
        required: false,
        default: false
    }
}, { collection: 'topicsUser' })

module.exports = mongoose.model('topicsUser', mySchema)