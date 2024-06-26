const multer = require('multer')
const cloudinary = require('./cloudinaryConfig')
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const fs = require('fs')

// Configure Cloudinary storage (replace with your credentials)
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'eventhive_media', // Set your Cloudinary folder here
    resource_type: 'auto',
  },
});

const upload = multer({ storage: cloudinaryStorage });

const uploadImageMiddleware = upload.single('image'); // Middleware for single file upload

const handleUploadResponse = async (req, res, next) => {
    try {
      if (!req.file && (req.body?.type === "image" || req.body?.message?.type === "image")) {
        console.log("Couldn't upload, req recieved: ", req)
        return res.status(400).json({ message: 'No image uploaded' });
      }
      if (!req.file) {
        console.log("Was a text message, so not supposed to upload")
        next()
      } else {
        console.log(req.file);
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'eventhive_media', // Optional: Redundant if set in storage config
            resource_type: 'auto',
        });
        req.cdnLink = result.secure_url; 
        next();
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error during upload' });
    }
};

module.exports = { uploadImageMiddleware, handleUploadResponse };