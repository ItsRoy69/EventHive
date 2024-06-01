const Vendor = require('../models/vendorModel')
const mongoose = require('mongoose')

const getVendorsInEvent = async (req, res) => {
    try {
        const { eventId } = req.params
        const vendors = await Vendor.aggregate([
            {
                $match: {
                    eventId: new mongoose.Types.ObjectId(eventId)
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $project: {
                    serviceType: 1,
                    "user._id": 1,
                    "user.name": 1,
                    "user.email": 1,
                    "user.phone": 1,
                    "user.avatar": 1
                }
            }
        ])
        return res.status(200).json({ message: "Vendors fetched successfully", data: vendors })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createVendor = async (req, res) => {
    try {
        const { userId, eventId, serviceType } = req.body
        const newVendor = await Vendor.create({
            userId: userId,
            eventId: eventId,
            serviceType: serviceType
        })
        return res.status(200).json({ message: "Vendor created succesfully", data: newVendor })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateVendor = async (req, res) => {

}

const deleteVendor = async (req, res) => {

}

module.exports = {
    getVendorsInEvent,
    createVendor,
    updateVendor,
    deleteVendor
}