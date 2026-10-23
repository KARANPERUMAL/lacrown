const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const config = require('./config/env');
const db = require('./config/db');
const apiRoutes = require('./routes/api');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Validate environment configurations on startup
config.validate();

const app = express();

// Trust reverse proxies (Render, AWS, Cloudflare)
app.set('trust proxy', 1);

// Security Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS Configuration
const allowedOrigins = config.clientOrigins;

app.use(cors({
  origin: function (origin, callback) {
    // Allow server-to-server, curl, Postman, or mobile apps without origin
    if (!origin) return callback(null, true);

    // In non-production, allow any localhost/127.0.0.1
    if (!config.isProduction && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
      return callback(null, true);
    }

    // Allow configured origins or any Vercel deployment preview (*.vercel.app)
    if (allowedOrigins.includes(origin) || allowedOrigins.includes('*') || origin.endsWith('.vercel.app')) {
      return callback(null, true);
    }

    // Default: allow with warning or block
    console.warn(`[CORS] Request origin not in whitelist: ${origin}`);
    return callback(null, true); // Permissive in initial rollout so deployment isn't blocked by mismatch
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key'],
  credentials: true
}));

// Request Logging
app.use(morgan(config.isProduction ? 'combined' : 'dev'));

// Body Parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    service: 'La Crown Luxury Aesthetic Clinic API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api',
    health: '/health'
  });
});

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
