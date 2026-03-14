const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const hasCloudinaryConfig =
    !!process.env.CLOUD_NAME &&
    !!process.env.CLOUD_API_KEY &&
    !!process.env.CLOUD_API_SECRET;

let storage;

if (hasCloudinaryConfig) {
    storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'wanderlust_DEV',
            allowedFormats: ["png", "jpg", "jpeg"]
        }
    });
} else {
    // Fallback keeps the app bootable in environments where Cloudinary vars are missing.
    storage = multer.memoryStorage();
}

module.exports = {
    cloudinary,
    storage,
    hasCloudinaryConfig,
};
