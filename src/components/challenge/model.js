const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    description: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: false,
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
    ambientalImpact: {
        type: String,
        required: true,
    }
})

const Challenge = mongoose.model('Challenge', mySchema)

module.exports = Challenge