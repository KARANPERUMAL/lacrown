const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { formSubmissionLimiter } = require('../middleware/rateLimiter');

// POST /api/appointments - Submit new appointment request
router.post('/', formSubmissionLimiter, appointmentController.createAppointment);

// GET /api/appointments - List appointments (Protected by ADMIN_SECRET_KEY)
router.get('/', appointmentController.listAppointments);

module.exports = router;
