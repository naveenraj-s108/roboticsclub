require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
const announcementRoutes = require('./routes/announcementRoutes');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const teamRoutes = require('./routes/teamRoutes');





// Load environment variables
// Config moved to top

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/announcements', announcementRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/team', teamRoutes);




app.get('/', (req, res) => {
    res.send('College Club Website API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: err.message || 'Internal Server Error'
    });
});

// Port Configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
