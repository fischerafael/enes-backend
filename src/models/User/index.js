const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', Schema)