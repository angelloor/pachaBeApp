const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    content: {
        type: Array,
        required: true,
    },
    courseId: {
        ref: 'Course',
        required: true,
    },
    statusFinish: {
        type: Boolean,
        required: false,
        default: false
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
    }
})

const Topics = mongoose.model('Topics', mySchema)

module.exports = Topics