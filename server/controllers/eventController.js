const Event = require('../models/eventModel')
const User = require('../models/userModel')
const Host = require('../models/hostModel')
const Guest = require('../models/guestModel')
const Vendor = require('../models/vendorModel')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const getEvents = async (req, res) => {
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
                    role: 'guest'
                }
            },
            {
                $project: {
                    event: 1,
                    role: 1
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
                    role: 'host'
                }
            },
            {
                $project: {
                    event: 1,
                    role: 1
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
                    role: 'vendor'
                }
            },
            {
                $project: {
                    event: 1,
                    role: 1
                }
            }
        ])
        const events = [...eventsAsGuest, ...eventsAsHost, ...eventsAsVendor]
        return res.status(200).json({ message: "Events fetched successfully", data: events })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createEvent = async (req, res) => {
    try {
        let { user, event } = req.body
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
        let newEvent = await Event.create({
            name: event.name,
            datetime: event.datetime
        })
        const newHost = await Host.create({
            userId,
            eventId: newEvent._id
        })
        const data = {
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
        const { userId } = req.body

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
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}