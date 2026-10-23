const express = require('express');
const router = express.Router();
const db = require('../config/db');
const config = require('../config/env');

router.get('/', async (req, res) => {
  const dbHealth = await db.checkHealth();
  const isHealthy = dbHealth.connected || !config.databaseUrl;

  const status = {
    status: isHealthy ? 'healthy' : 'degraded',
    service: 'la-crown-backend',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    integrations: {
      neonDatabase: dbHealth,
      resendEmail: {
        configured: Boolean(config.resendApiKey),
        managerRecipient: config.managerEmail ? 'configured' : 'missing'
      }
    }
  };

  const httpCode = isHealthy ? 200 : 503;
  return res.status(httpCode).json(status);
});

module.exports = router;
