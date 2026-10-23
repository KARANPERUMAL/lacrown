const { Resend } = require('resend');
const config = require('../config/env');

let resendClient = null;

if (config.resendApiKey) {
  resendClient = new Resend(config.resendApiKey);
} else {
  console.warn('[EMAIL] RESEND_API_KEY is not set. Resend email dispatch will be simulated in console.');
}

/**
 * Shared Luxury Email Layout for La Crown Aesthetic Clinic
 */
function wrapEmailTemplate({ title, badge, content, actionUrl, actionText }) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f9f6f2;font-family:'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#300814;line-height:1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f9f6f2;padding:30px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ebd9c5;box-shadow:0 8px 24px rgba(118,13,37,0.06);" cellspacing="0" cellpadding="0">
          
          <!-- Luxury Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #541122 0%, #760d25 50%, #300814 100%);padding:32px 30px;text-align:center;color:#ffffff;border-bottom:3px solid #d6af66;">
              <div style="font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#d6af66;margin-bottom:8px;font-weight:700;">
                LA CROWN AESTHETIC CLINIC
              </div>
              <h1 style="margin:0;font-size:22px;font-weight:600;letter-spacing:0.02em;color:#ffffff;font-family:Georgia,serif;">
                ${title}
              </h1>
              ${badge ? `
                <div style="display:inline-block;margin-top:14px;background:rgba(214,175,102,0.22);color:#fce4a6;border:1px solid #d6af66;padding:4px 14px;border-radius:20px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">
                  ${badge}
                </div>
              ` : ''}
            </td>
          </tr>

          <!-- Main Content Area -->
          <tr>
            <td style="padding:32px 30px;background-color:#ffffff;">
              ${content}
              
              ${actionUrl && actionText ? `
                <div style="margin:32px 0 16px;text-align:center;">
                  <a href="${actionUrl}" style="display:inline-block;background:#760d25;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;padding:14px 28px;border-radius:6px;box-shadow:0 4px 12px rgba(118,13,37,0.25);">
                    ${actionText}
                  </a>
                </div>
              ` : ''}
            </td>
          </tr>

          <!-- Luxury Footer -->
          <tr>
            <td style="background-color:#fff9f5;padding:24px 30px;border-top:1px solid #f0e2d5;text-align:center;font-size:12px;color:#746970;">
              <p style="margin:0 0 8px;font-weight:600;color:#541122;">
                ${config.clinicName}
              </p>
              <p style="margin:0 0 10px;font-size:11px;color:#8a7c85;">
                ${config.clinicAddress} &bull; ${config.clinicPhone}
              </p>
              <p style="margin:0;font-size:10px;color:#a89ea5;">
                This is an automated dispatch from the La Crown Web Portal &bull; Generated at ${new Date().toUTCString()}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

/**
 * 1. Send Appointment Request Notification to Manager
 */
