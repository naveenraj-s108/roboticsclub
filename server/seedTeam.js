require('dotenv').config();
const mongoose = require('mongoose');
const Team = require('./models/Team');

const teamMembers = [
    {
        name: 'Naveenraj S',
        role: 'President',
        term: '2024-2025',
        order: 1
    },
    {
        name: 'Thamaraiselvan G',
        role: 'Vice President',
        term: '2024-2025',
        order: 2
    },
    {
        name: 'Ghayathree',
        role: 'Secretary',
        term: '2024-2025',
        order: 3
    },
    {
        name: 'Aravind Kumar',
        role: 'Joint Secretary',
        term: '2024-2025',
        order: 4
    },
    {
        name: 'Vasanth',
        role: 'Treasurer',
        term: '2024-2025',
        order: 5
    },
    {
        name: 'Kathirvelan',
        role: 'Joint Treasurer',
        term: '2024-2025',
        order: 6
    }
];

const seedTeam = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Cleaning old team data...');
        await Team.deleteMany({});

        console.log('Seeding new team data...');
        await Team.insertMany(teamMembers);

        console.log('Team seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding team:', error);
        process.exit(1);
    }
};

seedTeam();
