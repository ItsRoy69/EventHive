const Image = require('../models/imageModel')
const ImageChannel = require('../models/imageChannelModel')

const getImages = async (req, res) => {
    try {
        const { userId } = req.body
        const { imageChannelId } = req.params
        const imageChannel = await ImageChannel.findById(imageChannelId)
        const isMember = imageChannel.members.includes(userId)
        if (!isMember) {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
        const isAdmin = imageChannel.admins.includes(userId)
        let images = []
        if (isAdmin) {
            images = await Image.find({ imageChannelId })
        } else {
            images = await Image.find({ estimatedReceiver: userId, imageChannelId })
        }
        return res.status(200).json({ message: 'Fetched images successfully', data: images })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const createImage = async (req, res) => {
    try {
        const { userId } = req.body
        const { imageChannelId } = req.params
        const { cdnLink: image } = req
        const imageChannel = await ImageChannel.findById(imageChannelId)
        const isMember = imageChannel.members.includes(userId)
        if (!isMember) {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
        const isAdmin = imageChannel.admins.includes(userId)
        if (imageChannel.type === 'restricted' && !isAdmin) {
            return res.status(400).json({ message: 'You are not authorized to perform this action' })
        }
        const newImage = new Image({
            imageChannelId,
            image
        })
        await newImage.save()
        return res.status(200).json({ message: 'Created image successfully', data: newImage })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const updateImage = async (req, res) => {
    try {
        const { estimatedReceiver } = req.body
        const { imageId } = req.params
        const image = await Image.findById(imageId)
        image.estimatedReceiver = estimatedReceiver
        await image.save()
        return res.status(200).json({ message: 'Updated image successfully', data: image })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

const deleteImage = async (req, res) => {
    try {

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: 'Internal server error' })
    }
}

module.exports = {
    getImages,
    createImage,
    updateImage,
    deleteImage
}