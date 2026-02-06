const express = require('express');
const router = express.Router();
const {
    getTeam,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
} = require('../controllers/teamController');
const { protect, admin } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');

router.route('/')
    .get(getTeam)
    .post(protect, admin, upload.single('image'), addTeamMember);

router.route('/:id')
    .put(protect, admin, upload.single('image'), updateTeamMember)
    .delete(protect, admin, deleteTeamMember);

module.exports = router;
