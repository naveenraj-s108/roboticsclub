const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    imageUrl: { type: String },
    registrationLink: { type: String },
    status: { type: String, enum: ['upcoming', 'completed'], default: 'upcoming' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
