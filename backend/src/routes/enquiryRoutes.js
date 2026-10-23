const express = require('express');
const router = express.Router();
const franchiseController = require('../controllers/franchiseController');
const contactController = require('../controllers/contactController');
const { formSubmissionLimiter } = require('../middleware/rateLimiter');

// POST /api/enquiries/franchise
router.post('/franchise', formSubmissionLimiter, franchiseController.createFranchiseEnquiry);

// GET /api/enquiries/franchise (Protected)
router.get('/franchise', franchiseController.listFranchiseEnquiries);

// POST /api/enquiries/contact
router.post('/contact', formSubmissionLimiter, contactController.createContactMessage);

// GET /api/enquiries/contact (Protected)
router.get('/contact', contactController.listContactMessages);

module.exports = router;
