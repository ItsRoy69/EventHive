const mongoose = require('mongoose')

const venueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    defaultFloors: [{
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

module.exports = mongoose.model('Venue', venueSchema)