const mongoose = require('mongoose')

const Schema = mongoose.Schema

const mySchema = new Schema({
    dailyActivity: {
        type: Number,
        required: true,
        default: 0,
    },
    socialLinks: {
        facebook: {
            type: String,
            required: false,
        },
        instagram: {
            type: String,
            required: false,
        }
    },
    Links: {
        privacyPolicies: {
            type: String,
            required: false,
        },
        termsAndConditions: {
            type: String,
            required: false,
        },
        suport: {
            type: String,
            required: false,
        }
    }

})

const Configuration = mongoose.model('Configuration', mySchema)

module.exports = Configuration