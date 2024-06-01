const Venue = require('../models/venueModel')

const getVenues = async (req, res) => {
    try {
        const venues = await Venue.find({})
        return res.status(200).json({ message: "Venues fetched successfully", data: venues })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createVenue = async (req, res) => {
    try {
        const { name, location, capacity } = req.body
        const newVenue = await Venue.create({ name, location, capacity })
        return res.status(200).json({ message: "Venue created succesfully", data: newVenue })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateVenue = async (req, res) => {

}

const deleteVenue = async (req, res) => {

}

module.exports = {
    getVenues,
    createVenue,
    updateVenue,
    deleteVenue
}