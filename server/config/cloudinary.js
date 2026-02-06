const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const cloudName = String(process.env.CLOUDINARY_CLOUD_NAME || '').trim();
const apiKey = String(process.env.CLOUDINARY_API_KEY || '').trim();
const apiSecret = String(process.env.CLOUDINARY_API_SECRET || '').trim();

// Force the SDK to recognize the config via CLOUDINARY_URL
process.env.CLOUDINARY_URL = `cloudinary://${apiKey}:${apiSecret}@${cloudName}`;

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'college_club_website',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
