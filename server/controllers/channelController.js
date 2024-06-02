const { default: mongoose } = require('mongoose')
const GroupChannel = require('../models/groupChannelModel')
const ImageChannel = require('../models/imageChannelModel')
const SubEvent = require('../models/subEventModel')
const Vendor = require('../models/vendorModel')

const getChannelsForSubEvent = async (req, res) => {
    try {
        const { userId, role } = req.body
        const { eventId } = req.params
        let subEvents = await SubEvent.aggregate([
            {
                $match: {
                    eventId: new mongoose.Types.ObjectId(eventId)
                }
            }
        ])

        const promises = subEvents.map(async (subEvent) => {
            const groupChannels = await GroupChannel.aggregate([
                { $match: { subEventId: subEvent._id, members: { $in: [new mongoose.Types.ObjectId(userId)] } } },
                { $sort: { createdAt: -1 } },
                { $addFields: { "category": "group" } },
                { $project: { _id: 1, name: 1, type: 1, avatar: 1, "category": 1 } }
            ]);
          
            const imageChannels = await ImageChannel.aggregate([
                { $match: { subEventId: subEvent._id, members: { $in: [new mongoose.Types.ObjectId(userId)] } } },
                { $sort: { createdAt: -1 } },
                { $addFields: { "category": "gallery" } },
                { $project: { _id: 1, name: 1, type: 1, avatar: 1, "category": 1 } }
            ]);

            let vendorChannels = []
            if (role === 'host') {
                vendorChannels = await Vendor.aggregate([
                    { $match: { subEvents: { $in: [subEvent._id] } } },
                    { $lookup: { from: 'users', localField: 'userId', foreignField: '_id', as: 'user' } },
                    { $addFields: { "category": 'vendor' } },
                    { $project: { _id: 1, "user.name": 1, "user.avatar": 1, "category": 1 } }
                ])
            }
          
            const channels = [...groupChannels, ...imageChannels, ...vendorChannels];
            subEvent.channels = channels;
            return subEvent;
          });
          
          const subEventChannels = await Promise.all(promises);

        return res.status(200).json({ message: 'Channels fetched successfully', data: subEventChannels })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

const createChannel = async (req, res) => {
    try {
        const { channel, subEventId } = req.body
        const newChannel = new GroupChannel({ ...channel, subEventId })
        await newChannel.save()
        return res.stataus(200).json({ message: 'Channel created successfully' }, newChannel)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

const updateChannel = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

const deleteChannel = async (req, res) => {
    try {
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error'})
    }
}

module.exports = {
    getChannelsForSubEvent,
    createChannel,
    updateChannel,
    deleteChannel
}