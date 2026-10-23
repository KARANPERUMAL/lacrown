const dotenv = require('dotenv');
const path = require('path');

// Load .env file from root of backend
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
  port: parseInt(process.env.PORT, 10) || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',

  // Allowed CORS origins for the Vercel frontend and local development
  clientOrigins: process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(',').map(origin => origin.trim()).filter(Boolean)
    : ['http://localhost:5050', 'http://localhost:3000', 'http://127.0.0.1:5500'],

  // Database Connection (Neon PostgreSQL)
  databaseUrl: process.env.DATABASE_URL || '',

  // Resend Email Configuration
  resendApiKey: process.env.RESEND_API_KEY || '',
  managerEmail: process.env.MANAGER_EMAIL || 'manager@lacrownclinic.com',
  emailFrom: process.env.EMAIL_FROM || 'La Crown Concierge <onboarding@resend.dev>',
  auditEmail: process.env.AUDIT_EMAIL || '',

  // Security & Clinic Info
  adminSecretKey: process.env.ADMIN_SECRET_KEY || 'default-secret-change-in-production',
  clinicName: process.env.CLINIC_NAME || 'La Crown Luxury Aesthetic Clinic',
  clinicPhone: process.env.CLINIC_PHONE || '+91 96061 51079',
  clinicAddress: process.env.CLINIC_ADDRESS || 'No. 37, Ashoka Pillar Road, 2nd Block, Jayanagar, Bengaluru 560011'
};

// Diagnostics helper
config.validate = () => {
  const missing = [];
  if (!config.resendApiKey) missing.push('RESEND_API_KEY');
  if (!config.databaseUrl) missing.push('DATABASE_URL');
  if (!process.env.MANAGER_EMAIL) missing.push('MANAGER_EMAIL');

  if (missing.length > 0) {
    console.warn(`[WARN] The following environment variables are missing: ${missing.join(', ')}.`);
    if (config.isProduction) {
      console.warn('[SECURITY] On Render, configure these in the Environment tab.');
    } else {
      console.warn('[DEV] For local testing, copy .env.example to .env and fill in your keys.');
    }
  }
};

module.exports = config;
