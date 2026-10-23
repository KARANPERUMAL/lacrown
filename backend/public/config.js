/**
 * La Crown Luxury Aesthetic Clinic - Frontend Configuration
 * 
 * Connected to live Render backend API: https://lacrown.onrender.com/api
 */
window.__CONFIG__ = {
  API_BASE_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000/api'
    : 'https://lacrown.onrender.com/api'
};
