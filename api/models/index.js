const mongoose = require('mongoose');

// Update/edit this URL if needed
const MONGO_URL = process.env.DATABASE;
const conn = mongoose.createConnection(`mongodb://localhost/${MONGO_URL}`, {
  useMongoClient: true
});

module.exports = conn;
