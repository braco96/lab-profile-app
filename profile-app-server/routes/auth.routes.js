// Routes responsible for user authentication operations

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');
const isAuthenticated = require('../middleware/jwt.middleware');

const saltRounds = 10; // cost factor for hashing passwords

// POST /auth/signup - creates a new user with encrypted password
router.post('/signup', async (req, res) => {
  const { username, password, campus, course } = req.body;
  try {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await User.create({
      username,
      password: hashedPassword,
      campus,
      course
    });
    res.status(201).json(user); // respond with the created user
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});

// POST /auth/login - verifies credentials and returns a JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a JWT containing the user id
    const payload = { _id: user._id, username: user.username };
    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET || 'secret', {
      algorithm: 'HS256',
      expiresIn: '6h'
    });

    res.json({ authToken });
  } catch (err) {
    res.status(500).json({ message: 'Error authenticating user', error: err });
  }
});

// GET /auth/verify - used by the client to check if token is still valid
router.get('/verify', isAuthenticated, (req, res) => {
  // isAuthenticated middleware attaches payload to req
  res.json(req.payload);
});

module.exports = router; // Export router to be mounted in app.js
