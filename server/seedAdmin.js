const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');

        const adminEmail = 'roboticsclubrgcet@gmail.com';
        const adminPassword = 'rgcet@1999';

        let admin = await User.findOne({ email: adminEmail });

        if (admin) {
            console.log('Admin user already exists. Updating password...');
            admin.password = adminPassword;
            await admin.save();
            console.log('Admin password updated successfully');
        } else {
            console.log('Creating new admin user...');
            admin = new User({
                name: 'Site Admin',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'
            });
            await admin.save();
            console.log('Admin user created successfully');
        }

        console.log(`Email: ${adminEmail}`);
        console.log(`Password: ${adminPassword}`);

        process.exit();

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