async function sendAppointmentEmailToManager(data) {
  const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${cleanPhone}`;
  const telLink = `tel:${data.phone}`;
  const mailLink = `mailto:${data.email}`;

  const content = `
    <div style="border-left:4px solid #760d25;padding-left:14px;margin-bottom:24px;">
      <p style="margin:0;font-size:15px;color:#541122;font-weight:600;">
        A new private consultation request has been submitted by <b>${data.name}</b>.
      </p>
      <p style="margin:4px 0 0;font-size:13px;color:#746970;">
        Reference Code: <strong style="color:#760d25;letter-spacing:0.05em;">${data.reference}</strong>
      </p>
    </div>

    <!-- Details Table -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #ebd9c5;border-radius:8px;background:#fdfcfb;margin-bottom:24px;">
      <tr style="border-bottom:1px solid #ebd9c5;">
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;width:35%;border-bottom:1px solid #f0e2d5;">Patient Name</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Phone / WhatsApp</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">
          <a href="${telLink}" style="color:#760d25;text-decoration:none;font-weight:600;">${data.phone}</a>
          &nbsp;&bull;&nbsp;
          <a href="${waLink}" style="color:#2e7d32;text-decoration:none;font-weight:600;">Open WhatsApp &rarr;</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Email Address</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">
          <a href="${mailLink}" style="color:#760d25;text-decoration:none;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Treatment Area</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;font-weight:600;border-bottom:1px solid #f0e2d5;">${data.service}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Requested Doctor</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">${data.doctor || 'Any Specialist'}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Preferred Date & Time</td>
        <td style="padding:12px 16px;font-size:13px;color:#760d25;font-weight:700;border-bottom:1px solid #f0e2d5;">${data.date} &bull; ${data.time}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;">Clinical Notes / Goals</td>
        <td style="padding:12px 16px;font-size:13px;color:#555555;font-style:italic;">${data.notes ? data.notes.replace(/\n/g, '<br>') : 'None provided'}</td>
      </tr>
    </table>

    <!-- Quick Concierge Action Strip -->
    <div style="background:#fff9f5;border:1px dashed #d6af66;border-radius:8px;padding:16px;text-align:center;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:600;color:#541122;text-transform:uppercase;letter-spacing:0.05em;">
        Clinical Concierge Quick Actions
      </p>
      <div style="display:inline-flex;gap:12px;flex-wrap:wrap;justify-content:center;">
        <a href="${waLink}" style="background:#2e7d32;color:#ffffff;text-decoration:none;font-size:12px;font-weight:600;padding:8px 16px;border-radius:4px;display:inline-block;">
          WhatsApp Patient
        </a>
        <a href="${telLink}" style="background:#541122;color:#ffffff;text-decoration:none;font-size:12px;font-weight:600;padding:8px 16px;border-radius:4px;display:inline-block;">
          Call Phone
        </a>
        <a href="${mailLink}" style="background:#d6af66;color:#300814;text-decoration:none;font-size:12px;font-weight:600;padding:8px 16px;border-radius:4px;display:inline-block;">
          Email Patient
        </a>
      </div>
    </div>
  `;

  const html = wrapEmailTemplate({
    title: 'New Appointment Request',
    badge: 'Immediate Action Required',
    content,
    actionUrl: waLink,
    actionText: 'Confirm Consultation via WhatsApp'
  });

  return sendResendEmail({
    to: config.managerEmail,
    subject: `🚨 [New Consultation] ${data.name} - ${data.service} (${data.reference})`,
    html
  });
}

/**
 * 2. Send Franchise Inquiry Notification to Manager
 */
async function sendFranchiseEmailToManager(data) {
  const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${cleanPhone}`;
  const telLink = `tel:${data.phone}`;
  const mailLink = `mailto:${data.email}`;

  const content = `
    <div style="border-left:4px solid #d6af66;padding-left:14px;margin-bottom:24px;">
      <p style="margin:0;font-size:15px;color:#541122;font-weight:600;">
        High-Value Franchise Expression of Interest from <b>${data.name}</b>.
      </p>
      <p style="margin:4px 0 0;font-size:13px;color:#746970;">
        Reference: <strong style="color:#760d25;">${data.reference}</strong>
      </p>
    </div>

    <!-- Details Table -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #ebd9c5;border-radius:8px;background:#fdfcfb;margin-bottom:24px;">
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;width:35%;border-bottom:1px solid #f0e2d5;">Investor Name</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Target City / Territory</td>
        <td style="padding:12px 16px;font-size:13px;color:#760d25;font-weight:700;border-bottom:1px solid #f0e2d5;">${data.city}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Investment Capacity</td>
        <td style="padding:12px 16px;font-size:13px;color:#2e7d32;font-weight:700;border-bottom:1px solid #f0e2d5;">${data.investment}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Phone Number</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">
          <a href="${telLink}" style="color:#760d25;text-decoration:none;font-weight:600;">${data.phone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Email Address</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">
          <a href="${mailLink}" style="color:#760d25;text-decoration:none;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;">Business Experience / Notes</td>
        <td style="padding:12px 16px;font-size:13px;color:#555555;font-style:italic;">${data.message ? data.message.replace(/\n/g, '<br>') : 'None provided'}</td>
      </tr>
    </table>
  `;

  const html = wrapEmailTemplate({
    title: 'Franchise Partner Inquiry',
    badge: 'Prospectus Requested',
    content,
    actionUrl: telLink,
    actionText: 'Contact Prospective Franchisee'
  });

  return sendResendEmail({
    to: config.managerEmail,
    subject: `💼 [Franchise Prospect] ${data.name} - ${data.city} (${data.investment}) [${data.reference}]`,
    html
  });
}

/**
 * 3. Send General Contact Message to Manager
 */
