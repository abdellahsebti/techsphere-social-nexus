
/**
 * API Response Utility
 * 
 * Standardize API response format across the application.
 */

/**
 * Success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {*} data - Response data
 * @returns {Object} JSON response
 */
const success = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data
  });
};

/**
 * Error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {Object} errors - Validation errors
 * @returns {Object} JSON response
 */
const error = (res, statusCode, message, errors = {}) => {
  return res.status(statusCode).json({
    status: 'error',
    message,
    errors
  });
};

/**
 * Created response (201)
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {*} data - Response data
 * @returns {Object} JSON response
 */
const created = (res, message, data = {}) => {
  return success(res, 201, message, data);
};

/**
 * OK response (200)
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {*} data - Response data
 * @returns {Object} JSON response
 */
const ok = (res, message, data = {}) => {
  return success(res, 200, message, data);
};

/**
 * No content response (204)
 * @param {Object} res - Express response object
 * @returns {Object} Empty response
 */
const noContent = (res) => {
  return res.status(204).end();
};

/**
 * Bad request response (400)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {Object} errors - Validation errors
 * @returns {Object} JSON response
 */
const badRequest = (res, message = 'Bad request', errors = {}) => {
  return error(res, 400, message, errors);
};

/**
 * Unauthorized response (401)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @returns {Object} JSON response
 */
const unauthorized = (res, message = 'Unauthorized') => {
  return error(res, 401, message);
};

/**
 * Forbidden response (403)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @returns {Object} JSON response
 */
const forbidden = (res, message = 'Forbidden') => {
  return error(res, 403, message);
};

/**
 * Not found response (404)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @returns {Object} JSON response
 */
const notFound = (res, message = 'Resource not found') => {
  return error(res, 404, message);
};

/**
 * Server error response (500)
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @returns {Object} JSON response
 */
const serverError = (res, message = 'Internal server error') => {
  return error(res, 500, message);
};

module.exports = {
  success,
  error,
  created,
  ok,
  noContent,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  serverError
};
