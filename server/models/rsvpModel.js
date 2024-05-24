const mongoose = require('mongoose')

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
        subEventId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SubEvent',
            required: true
        },
        status: {
            type: String,
            default: 'pending'
        }
    }]
})

module.exports = mongoose.model('Rsvp', rsvpSchema)