const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const config = require('./env');

let pool = null;

if (config.databaseUrl) {
  const isNeonOrSsl = config.databaseUrl.includes('neon.tech') || 
                      config.databaseUrl.includes('sslmode=require') || 
                      config.isProduction;

  pool = new Pool({
    connectionString: config.databaseUrl,
    ssl: isNeonOrSsl ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });

  pool.on('error', (err) => {
    console.error('[DB] Unexpected error on idle client:', err.message);
  });
} else {
  console.warn('[DB] No DATABASE_URL provided. Neon database queries will be disabled until configured.');
}

/**
 * Execute a parameterized SQL query
 */
async function query(text, params) {
  if (!pool) {
    throw new Error('Database not configured. Please set DATABASE_URL in environment.');
  }
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (config.nodeEnv === 'development') {
    console.log(`[DB] Executed query in ${duration}ms (Rows: ${res.rowCount})`);
  }
  return res;
}

/**
 * Automatically initialize the tables in Neon PostgreSQL if they do not exist
 */
async function initDb() {
  if (!pool) {
    console.warn('[DB] Skipping DB initialization: DATABASE_URL is not set.');
    return false;
  }

  try {
    const schemaPath = path.resolve(__dirname, '../../db/schema.sql');
    if (fs.existsSync(schemaPath)) {
      const sql = fs.readFileSync(schemaPath, 'utf8');
      await pool.query(sql);
      console.log('[DB] Neon PostgreSQL schema verified and tables initialized successfully.');
      return true;
    }
  } catch (err) {
    console.error('[DB] Error initializing schema:', err.message);
    return false;
  }
}

/**
 * Health check helper for Render / health endpoints
 */
async function checkHealth() {
  if (!pool) {
    return { connected: false, message: 'DATABASE_URL not configured' };
  }
  try {
    const result = await pool.query('SELECT NOW() as now, current_database() as db_name');
    return {
      connected: true,
      database: result.rows[0].db_name,
      serverTime: result.rows[0].now
    };
  } catch (err) {
    return {
      connected: false,
      error: err.message
    };
  }
}

module.exports = {
  pool,
  query,
  initDb,
  checkHealth
};
