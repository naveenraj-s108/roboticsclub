const express = require('express');
const router = express.Router();
const {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(getEvents)
    .post(protect, admin, upload.single('image'), createEvent);

router.route('/:id')
    .get(getEventById)
    .put(protect, admin, upload.single('image'), updateEvent)
    .delete(protect, admin, deleteEvent);


module.exports = router;
