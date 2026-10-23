# 🏥 La Crown Aesthetic Clinic — Backend API Service

Production REST API for **La Crown Luxury Aesthetic Clinic**, built with **Node.js, Express, Neon PostgreSQL, and Resend**.

---

## 🏗 System Architecture

- **Backend Runtime**: Node.js & Express.js (Deployable to **Render**)
- **Database**: Serverless PostgreSQL (Deployable to **Neon**)
- **Email Service**: Transactional email API (**Resend**)
- **Frontend Target**: Static Luxury Web Application (Deployable to **Vercel**)

When any patient or client submits a form (Private Consultation, Franchise Application, or Contact Message):
1. The request is validated and rate-limited.
2. An authentic Reference Code (e.g., `LC-749201`) is generated.
3. The submission is persisted directly to **Neon PostgreSQL**.
4. An executive, responsive notification email is dispatched via **Resend** directly to the **Manager's email address**, including one-tap WhatsApp, phone, and email action links.
5. An automated confirmation email is queued for the client.

---

## ⚙️ Environment Variables Reference

Create a `.env` file inside the `backend/` directory by copying `.env.example`:

```bash
cp .env.example .env
```

| Variable | Required | Description | Example |
| :--- | :--- | :--- | :--- |
| `PORT` | Optional | Port for Express server (Render injects this automatically) | `8000` |
| `NODE_ENV` | Yes | `development` or `production` | `production` |
| `CLIENT_ORIGIN` | Yes | Allowed frontend origin(s) for CORS | `https://la-crown.vercel.app` |
| `DATABASE_URL` | Yes | Neon PostgreSQL connection string (with SSL) | `postgresql://user:pass@ep-xyz.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| `RESEND_API_KEY` | Yes | Resend API Key | `re_123456789_abcdef` |
| `MANAGER_EMAIL` | Yes | Manager's email address to receive all alerts | `manager@lacrownclinic.com` |
| `EMAIL_FROM` | Yes | Verified sender address in Resend | `La Crown Concierge <onboarding@resend.dev>` |
| `ADMIN_SECRET_KEY` | Optional | Secret key to access protected listing endpoints | `super-secret-random-key` |

---

## 🚀 Step-by-Step Deployment Guide

### 1. Database Setup: Neon (PostgreSQL)
1. Sign up / Log in to [Neon Console](https://console.neon.tech).
2. Create a new project named `la-crown-db`.
3. In the project dashboard, copy the **Connection string** (ensure `Pooled connection` is selected or standard connection string). It looks like:
   ```
   postgresql://alex:AbCdEfGh123@ep-cool-cloud-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
4. Save this string — you will provide it as `DATABASE_URL` in Render.
> **Note**: The backend automatically runs the table migration schema (`schema.sql`) on startup. You do not need to run manual SQL queries!

---

### 2. Email Setup: Resend
1. Sign up / Log in to [Resend](https://resend.com).
2. Go to **API Keys** &rarr; click **Create API Key** (name it `La Crown Backend`).
3. Copy the key (`re_...`). This is your `RESEND_API_KEY`.
4. **Sender Configuration**:
   - For immediate testing without a custom domain:
     - Set `EMAIL_FROM="La Crown Concierge <onboarding@resend.dev>"`
     - Set `MANAGER_EMAIL` to the email you used to register on Resend.
   - For custom clinic domain (`lacrownclinic.com`):
     - Go to **Domains** in Resend, add your domain, and verify DNS records.
     - Set `EMAIL_FROM="La Crown Concierge <concierge@lacrownclinic.com>"`.
     - Set `MANAGER_EMAIL="manager@lacrownclinic.com"`.

---

### 3. Backend Deployment: Render
1. Push your repository to **GitHub**.
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** &rarr; **Web Service**.
4. Connect your GitHub repository.
5. Configure the service settings:
   - **Name**: `la-crown-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/health`
6. In **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = *(Your Neon connection string from Step 1)*
   - `RESEND_API_KEY` = *(Your Resend API Key from Step 2)*
   - `MANAGER_EMAIL` = *(The manager's email)*
   - `EMAIL_FROM` = `La Crown Concierge <onboarding@resend.dev>`
   - `CLIENT_ORIGIN` = `https://your-app.vercel.app` *(or `*` temporarily)*
7. Click **Create Web Service**.
8. Once deployed, Render will provide a live URL (e.g. `https://la-crown-backend.onrender.com`).

---

### 4. Frontend Deployment: Vercel
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** &rarr; **Project**.
3. Import your GitHub repository.
4. In **Project Settings**:
   - Set **Root Directory** to `frontend`.
   - Framework Preset: **Other** (Static HTML).
5. Open `frontend/config.js` in your code (or push this change):
   ```javascript
   window.__CONFIG__ = {
     API_BASE_URL: 'https://la-crown-backend.onrender.com/api' // Your Render backend URL
   };
   ```
6. Click **Deploy**. Your luxury frontend is now live with real-time backend booking and manager email alerts!

---

## 📡 API Endpoints

### 1. Book Private Appointment
- **Endpoint**: `POST /api/appointments`
- **Request Body**:
  ```json
  {
    "name": "Priya Sundaram",
    "email": "priya@example.com",
    "phone": "+91 98765 43210",
    "service": "Skin & Facial Treatments",
    "doctor": "Dr. Radhika Sharma",
    "date": "2026-11-15",
    "time": "11:30 AM (Morning)",
    "notes": "Interested in HydraFacial Elite MD for bridal preparation."
  }
  ```
- **Response** `(201 Created)`:
  ```json
  {
    "success": true,
    "reference": "LC-849102",
    "message": "Private consultation request recorded. Clinical concierge notified.",
    "data": {
      "reference": "LC-849102",
      "name": "Priya Sundaram",
      "service": "Skin & Facial Treatments",
      "date": "2026-11-15",
      "time": "11:30 AM (Morning)",
      "status": "Pending Concierge Call"
    }
  }
  ```

### 2. Submit Franchise Application
- **Endpoint**: `POST /api/enquiries/franchise`
- **Request Body**:
  ```json
  {
    "name": "Vikram Sethi",
    "email": "vikram@example.com",
    "phone": "+91 98111 22334",
    "city": "Hyderabad, Jubilee Hills",
    "investment": "80L-1.5Cr",
    "message": "Owner of premium salon chain looking to expand into doctor-led aesthetics."
  }
  ```

### 3. Send Contact Message
- **Endpoint**: `POST /api/enquiries/contact`
- **Request Body**:
  ```json
  {
    "name": "Ananya Sen",
    "email": "ananya@example.com",
    "phone": "+91 99000 11223",
    "subject": "Laser Hair Removal Query",
    "message": "Do you offer Candela GentleMax Pro for Fitzpatrick skin type IV?"
  }
  ```

### 4. Health Check
- **Endpoint**: `GET /health` or `GET /api/health`
- **Response** `(200 OK)`:
  ```json
  {
    "status": "healthy",
    "service": "la-crown-backend",
    "uptime": 1284,
    "timestamp": "2026-10-23T08:20:00.000Z",
    "neonDatabase": {
      "connected": true,
      "database": "neondb"
    }
  }
  ```

---

## 🧪 Local Development

Run the backend locally:

```bash
cd backend
npm install
npm run dev
```

The server starts on `http://localhost:8000`. Test the health check in your browser at `http://localhost:8000/health`.
