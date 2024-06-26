const Event = require('../models/eventModel')
const SubEvent = require('../models/subEventModel')
const User = require('../models/userModel')
const Host = require('../models/hostModel')
const Guest = require('../models/guestModel')
const Vendor = require('../models/vendorModel')
const GroupChannel = require('../models/groupChannelModel')
const Meeting = require('../models/meetingModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const getJWTToken = require('../utils/getJWTToken')

const getAllEvents = async (req, res) => {
    try {
        const { userId } = req.body
        const eventsAsGuest = await Guest.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            }, 
            {
                $lookup: {
                    from: 'events',
                    localField: 'eventId',
                    foreignField: '_id',
                    as: 'event'
                }
            },
            {
                $addFields: {
                    "event.role": 'guest'
                }
            },
            {
                $project: {
                    event: 1
                }
            }
        ])
        const eventsAsHost = await Host.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            }, 
            {
                $lookup: {
                    from: 'events',
                    localField: 'eventId',
                    foreignField: '_id',
                    as: 'event'
                }
            },
            {
                $addFields: {
                    "event.role": 'host'
                }
            },
            {
                $project: {
                    event: 1
                }
            }
        ])
        const eventsAsVendor = await Vendor.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            }, 
            {
                $lookup: {
                    from: 'events',
                    localField: 'eventId',
                    foreignField: '_id',
                    as: 'event'
                }
            },
            {
                $addFields: {
                    "event.role": 'vendor'
                }
            },
            {
                $project: {
                    event: 1
                }
            }
        ])
        const events = [ ...eventsAsHost, ...eventsAsGuest, ...eventsAsVendor]
        return res.status(200).json({ message: "Events fetched successfully", data: events.flat() })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const getEventById = async (req, res) => {
    try {
        let { userId, role, event, vendorId } = req.body
        let { eventId } = req.params
        let groupChannels = []
        if (role === 'host') {
            groupChannels = await GroupChannel.find({ eventId: event._id })
        } else {
            groupChannels = await GroupChannel.find({ eventId: event._id, members: { $in: [userId] } })
        }
        let meetings = []
        if (role === 'host') {
            meetings = await Meeting.find({ eventId })
        } else if (role === 'vendor') {
            meetings = await Meeting.find({ eventId, vendorId }).exec().lean()
        }
        let subEvents = []
        if (role === 'host') {
            subEvents = await SubEvent.find({ eventId })
        } else if (role === 'vendor') {
            subEvents = await SubEvent.find({ eventId, vendorId })
        }
        let vendors = []
        if (role === 'host') {
            vendors = await Vendor.find({ eventId })
        }
        event = { ... event, subEvents, groupChannels, meetings, vendors }
        return res.status(200).json({ message: 'Event fetched successfully', data: event })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createEvent = async (req, res) => {
    try {
        const { userId, event } = req.body
        let newEvent = await Event.create({
            name: event.name,
            datetime: event.datetime
        })
        const newHost = await Host.create({
            userId,
            eventId: newEvent._id
        })
        return res.status(200).json({ message: "Event created successfully", data: newEvent })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateEvent = async (req, res) => {
    try {
        const { role, venue, datetime, eventId } = req.body
        if (!eventId) {
            return res.status(400).json({ message: 'Must provide event id' })
        }
        const existingEvent = await Event.findById(eventId)
        if (!existingEvent) {
            return res.status(400).json({ message: 'Event not found' })
        }
        if (role !== 'hosts') {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
        if (venue) {
            existingEvent.venue = venue
        }
        if (datetime) {
            existingEvent.datetime = datetime
        }
        await existingEvent.save()
        return res.status(200).json({ message: 'Event updated successfully' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteEvent = async (req, res) => {
    try {
        const { eventId, userId } = req.body
        if (!eventId || !userId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const event = await Event.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(eventId),
                }
            },
            {
                $unwind: '$hosts'
            },
            {
                $match: {
                    'hosts.userId': new mongoose.Types.ObjectId(userId)
                }
            }
        ])
        if (event?.length) {
            return res.status(400).json({ message: 'Event not found' })
        } 
        return res.status(200).json({ message: 'Event deleted successfully' })
    } catch (error) {
        console.log(error) 
        return res.status(500).json({ message: 'Internal server error' })
    }    
}

module.exports = {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}