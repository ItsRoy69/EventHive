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
        let { userId, role, event } = req.body
        let groupChannels = []
        if (role === 'host') {
            groupChannels = await GroupChannel.find({ eventId: event._id })
        } else {
            groupChannels = await GroupChannel.find({ eventId: event._id, members: { $in: [userId] } })
        }
        let meetings = []
        if (role === 'host') {
            meetings = await Meeting.find({ eventId: event._id })
        } else if (role === 'vendor') {
            meetings = await Meeting.find({ eventId: event._id, vendorId: userId })
        }
        let subEvents = []
        if (role === 'host') {
            subEvents = await SubEvent.find({ parentEvent: event._id })
        } else if (role === 'vendor') {
            subEvents = await SubEvent.find({ parentEvent: event._id, vendorId: userId })
        }
        let vendors = []
        if (role === 'host') {
            vendors = await Vendor.find({ eventId: event._id })
        }
        event.subEvents = subEvents
        event.groupChannels = groupChannels
        event.meetings = meetings
        event.vendors = vendors
        return res.status(200).json({ message: 'Event fetched successfully', data: event })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createEvent = async (req, res) => {
    try {
        let { user, event } = req.body
        console.log(req.body)
        let userId
        if (!user) {
            const token = req.headers.authorization.split(' ')[1]
            if (token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET_TOKEN)
                userId = decoded.userId
            }
        }
        if ((!user && !userId) || !event) {
            return res.status(400).json({ message: 'Missing required fields' })   
        }
        if (!userId) {
            const existingUser = await User.findOne({
                $or: [
                    { email: user.email },
                    { phone: user.phone }
                ]
            })
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' })
            }
            const hashedPassword = await bcrypt.hash(user.password, 10)
            const newUser = await User.create({
                name: user.name,
                phone: user.phone,
                email: user.email,
                password: hashedPassword
            })
            userId = newUser._id
            user = newUser
        }
        const userData = { userId: user._id, name: user.name, phone: user.phone }
        const token = getJWTToken('1d', userData)
        let newEvent = await Event.create({
            name: event.name,
            datetime: event.datetime
        })
        const newHost = await Host.create({
            userId,
            eventId: newEvent._id
        })
        const data = {
            token:token,
            user: user,
            event: newEvent
        }
        return res.status(200).json({ message: "Event created successfully", data })
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