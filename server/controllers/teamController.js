const Team = require('../models/Team');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeam = async (req, res) => {
    try {
        const team = await Team.find().sort({ order: 1 });
        res.json(team);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a team member
// @route   POST /api/team
// @access  Private/Admin
const addTeamMember = async (req, res) => {
    let { name, role, term, imageUrl, order } = req.body;

    if (req.file) {
        imageUrl = req.file.path;
    }

    try {
        const member = new Team({
            name,
            role,
            term,
            imageUrl,
            order: order || 0
        });

        const createdMember = await member.save();
        res.status(201).json(createdMember);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private/Admin
const updateTeamMember = async (req, res) => {
    let { name, role, term, imageUrl, order } = req.body;

    if (req.file) {
        imageUrl = req.file.path;
    }

    try {
        const member = await Team.findById(req.params.id);

        if (member) {
            member.name = name || member.name;
            member.role = role || member.role;
            member.term = term || member.term;
            member.imageUrl = imageUrl || member.imageUrl;
            member.order = order !== undefined ? order : member.order;

            const updatedMember = await member.save();
            res.json(updatedMember);
        } else {
            res.status(404).json({ message: 'Team member not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
const deleteTeamMember = async (req, res) => {
    try {
        const member = await Team.findById(req.params.id);

        if (member) {
            await member.deleteOne();
            res.json({ message: 'Team member removed' });
        } else {
            res.status(404).json({ message: 'Team member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTeam,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
};
