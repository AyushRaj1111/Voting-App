const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURI = process.env.MONGO_URI;
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/VotingApp";

if (!mongoURI) {
  console.error('MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}
// Define the MongoDB connection URL
//const mongoURL = process.env.MONGODB_URL_LOCAL
 // Replace 'mydatabase' with your database name
// const mongoURL= "mongodb://localhost:27017/VotingApp";
// const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
async function connectToDatabase() {
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB server');
      console.log('Database will be created automatically when data is first inserted');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    }
  }
// Call the connect function
connectToDatabase();

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;

