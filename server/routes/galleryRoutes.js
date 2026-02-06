const express = require('express');
const router = express.Router();
const {
    getGalleryImages,
    addGalleryImage,
    deleteGalleryImage
} = require('../controllers/galleryController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(getGalleryImages)
    .post(protect, admin, upload.single('image'), addGalleryImage);


router.route('/:id')
    .delete(protect, admin, deleteGalleryImage);

module.exports = router;
