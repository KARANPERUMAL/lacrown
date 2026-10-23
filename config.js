/**
 * La Crown Luxury Aesthetic Clinic - Frontend Configuration
 * 
 * Update API_BASE_URL to point to your live Render backend URL once deployed.
 * If running locally, it defaults to http://localhost:8000/api.
 */
window.__CONFIG__ = {
  // Replace this with your actual Render backend URL after deploying (e.g., https://la-crown-backend.onrender.com/api)
  API_BASE_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8000/api'
    : 'https://la-crown-backend.onrender.com/api'
};
