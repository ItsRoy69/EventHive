const mongoose = require('mongoose')

const floorSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    venueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    floors: [{
        number: {
            type: Number,
            required: true
        }, 
        sections: [{
            coordinates: [{
                x: {
                    type: Number
                },
                y: {
                    type: Number
                }
            }],
            name: {
                type: String
            },
            color: {
                type: String
            }
        }]
    }]

})

module.exports = mongoose.model('Floor', floorSchema)