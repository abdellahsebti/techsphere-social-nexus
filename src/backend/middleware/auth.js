
/**
 * Authentication Middleware
 * 
 * Verify JWT tokens and authenticate requests.
 */
const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/user.model');
const apiResponse = require('../utils/apiResponse');

/**
 * Authenticate user using JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const auth = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return apiResponse.unauthorized(res, 'Authentication required');
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    // Verify token
    const decoded = jwt.verify(token, config.jwt.secret);
    
    // Check if user exists
    const user = await User.findById(decoded.sub).select('-password');
    
    if (!user) {
      return apiResponse.unauthorized(res, 'User not found');
    }
    
    // Check if token is in user's tokens
    const tokenExists = user.tokens.some(t => t.token === token);
    
    if (!tokenExists) {
      return apiResponse.unauthorized(res, 'Token is invalid');
    }
    
    // Attach user and token to request
    req.user = user;
    req.token = token;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return apiResponse.unauthorized(res, 'Invalid token');
    }
    
    if (error.name === 'TokenExpiredError') {
      return apiResponse.unauthorized(res, 'Token expired');
    }
    
    return apiResponse.serverError(res, 'Authentication error');
  }
};

/**
 * Check if user has required role
 * @param {String|Array} roles - Required role(s)
 * @returns {Function} Middleware function
 */
const checkRole = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return apiResponse.unauthorized(res, 'Authentication required');
    }
    
    const userRole = req.user.role;
    const allowedRoles = Array.isArray(roles) ? roles : [roles];
    
    if (!allowedRoles.includes(userRole)) {
      return apiResponse.forbidden(res, 'Insufficient permissions');
    }
    
    next();
  };
};

module.exports = {
  auth,
  checkRole
};
