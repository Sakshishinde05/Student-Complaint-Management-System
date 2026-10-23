const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const complaintRoutes = require('./routes/complaints');
const userRoutes = require('./routes/users');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/users', require('./routes/users'));

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/complaint_system')
    .then(() => {
        console.log('Connected to MongoDB');
        seedAdmin();
    })
    .catch((err) => console.error('MongoDB connection error:', err));

// Seed Admin User
const seedAdmin = async () => {
    try {
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (!adminExists) {
            const hashedPassword = await bcrypt.hash('admin123', 10);
            await User.create({
                name: 'Admin',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin',
            });
            console.log('Admin user seeded');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
