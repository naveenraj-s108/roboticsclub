const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single event by ID
// @route   GET /api/events/:id
// @access  Public
const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = async (req, res) => {
    let { title, description, date, venue, imageUrl, registrationLink, status } = req.body;

    if (req.file) {
        imageUrl = req.file.path;
    }

    try {
        const event = new Event({
            title,
            description,
            date,
            venue,
            imageUrl,
            registrationLink,
            status: status || 'upcoming'
        });


        const createdEvent = await event.save();
        res.status(201).json(createdEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = async (req, res) => {
    let { title, description, date, venue, imageUrl, registrationLink, status } = req.body;

    if (req.file) {
        imageUrl = req.file.path;
    }

    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            event.title = title || event.title;
            event.description = description || event.description;
            event.date = date || event.date;
            event.venue = venue || event.venue;
            event.imageUrl = imageUrl || event.imageUrl;
            event.registrationLink = registrationLink !== undefined ? registrationLink : event.registrationLink;
            event.status = status || event.status;


            const updatedEvent = await event.save();
            res.json(updatedEvent);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (event) {
            await event.deleteOne();
            res.json({ message: 'Event removed' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
};
