const db = require('../config/db');
const emailService = require('../services/emailService');
const config = require('../config/env');

function generateReference() {
  return 'LC-' + Math.floor(100000 + Math.random() * 900000);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Handle new contact message / general patient enquiry
 */
async function createContactMessage(req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      subject = 'General Clinical Enquiry',
      message
    } = req.body;

    // Field Validations
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: name, email, phone, and message are required.'
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

    let contactRecord = null;
    let emailSent = false;
    let emailId = null;

    // 1. Save into Neon PostgreSQL Database
    if (db.pool) {
      try {
        const queryText = `
          INSERT INTO contact_messages (
            reference, name, email, phone, subject,
            message, ip_address, user_agent
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `;
        const values = [
          reference, name.trim(), email.trim(), phone.trim(),
          (subject || 'General Enquiry').trim(), message.trim(), ipAddress, userAgent
        ];

        const dbRes = await db.query(queryText, values);
        contactRecord = dbRes.rows[0];
      } catch (dbErr) {
        console.error('[CONTACT] Database write error:', dbErr.message);
      }
    }

    // 2. Send Manager Email via Resend
    try {
      const emailResult = await emailService.sendContactEmailToManager({
        reference,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        subject: (subject || 'General Clinical Enquiry').trim(),
        message: message.trim()
      });

      emailSent = true;
      emailId = emailResult?.id || null;

      if (contactRecord && db.pool) {
        await db.query(
          `UPDATE contact_messages SET email_sent = $1, email_id = $2, updated_at = CURRENT_TIMESTAMP WHERE reference = $3`,
          [emailSent, emailId, reference]
        ).catch(e => console.warn('[DB] Could not update contact email status:', e.message));
      }
    } catch (emailErr) {
      console.error('[CONTACT] Resend email delivery failed:', emailErr.message);
    }

    // 3. Dispatch Client Confirmation Email
    emailService.sendClientConfirmationEmail({
      reference,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim()
    }).catch(e => console.warn('[CONTACT] Client confirmation error:', e.message));

    return res.status(201).json({
      success: true,
      reference,
      message: 'Message delivered to clinical desk. Concierge notified.',
      data: {
        reference,
        name,
        subject
      }
    });

  } catch (err) {
    next(err);
  }
}

/**
 * List contact messages (Protected)
 */
async function listContactMessages(req, res, next) {
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
      SELECT * FROM contact_messages
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
  createContactMessage,
  listContactMessages
};
