// api/index.js – Vercel Serverless Function entry point
const serverless = require('serverless-http');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Connect to MongoDB
if (mongoose.connection.readyState === 0) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));
}

const app = express();
app.use(cors());
app.use(express.json());

// Import existing route modules (relative to project root)
const authRoutes = require('../server/routes/auth');
const eventRoutes = require('../server/routes/events');
const bookingRoutes = require('../server/routes/bookings');

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

module.exports = serverless(app);
