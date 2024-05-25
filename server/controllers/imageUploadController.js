const imageUploader = async (req, res) => {
    try {
      
        const uploadedImageUrl = req.cdnLink
        console.log('Image uploaded successfully:', uploadedImageUrl)
        res.status(200).json({ message: 'Image uploaded and processed successfully!', data: { cdnLink: uploadedImageUrl } })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
};

module.exports = imageUploader