// Entry point of the server application
// Loads environment variables and starts the Express server

const app = require('./app'); // Import the Express app

// Define the port from environment or fallback to 5005
const PORT = process.env.PORT || 5005;

// Start listening to incoming requests
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
