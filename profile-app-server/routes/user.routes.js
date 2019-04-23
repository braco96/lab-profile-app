// Routes related to user profile management

const router = require('express').Router();
const multer = require('multer');

const User = require('../models/User.model');
const isAuthenticated = require('../middleware/jwt.middleware');

// Configure multer to store uploaded files in the uploads/ directory
const upload = multer({ dest: 'uploads/' });

// GET /api/users - returns the current user based on the JWT payload
router.get('/users', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.payload._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err });
  }
});

// PUT /api/users - updates the current user's image URL
router.put('/users', isAuthenticated, async (req, res) => {
  try {
    const { image } = req.body; // Expect the image URL in the body
    const updatedUser = await User.findByIdAndUpdate(
      req.payload._id,
      { image },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err });
  }
});

// POST /api/upload - receives a file and returns its path
router.post('/upload', upload.single('image'), (req, res) => {
  // multer stores the file and makes it available as req.file
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Respond with the path so the client can store it as image URL
  res.json({ imageUrl: `/${req.file.path}` });
});

module.exports = router; // Export router to be mounted in app.js
