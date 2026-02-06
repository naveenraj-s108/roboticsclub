const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
