const db = require('../config/db');
const emailService = require('../services/emailService');
const config = require('../config/env');

/**
 * Generate a unique La Crown Reference Code
 */
function generateReference() {
  return 'LC-' + Math.floor(100000 + Math.random() * 900000);
}

/**
 * Basic email syntax validation
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Handle new appointment / private consultation request
 */
async function createAppointment(req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      service,
      doctor = 'Any Specialist',
      date,
      time,
      notes = ''
    } = req.body;

    // Field Validations
    if (!name || !email || !phone || !service || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, phone, service, date, and time are required.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const reference = generateReference();
    const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.get('user-agent') || '';

    let appointmentRecord = null;
    let emailSent = false;
    let emailId = null;

    // 1. Save into Neon PostgreSQL Database
    if (db.pool) {
      try {
        const queryText = `
          INSERT INTO appointments (
            reference, name, email, phone, service, doctor,
            preferred_date, preferred_time, notes, ip_address, user_agent
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          RETURNING *;
        `;
        const values = [
          reference, name.trim(), email.trim(), phone.trim(),
          service.trim(), doctor.trim(), date.trim(), time.trim(),
          notes.trim(), ipAddress, userAgent
        ];

        const dbRes = await db.query(queryText, values);
        appointmentRecord = dbRes.rows[0];
      } catch (dbErr) {
        console.error('[APPOINTMENT] Database write error:', dbErr.message);
        // We log the error but still attempt email dispatch so patient isn't lost
      }
    }

    // 2. Send Manager Email via Resend
    try {
      const emailResult = await emailService.sendAppointmentEmailToManager({
        reference,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: service.trim(),
        doctor: doctor.trim(),
        date: date.trim(),
        time: time.trim(),
        notes: notes.trim()
      });

      emailSent = true;
      emailId = emailResult?.id || null;

      // Update database record if saved
      if (appointmentRecord && db.pool) {
        await db.query(
          `UPDATE appointments SET email_sent = $1, email_id = $2, updated_at = CURRENT_TIMESTAMP WHERE reference = $3`,
          [emailSent, emailId, reference]
        ).catch(e => console.warn('[DB] Could not update email status:', e.message));
      }
    } catch (emailErr) {
      console.error('[APPOINTMENT] Resend email delivery failed:', emailErr.message);
    }

    // 3. Dispatch Client Confirmation Email (Fire and forget)
    emailService.sendClientConfirmationEmail({
      reference,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date,
      time
    }).catch(e => console.warn('[APPOINTMENT] Client confirmation error:', e.message));

    // Return unified luxury response matching frontend expectations
    return res.status(201).json({
      success: true,
      reference,
      message: 'Private consultation request recorded. Clinical concierge notified.',
      data: {
        reference,
        name,
        service,
        date,
        time,
        status: 'Pending Concierge Call'
      }
    });

  } catch (err) {
    next(err);
  }
}

/**
 * List appointments (Protected by ADMIN_SECRET_KEY)
 */
async function listAppointments(req, res, next) {
  try {
    const authHeader = req.headers['x-admin-key'] || req.query.admin_key;
    if (authHeader !== config.adminSecretKey) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid admin credentials.'
      });
    }

    if (!db.pool) {
      return res.status(503).json({
        success: false,
        message: 'Database connection not available.'
      });
    }

    const { limit = 50, offset = 0 } = req.query;
    const queryText = `
      SELECT * FROM appointments
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2;
    `;
    const result = await db.query(queryText, [parseInt(limit, 10), parseInt(offset, 10)]);

    return res.json({
      success: true,
      total: result.rowCount,
      data: result.rows
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createAppointment,
  listAppointments
};
