
/**
 * Database Configuration
 * 
 * Configure and establish connection to MongoDB database.
 */
const mongoose = require('mongoose');
const config = require('./env');
const logger = require('../utils/logger');

mongoose.Promise = global.Promise;

// Set mongoose options
mongoose.set('strictQuery', false);

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.database.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    logger.error(`Error connecting to database: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
