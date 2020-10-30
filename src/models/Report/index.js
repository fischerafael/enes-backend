const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
})

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
    reportThumbnail: {
        type: String,
        required: true     
    },
    location: {
        type: PointSchema,
        index: '2dsphere'
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