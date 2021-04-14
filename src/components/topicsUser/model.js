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
    }
}, { collection: 'topicsUser' })

module.exports = mongoose.model('topicsUser', mySchema)