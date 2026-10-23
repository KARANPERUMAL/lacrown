const express = require('express');
const router = express.Router();

const appointmentRoutes = require('./appointmentRoutes');
const enquiryRoutes = require('./enquiryRoutes');
const healthRoutes = require('./healthRoutes');
const franchiseController = require('../controllers/franchiseController');
const contactController = require('../controllers/contactController');
const { formSubmissionLimiter } = require('../middleware/rateLimiter');

// System Health Endpoint
router.use('/health', healthRoutes);

// Appointment Consultation Bookings
router.use('/appointments', appointmentRoutes);

// Enquiries (Franchise & Contact)
router.use('/enquiries', enquiryRoutes);

// Convenient direct endpoint aliases
router.post('/contact', formSubmissionLimiter, contactController.createContactMessage);
router.post('/franchise', formSubmissionLimiter, franchiseController.createFranchiseEnquiry);

// API Root Info
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to La Crown Luxury Aesthetic Clinic REST API',
    version: '1.0.0',
    documentation: {
      endpoints: [
        'POST /api/appointments',
        'POST /api/enquiries/franchise',
        'POST /api/enquiries/contact',
        'GET  /api/health'
      ]
    }
  });
});

module.exports = router;
