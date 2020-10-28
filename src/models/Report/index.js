const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    candidateName: {
        type: String,
        required: true
    },
    candidateParty: {
        partyName: {
            type: String,
            required: true
        },
        partyNumber: {
            type: String,
            required: true
        }
    },
    reportDescription: String,
    reportLocation: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    reportAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reportConfirmation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

module.exports = mongoose.model('Report', Schema)