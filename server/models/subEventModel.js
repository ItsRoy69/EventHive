const mongoose = require('mongoose')

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
        ref: 'Venue',
        required: true
    },
    datetime: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('SubEvent', subEventSchema)