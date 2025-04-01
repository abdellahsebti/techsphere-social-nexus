
/**
 * Global Error Handler Middleware
 * 
 * Centralized error handling for the application.
 */
const logger = require('../utils/logger');
const mongoose = require('mongoose');

/**
 * Error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = {};
  
  // Log error
  logger.error(`${statusCode} - ${message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, { 
    stack: err.stack,
    body: req.body
  });
  
  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation Error';
    errors = Object.values(err.errors).reduce((acc, error) => {
      acc[error.path] = error.message;
      return acc;
    }, {});
  }
  
  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate Key Error';
    const field = Object.keys(err.keyValue)[0];
    errors[field] = `${field} already exists`;
  }
  
  // Mongoose cast error
  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid ID';
    errors[err.path] = `Invalid ${err.kind}`;
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }
  
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }
  
  // Response
  res.status(statusCode).json({
    status: 'error',
    message,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

module.exports = errorHandler;
