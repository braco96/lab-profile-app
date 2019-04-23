// Mongoose model defining the structure of user documents

const { Schema, model } = require('mongoose');

// Enumerations for campus and course values are extracted from lab instructions
const campusValues = [
  'Madrid',
  'Barcelona',
  'Miami',
  'Paris',
  'Berlin',
  'Amsterdam',
  'México',
  'Sao Paulo',
  'Lisbon',
  'Remote'
];

const courseValues = ['Web Dev', 'UX/UI', 'Data Analytics', 'Cyber Security'];

// Define the user schema with validation for enums and required fields
const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true }, // unique username to identify the user
    password: { type: String, required: true }, // hashed password for security
    campus: { type: String, enum: campusValues }, // campus selected from predefined list
    course: { type: String, enum: courseValues }, // course selected from predefined list
    image: String // URL to the profile picture
  },
  {
    timestamps: true // automatically manage createdAt and updatedAt fields
  }
);

module.exports = model('User', userSchema); // Export the model to be used in routes
