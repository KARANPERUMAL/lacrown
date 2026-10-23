const rateLimit = require('express-rate-limit');

/**
 * Rate limiter for form submission endpoints to prevent spam & abuse
 */
const formSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 30 requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please wait a few moments or contact our clinic directly at +91 96061 51079.'
  }
});

/**
 * General API limiter for health/read endpoints
 */
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  formSubmissionLimiter,
  apiLimiter
};
