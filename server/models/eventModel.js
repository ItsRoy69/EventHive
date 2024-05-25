const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host',
        required: true
    }],
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venue',
        required: true
    },
    datetime: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    },
    budget: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Event', eventSchema)