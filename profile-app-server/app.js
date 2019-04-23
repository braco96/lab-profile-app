// Express app configuration
// Sets up middlewares and routes for the profile app

require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

const app = express(); // Create Express application

// Connect to MongoDB using Mongoose
// The connection string is expected in the MONGODB_URI environment variable
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/profile-app');

// Use CORS to allow cross-origin requests from the client application
app.use(cors());

// Use morgan to log HTTP requests in the console for debugging
app.use(morgan('dev'));

// Parse incoming JSON bodies into JS objects
app.use(express.json());

// Mount authentication and user routes under their respective paths
app.use('/auth', authRoutes);
app.use('/api', userRoutes);

module.exports = app; // Export the Express app so it can be started in server.js
