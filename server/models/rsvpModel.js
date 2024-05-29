const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    subEventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubEvent',
        required: true
    },
    status: {
        type: String,
        required: true
    }
})

const rsvpSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest'
    },
    contact: {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        }
    },
    tags: [{
        type: tagSchema,
    }]
})

module.exports = mongoose.model('Rsvp', rsvpSchema)