async function sendContactEmailToManager(data) {
  const cleanPhone = (data.phone || '').replace(/[^0-9]/g, '');
  const waLink = `https://wa.me/${cleanPhone}`;
  const telLink = `tel:${data.phone}`;
  const mailLink = `mailto:${data.email}`;

  const content = `
    <div style="border-left:4px solid #760d25;padding-left:14px;margin-bottom:24px;">
      <p style="margin:0;font-size:15px;color:#541122;font-weight:600;">
        New general patient / clinic inquiry received from <b>${data.name}</b>.
      </p>
      <p style="margin:4px 0 0;font-size:13px;color:#746970;">
        Reference: <strong style="color:#760d25;">${data.reference}</strong>
      </p>
    </div>

    <!-- Details Table -->
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #ebd9c5;border-radius:8px;background:#fdfcfb;margin-bottom:24px;">
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;width:35%;border-bottom:1px solid #f0e2d5;">Sender Name</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Subject</td>
        <td style="padding:12px 16px;font-size:13px;color:#760d25;font-weight:600;border-bottom:1px solid #f0e2d5;">${data.subject || 'Clinical Inquiry'}</td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Phone Number</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">
          <a href="${telLink}" style="color:#760d25;text-decoration:none;font-weight:600;">${data.phone}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;border-bottom:1px solid #f0e2d5;">Email Address</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;border-bottom:1px solid #f0e2d5;">
          <a href="${mailLink}" style="color:#760d25;text-decoration:none;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 16px;font-weight:600;font-size:13px;color:#541122;">Message Body</td>
        <td style="padding:12px 16px;font-size:13px;color:#300814;">${data.message ? data.message.replace(/\n/g, '<br>') : ''}</td>
      </tr>
    </table>
  `;

  const html = wrapEmailTemplate({
    title: 'Clinic Contact Message',
    badge: 'Clinical Desk Inquiry',
    content,
    actionUrl: mailLink,
    actionText: 'Reply Directly to Patient'
  });

  return sendResendEmail({
    to: config.managerEmail,
    subject: `📩 [Clinic Desk] ${data.subject || 'New Message'} - ${data.name} [${data.reference}]`,
    html
  });
}

/**
 * 4. Send Confirmation Email to Client / Patient
 */
async function sendClientConfirmationEmail(data) {
  if (!data.email) return;

  const content = `
    <p style="font-size:15px;color:#541122;margin:0 0 16px;">
      Dear <b>${data.name}</b>,
    </p>
    <p style="font-size:14px;color:#300814;line-height:1.7;margin:0 0 16px;">
      Thank you for contacting <b>${config.clinicName}</b>. Your request has been securely logged in our medical administration system under reference code:
    </p>
    <div style="background:#541122;color:#ffffff;padding:12px 20px;border-radius:6px;font-size:16px;font-weight:700;letter-spacing:0.1em;text-align:center;margin:20px 0;">
      REFERENCE: ${data.reference}
    </div>
    <p style="font-size:13px;color:#746970;line-height:1.7;margin:0 0 16px;">
      Our clinical concierge desk will review your details and contact you at <b>${data.phone}</b> shortly to confirm your booking and answer any clinical questions.
    </p>
    <p style="font-size:12px;color:#8a7c85;border-top:1px solid #ebd9c5;padding-top:14px;margin:20px 0 0;">
      If you require immediate assistance or prefer WhatsApp communication, feel free to reach our priority concierge at <b>${config.clinicPhone}</b>.
    </p>
  `;

  const html = wrapEmailTemplate({
    title: 'Request Received',
    badge: 'La Crown Concierge Desk',
    content
  });

  // Attempt to send confirmation to client (gracefully catch if unverified in Resend sandbox)
  try {
    return await sendResendEmail({
      to: data.email,
      subject: `La Crown Aesthetic Clinic — Request Received (${data.reference})`,
      html
    });
  } catch (err) {
    console.warn(`[EMAIL] Could not deliver client confirmation to ${data.email} (likely unverified domain in Resend trial mode):`, err.message);
  }
}

/**
 * Internal dispatch helper through Resend
 */
async function sendResendEmail({ to, subject, html }) {
  if (!resendClient) {
    console.log(`\n======================================================`);
    console.log(`[EMAIL SIMULATION] Resend API Key not present`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`From: ${config.emailFrom}`);
    console.log(`======================================================\n`);
    return { success: true, id: `mock-email-${Date.now()}`, simulated: true };
  }

  try {
    const payload = {
      from: config.emailFrom,
      to: Array.isArray(to) ? to : [to],
      subject,
      html
    };

    if (config.auditEmail) {
      payload.bcc = [config.auditEmail];
    }

    const { data, error } = await resendClient.emails.send(payload);

    if (error) {
      console.error('[EMAIL ERROR] Resend returned error:', error);
      throw new Error(error.message || 'Resend email dispatch failed');
    }

    console.log(`[EMAIL SENT] Resend successfully sent email to ${to} (ID: ${data.id})`);
    return { success: true, id: data.id };
  } catch (err) {
    console.error('[EMAIL ERROR] Exception sending email via Resend:', err.message);
    throw err;
  }
}

module.exports = {
  sendAppointmentEmailToManager,
  sendFranchiseEmailToManager,
  sendContactEmailToManager,
  sendClientConfirmationEmail
};
