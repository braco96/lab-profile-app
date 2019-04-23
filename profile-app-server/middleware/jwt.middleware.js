// Middleware that checks for a valid JWT in the Authorization header
// Used to protect routes that require authentication

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Retrieve the token from the "Authorization" header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    // If no header is present respond with 401 Unauthorized
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.replace('Bearer ', ''); // Remove the Bearer prefix

  try {
    // Verify token and attach payload to request for later use
    const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'secret');
    req.payload = payload;
    next(); // Token is valid, continue to the route handler
  } catch (err) {
    // If verification fails respond with 401
    res.status(401).json({ message: 'Invalid token' });
  }
};
