const Gallery = require('../models/Gallery');

// @desc    Get all gallery images
// @route   GET /api/gallery
// @access  Public
const getGalleryImages = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 }).populate('eventId', 'title');
        res.json(images);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload gallery image (URL-based)
// @route   POST /api/gallery
// @access  Private/Admin
const addGalleryImage = async (req, res) => {
    let { imageUrl, eventId } = req.body;

    if (req.file) {
        imageUrl = req.file.path;
    }

    if (!imageUrl) {
        return res.status(400).json({ message: 'Please provide an image or image URL' });
    }

    try {
        const image = new Gallery({ imageUrl, eventId: eventId || null });
        const createdImage = await image.save();
        res.status(201).json(createdImage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryImage = async (req, res) => {
    try {
        const image = await Gallery.findById(req.params.id);

        if (image) {
            await image.deleteOne();
            res.json({ message: 'Image removed from gallery' });
        } else {
            res.status(404).json({ message: 'Image not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getGalleryImages,
    addGalleryImage,
    deleteGalleryImage
};
