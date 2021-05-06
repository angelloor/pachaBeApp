const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    content: {
        type: Array,
        required: true,
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answers: {
        type: Array,
        required: true,
    },
    correctAnswer: {
        type: String,
        required: true,
    },
    reward: {
        experiencie: {
            type: Number,
            required: true,
        },
        coint: {
            type: Number,
            required: true,
        }
    },
    imageTopic: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    }
}, { collection: 'topics' })

module.exports = mongoose.model('topics', mySchema)