const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Submit a new membership application
// @route   POST /api/applications
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, studentId, department, year, skills } = req.body;

        const applicationExists = await Application.findOne({
            $or: [{ email }, { studentId }]
        });

        if (applicationExists) {
            return res.status(400).json({ message: 'Application with this email or ID already exists' });
        }

        const application = await Application.create({
            name,
            email,
            studentId,
            department,
            year,
            skills
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get all applications
// @route   GET /api/applications
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const applications = await Application.find({}).sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update application status
// @route   PUT /api/applications/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id);

        if (application) {
            application.status = status;
            const updatedApplication = await application.save();
            res.json(updatedApplication);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Check application status
// @route   GET /api/applications/status/:studentId
// @access  Public
router.get('/status/:studentId', async (req, res) => {
    try {
        const application = await Application.findOne({ studentId: req.params.studentId });
        if (application) {
            res.json({
                name: application.name,
                status: application.status
            });
        } else {
            res.status(404).json({ message: 'No application found with this ID' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
