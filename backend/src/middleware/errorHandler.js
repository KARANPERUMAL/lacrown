const config = require('../config/env');

/**
 * Production-ready Global Error Handling Middleware
 */
function errorHandler(err, req, res, next) {
  // Always log the error details to server console
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err);

  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    message: err.message || 'An unexpected internal server error occurred.'
  };

  // Only expose stack traces in development mode for security
  if (!config.isProduction) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}

/**
 * 404 Route Not Found Handler
 */
function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: `Resource not found on La Crown API: ${req.method} ${req.originalUrl}`
  });
}

module.exports = {
  errorHandler,
  notFoundHandler
};
