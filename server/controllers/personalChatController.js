const PersonalChat = require('../models/personalChatModel')
const mongoose = require('mongoose')

const getAllPersonalChats = async (req, res) => {
    try {
        const { userId } = req.body
        const { eventId } = req.params
        if (!eventId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const conditions = [ { senderId: userId }, { receiverId: userId } ]
        // just get the recepients
        let personalChats = await PersonalChat.aggregate([
            {
                $match: {
                    eventId: new mongoose.Types.ObjectId(eventId),
                    senderId: userId,
                },
            },
            // {
            //     $group: {
            //         _id: '$receiverId',
            //     }
            // }, 
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'receiver',
                }
            },
            {
                $project: {
                    "receiver._id": 1,
                    "receiver.name": 1,
                    "receiver.phone": 1,
                    "receiver.email": 1,
                }
            }
        ])
        personalChats = personalChats.concat(await PersonalChat.aggregate([
            {
                $match: {
                    eventId: new mongoose.Types.ObjectId(eventId),
                    receiverId: userId,
                }
            },
            {
                $group: {
                    _id: '$senderId',
                }
            }, 
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'sender',
                }
            },
            {
                $project: {
                    "sender._id": 1,
                    "sender.name": 1,
                    "sender.phone": 1,
                    "sender.email": 1,
                }   
            }
        ]))
        return res.status(200).json({ message: 'Chats fetched successfully', data: personalChats })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const getPersonalChatWithUser = async (req, res) => {
    try {
        const { userId, userId2 } = req.body
        const { eventId } = req.params
        if (!eventId) {
            return res.status(400).json({ message: 'Missing required fields' })
        }
        const conditions = [ { senderId: userId, receiverId: userId2 }, { senderId: userId2, receiverId: userId } ]
        const personalChats = await PersonalChat.find({ eventId, $or: conditions }).sort({ timestamp: -1 })   
        return res.status(200).json({ message: 'Chats fetched successfully', data: personalChats })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createPersonalChat = async (req, res) => {
    try {
        const { userId: senderId, message } = req.body
        const { eventId } = req.params
        const cdnLink = req.cdnLink
        const chatObj = { 
            eventId, 
            senderId, 
            receiverId: message.receiverId, 
            type: message.type, 
            message: message.message, 
            image: message.type === "image" ? cdnLink : null 
        }
        const newChat = await PersonalChat.create(chatObj)
        return res.status(200).json({ message: 'Chat created successfully', data: newChat })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updatePersonalChat = async (req, res) => {
    try {
        const { chatId, message, userId } = req.body
        const existingChat = await PersonalChat.findById(chatId)
        if (!existingChat) {
            return res.status(404).json({ message: 'Chat not found' })
        }
        if (existingChat.receiverId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' })
        }
        existingChat.message = message
        const updatedChat = await existingChat.save()
        return res.status(200).json({ message: 'Chat updated successfully', data: updatedChat })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const deletePersonalChat = async (req, res) => {
    try {
        const { chatId, userId } = req.body
        const existingChat = await PersonalChat.findById(chatId)
        if (!existingChat) {
            return res.status(404).json({ message: 'Chat not found' })
        }
        if (existingChat.receiverId.toString() !== userId) {
            return res.status(403).json({ message: 'Unauthorized access' })
        }
        await existingChat.remove()
        return res.status(200).json({ message: 'Chat deleted successfully' })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    getAllPersonalChats,
    getPersonalChatWithUser,
    createPersonalChat,
    updatePersonalChat,
    deletePersonalChat
}