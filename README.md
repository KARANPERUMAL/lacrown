# 👑 La Crown Luxury Aesthetic Clinic — Fullstack Web Application

A doctor-led luxury aesthetic clinic platform designed for **La Crown Aesthetic Clinic** (Bengaluru).

This repository is organized into a clean decoupled architecture:
- 🎨 **`frontend/`**: Static luxury single-page application ready to deploy on **Vercel**.
- ⚙️ **`backend/`**: Production Node.js & Express REST API ready to deploy on **Render**, connected to **Neon** (PostgreSQL) and **Resend** (Email API).

---

## 📁 Repository Structure

```
la-crown-website/
├── frontend/                     # Frontend Application (Deploy to Vercel)
│   ├── index.html                # Main clinical portal & all 10 pages
│   ├── preview.js                # Form submission engine, routing, interactive triage
│   ├── config.js                 # API base URL configuration (Local vs Render)
│   ├── vercel.json               # Vercel deployment & security headers configuration
│   ├── src/
│   │   └── styles.css            # Luxury burgundy & champagne gold design system
│   ├── logo.png                  # La Crown emblem
│   ├── favicon.png               # Browser icon
│   └── hero_bg.jpg               # Hero background asset
│
├── backend/                      # Backend Service (Deploy to Render)
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.js            # Environment variable validation & defaults
│   │   │   └── db.js             # Neon PostgreSQL connection pool & auto-migration
│   │   ├── controllers/
│   │   │   ├── appointmentController.js  # Consultation booking & manager alerts
│   │   │   ├── franchiseController.js    # Franchise application processing
│   │   │   └── contactController.js      # Patient clinical message processing
│   │   ├── middleware/
│   │   │   ├── errorHandler.js   # Production-safe error handling
│   │   │   └── rateLimiter.js    # Form submission spam prevention
│   │   ├── routes/
│   │   │   ├── api.js            # Unified API router
│   │   │   ├── appointmentRoutes.js
│   │   │   ├── enquiryRoutes.js
│   │   │   └── healthRoutes.js
│   │   ├── services/
│   │   │   └── emailService.js   # Resend executive HTML email templates
│   │   └── server.js             # Express app entry, Helmet, CORS, graceful shutdown
│   ├── db/
│   │   └── schema.sql            # Neon PostgreSQL database DDL schema
│   ├── .env.example              # Documented environment variables template
│   ├── render.yaml               # Render Blueprint for 1-click cloud deployment
│   ├── package.json              # Backend dependencies
│   └── README.md                 # Detailed backend setup & deployment guide
│
└── README.md                     # Root project documentation
```

---

## 🔄 Form Submission & Email Workflow

Whenever a user submits one of the 3 forms on the website:
1. **Private Consultation Request** (`#appointmentForm`):
   - Generates authentic reference code (`LC-xxxxxx`).
   - Inserts booking into **Neon PostgreSQL** `appointments` table.
   - Sends an **Executive Notification Email to Manager** via **Resend** with one-click WhatsApp, Phone, and Email concierge actions.
   - Sends an automated booking confirmation to the patient.
2. **Franchise Expression of Interest** (`#franchiseForm`):
   - Stores investor profile, city, and capital bracket (`60-80L`, `80L-1.5Cr`, `1.5Cr+`) into **Neon** `franchise_enquiries`.
   - Sends high-priority investor notification email to the manager.
3. **Contact / Clinical Message** (`#contactForm`):
   - Stores message into **Neon** `contact_messages`.
   - Sends message details to the manager with direct reply link.

---

## 🚀 Quick Start (Local Development)

### 1. Run the Backend:
```bash
cd backend
npm install
npm run dev
```
The backend starts at `http://localhost:8000`. Test the health check at `http://localhost:8000/health`.

### 2. Run the Frontend:
In a separate terminal:
```bash
cd frontend
# Using Python:
python -m http.server 5050
# Or using Node:
npx serve .
```
Visit `http://localhost:5050` in your browser. All form submissions will automatically communicate with your local backend.

---

## 🌐 Production Deployment Guide

### A. Database (Neon PostgreSQL)
1. Sign up at [neon.tech](https://neon.tech) and create a database named `la-crown-db`.
2. Copy your PostgreSQL connection string (`postgresql://...sslmode=require`).
3. The backend automatically auto-creates all required tables on startup.

### B. Email Service (Resend)
1. Sign up at [resend.com](https://resend.com) and generate an API Key.
2. If using domain verification, add `lacrownclinic.com` in Resend domains; otherwise use `onboarding@resend.dev` in sandbox testing.
3. Set `MANAGER_EMAIL` to the email where you want to receive booking notifications.

### C. Backend (Render)
1. Push this repository to GitHub.
2. On [Render](https://render.com), create a new **Web Service** pointing to your repository.
3. Set **Root Directory** to `backend`.
4. Configure environment variables:
   - `DATABASE_URL`: *(Your Neon connection string)*
   - `RESEND_API_KEY`: *(Your Resend API key)*
   - `MANAGER_EMAIL`: *(Your manager email)*
   - `EMAIL_FROM`: `La Crown Concierge <onboarding@resend.dev>`
   - `CLIENT_ORIGIN`: `https://your-frontend.vercel.app`
5. Deploy service. Note your Render URL (e.g. `https://la-crown-backend.onrender.com`).

### D. Frontend (Vercel)
1. In `frontend/config.js`, update `API_BASE_URL` with your live Render backend URL:
   ```javascript
   window.__CONFIG__ = {
     API_BASE_URL: 'https://la-crown-backend.onrender.com/api'
   };
   ```
2. On [Vercel](https://vercel.com), import your GitHub repository.
3. Set **Root Directory** to `frontend`.
4. Deploy! Your fullstack luxury aesthetic clinic application is live.
