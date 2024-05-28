const mongoose = require('mongoose');
const dateTimeSchema = require('./dateTimeSchema');

const eventSchema = new mongoose.Schema({
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
    },
    budget: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Event', eventSchema)