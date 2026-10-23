const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const config = require('./config/env');
const db = require('./config/db');
const apiRoutes = require('./routes/api');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Validate environment configurations on startup
config.validate();

const app = express();

// Trust reverse proxies (Render, AWS, Cloudflare)
app.set('trust proxy', 1);

// Security Headers (CSP disabled so frontend can connect to Render API without restriction)
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false
}));

// CORS Configuration - Reflects requesting origin for seamless Vercel <-> Render communication
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key'],
  credentials: true
}));

// Request Logging
app.use(morgan(config.isProduction ? 'combined' : 'dev'));

// Body Parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Static Frontend Files (serves luxury website directly from backend if Root Directory is backend)
const publicDir = path.join(__dirname, '../public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// Render / Platform Top-Level Health Check Endpoint
app.get('/health', async (req, res) => {
  const dbHealth = await db.checkHealth();
  const isHealthy = dbHealth.connected || !config.databaseUrl;
  res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'degraded',
    service: 'la-crown-backend',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    neonDatabase: dbHealth
  });
});

// Mount Main API Router
app.use('/api', apiRoutes);

// Frontend SPA HTML Fallback (Serves index.html for root and client routes)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path === '/health') return next();
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  // Fallback API welcome if no frontend files found
  res.json({
    service: 'La Crown Luxury Aesthetic Clinic API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api',
    health: '/health'
  });
});

// 404 & Centralized Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

// Start Server and Initialize Database
const PORT = config.port;
const server = app.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(` ✨ La Crown Backend Service Online`);
  console.log(` 🌐 Port: ${PORT} | Environment: ${config.nodeEnv}`);
  console.log(` 🏥 Manager Email: ${config.managerEmail}`);
  console.log(` 📧 Resend Status: ${config.resendApiKey ? 'Active' : 'Simulation Mode (Key Missing)'}`);
  console.log(` 🐘 Neon DB: ${config.databaseUrl ? 'Configured' : 'Missing DATABASE_URL'}`);
  console.log(`======================================================\n`);

  // Initialize DB tables automatically on startup
  if (config.databaseUrl) {
    await db.initDb();
  }
});

// Graceful Shutdown Handling
function gracefulShutdown(signal) {
  console.log(`\n[SHUTDOWN] Received ${signal}. Closing HTTP server gracefully...`);
  server.close(async () => {
    console.log('[SHUTDOWN] HTTP server closed.');
    if (db.pool) {
      await db.pool.end();
      console.log('[SHUTDOWN] Database pool closed.');
    }
    process.exit(0);
  });

  // Force shutdown if taking too long
  setTimeout(() => {
    console.error('[SHUTDOWN] Forced shutdown after timeout.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

module.exports = app;
