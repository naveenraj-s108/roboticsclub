const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    term: { type: String, required: true }, // e.g., "2024-2025"
    imageUrl: { type: String },
    order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Team', teamSchema);
