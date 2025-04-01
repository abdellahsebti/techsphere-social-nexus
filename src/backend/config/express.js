
/**
 * Express Configuration
 * 
 * Configure Express application with middlewares and routes.
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const routes = require('../api/routes');
const errorHandler = require('../middleware/errorHandler');
const config = require('./env');
const logger = require('../utils/logger');

/**
 * Create and configure Express app
 */
const createApp = () => {
  const app = express();

  // Set security HTTP headers
  app.use(helmet());

  // Parse JSON request body
  app.use(express.json({ limit: '10mb' }));

  // Parse URL-encoded request body
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Gzip compression
  app.use(compression());

  // Enable CORS
  app.use(cors());

  // Request logging
  if (config.env !== 'production') {
    app.use(morgan('dev'));
  } else {
    app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
  }

  // API routes
  app.use('/api', routes);

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Server is running',
      timestamp: new Date().toISOString(),
      environment: config.env
    });
  });

  // Error handling middleware
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
