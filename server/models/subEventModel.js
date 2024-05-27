const mongoose = require('mongoose')
const dateTimeSchema = require('./dateTimeSchema')

const subEventSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue'
    },
    datetime: {
        type: dateTimeSchema,
        required: true
    }
})

module.exports = mongoose.model('SubEvent', subEventSchema)