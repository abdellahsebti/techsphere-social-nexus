
/**
 * TechSphere API Server
 * 
 * This is the main entry point for the TechSphere backend.
 * It sets up the Express app, connects to the database,
 * and starts the HTTP server with WebSocket support.
 */
const http = require('http');
const createApp = require('./config/express');
const connectDB = require('./config/database');
const setupSocketIO = require('./websockets/socket');
const config = require('./config/env');
const logger = require('./utils/logger');

// Create Express app
const app = createApp();

// Create HTTP server
const server = http.createServer(app);

// Set up Socket.io
const io = setupSocketIO(server);

// Store Socket.io instance for use in routes
app.set('io', io);

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start server
    server.listen(config.port, () => {
      logger.info(`Server running on port ${config.port} in ${config.env} mode`);
    });
  })
  .catch((error) => {
    logger.error(`Failed to connect to database: ${error.message}`);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION:', err);
  // Close server & exit process
  server.close(() => process.exit(1));
});
