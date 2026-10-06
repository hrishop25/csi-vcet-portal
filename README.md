# 🏛️ Computer Society of India (CSI) VCET Chapter Web Portal

> **Official Full-Stack MERN Application for the CSI Student Chapter at Vidyavardhini's College of Engineering and Technology (VCET), Vasai.**

[![Node.js](https://img.shields.io/badge/Node.js-v24-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-4.21-blue?logo=express)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📌 Executive Overview

This web platform serves as the digital headquarters for the **CSI Student Chapter at VCET (Estd. 2008)**. It blends high-tech collegiate aesthetics (deep navy `#0f172a`, collegiate cobalt `#1e3a8a`, golden amber `#f59e0b`, crisp slate `#f8fafc`) with production-grade engineering:

- **Institutional Public Views**:
  - **Top Navigation Bar**: Institutional collegiate branding with custom SVG chapter crest, NAAC 'A' accreditation indicator, navigation routes, and secure Admin Portal badge.
  - **Hero Banner Slider**: Dynamic collegiate banner showcasing student chapter assemblies, flagship hackathons, text overlays, slide dots, and auto-play controls.
  - **Structured Institutional Layout**:
    - **Who We Are** (Left Column): Institutional history, Department of Computer Engineering patronage, four key pillars, and verified bullet points.
    - **Our Pledge / Vision** (Right Column): Official chapter manifesto, video spotlight card, core ethical values, and constitution link.
  - **Numerical Milestones Counter**: 450+ Active Members, 30+ Tech Events, 18+ Years of Legacy, 25+ Software Projects.
  - **Flagship Calendar**: Interactive filterable calendar featuring HackVCET 2026, Full-Stack MERN Mastery, GenAI seminars, and coding sprints.
  - **Recruitment Application Modal**: Student recruitment submission form with instant validation for First Year (FE) to Final Year (BE) across engineering branches.
  - **Members Directory**: Filterable profiles of Faculty Coordinators, Core Council, Technical Team, Events, and Media Leads.
  - **Constitution & Bylaws**: Complete chapter preamble, articles of governance, code of ethics, and print-ready document.
- **Admin & Core Council Portal (`/admin`)**:
  - **Protected Authentication**: JWT token-based authentication with 1-click Demo Fill for testing.
  - **Recruitment Management Table**:
    - Interactive filters for **Academic Year** (FE, SE, TE, BE), **Department** (Comps, IT, AI-DS, EXTC, etc.), and **Status**.
    - Live fuzzy search bar.
    - **Inline Status Dropdown Selector**: Instant optimistic UI update (`Pending` 🟡, `Interviewed` 🔵, `Accepted` 🟢, `Declined` 🔴) syncing immediately via `PATCH /api/applications/:id`.
    - **Candidate Profile Review Modal**: View full statement of purpose, portfolio/GitHub link, assign interview slots, and write internal committee notes.
    - **Permanent Delete**: With confirmation dialogue.
    - **Export to CSV**: Instant download of all recruitment records.
    - **Statistical Visualizations**: Live breakdown meters by Department and Academic Year.

---

## 🛠️ Technical Architecture

### 📂 Directory Structure
```
csi-vcet-portal/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # MongoDB connection & autonomous in-memory fallback
│   │   ├── controllers/
│   │   │   ├── applicationController.js # Recruitment CRUD & CSV export
│   │   │   ├── authController.js        # JWT Login & user validation
│   │   │   ├── eventController.js       # Flagship events
│   │   │   ├── memberController.js      # Council directory
│   │   │   └── statsController.js       # Recruitment analytics
│   │   ├── middleware/
│   │   │   ├── auth.js                  # JWT Bearer protection
│   │   │   └── errorHandler.js          # Unified error handler
│   │   ├── models/
│   │   │   ├── Application.js           # Student applications schema
│   │   │   ├── Event.js                 # Event schema
│   │   │   ├── Member.js                # Council members schema
│   │   │   └── User.js                  # Admin user schema
│   │   ├── routes/
│   │   │   ├── applications.js          # /api/applications routes
│   │   │   ├── auth.js                  # /api/auth routes
│   │   │   ├── events.js                # /api/events routes
│   │   │   ├── members.js               # /api/members routes
│   │   │   └── stats.js                 # /api/stats routes
│   │   ├── utils/
│   │   │   └── seeder.js                # Rich sample dataset & memory store
│   │   └── server.js                    # Express application entry
│   ├── .env                             # Environment configuration
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── csi-logo.svg                 # Vector chapter logo
│   │   └── vcet-seal.svg                # Collegiate emblem
│   ├── src/
│   │   ├── components/
│   │   │   ├── ApplyModal.jsx           # Recruitment application dialog
│   │   │   ├── EventsSection.jsx        # Flagship events calendar
│   │   │   ├── Footer.jsx               # Collegiate footer with VCET affiliation
│   │   │   ├── HeroSlider.jsx           # Banner carousel
│   │   │   ├── Navbar.jsx               # Institutional top header
│   │   │   ├── OurPledge.jsx            # Vision & manifesto media box
│   │   │   └── WhoWeAre.jsx             # Left profile pillar box
│   │   ├── context/
│   │   │   └── AuthContext.jsx          # JWT token & user state
│   │   ├── pages/
│   │   │   ├── AdminDashboardPage.jsx   # Interactive recruitment data table
│   │   │   ├── AdminLoginPage.jsx       # Collegiate admin login
│   │   │   ├── ConstitutionPage.jsx     # Official bylaws
│   │   │   ├── HomePage.jsx             # Hero & institutional layout
│   │   │   └── MembersPage.jsx          # Directory of council
│   │   ├── services/
│   │   │   └── api.js                   # API client with token injector
│   │   ├── App.jsx                      # Route & view manager
│   │   ├── index.css                    # Tailwind CSS v4 styles
│   │   └── main.jsx
│   ├── vite.config.js
│   └── package.json
├── .gitignore
├── package.json                         # Root orchestration
└── README.md
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (tested on v24.20.0)
- **npm**: v9+ (tested on v11.19.0)
- **MongoDB**: (Optional) MongoDB local server (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI.
  > 💡 *Note*: If local MongoDB is not running, the backend automatically activates **Autonomous In-Memory Mode** preloaded with realistic CSI VCET records, allowing full testing of all APIs without any crashes!

---

### 2. Installation
From the root directory (`csi-vcet-portal`), install dependencies for both frontend and backend:
```bash
npm run install:all
```
*(Or navigate into each folder and run `npm install`)*

---

### 3. Starting the Servers

#### Terminal 1: Start Backend (Port 5000)
```bash
cd backend
npm run dev
```
*Output:*
```
[MongoDB] Connected / Running in Autonomous In-Memory Fallback
=======================================================
  CSI VCET Chapter Backend Server Active               
  URL: http://localhost:5000                           
  Default Admin: admin@csivcet.org / CsiVcet@2026      
=======================================================
```

#### Terminal 2: Start Frontend (Port 5173)
```bash
cd frontend
npm run dev
```
Open your browser and navigate to:
**👉 http://localhost:5173**

---

## 🔑 Admin Portal Credentials

Click on **"Admin Portal"** in the top navigation bar or navigate directly to the login screen. You can either click the **"Fill Demo"** button or enter:

| Field | Value |
|---|---|
| **Email** | `admin@csivcet.org` |
| **Password** | `CsiVcet@2026` |
| **Role** | Core Council / Faculty Administrator |

---

## 📡 REST API Reference

| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `POST` | `/api/apply` | Public | Submit new student recruitment application |
| `GET` | `/api/applications` | JWT Admin | Fetch applications (supports `year`, `department`, `status`, `search` query params) |
| `PATCH` | `/api/applications/:id` | JWT Admin | Update application status (`Pending`, `Interviewed`, `Accepted`, `Declined`), notes, slot |
| `DELETE` | `/api/applications/:id` | JWT Admin | Delete an application record |
| `GET` | `/api/applications/export/csv` | JWT Admin | Export all application records as CSV file |
| `POST` | `/api/auth/login` | Public | Admin login, returns JWT token |
| `GET` | `/api/auth/me` | JWT Admin | Get profile of logged-in admin |
| `GET` | `/api/stats` | JWT Admin | Summary metrics (totals, counts by status, dept, year) |
| `GET` | `/api/members` | Public | Fetch chapter council and faculty mentors |
| `GET` | `/api/events` | Public | Fetch upcoming and completed flagship events |
| `GET` | `/api/health` | Public | Healthcheck and database connectivity status |

---

## 🚢 Git & GitHub Automation

### Step 1: Initialize & Verify Local Git Repository
Run from the root `csi-vcet-portal` folder:
```bash
git status
```

### Step 2: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) named `csi-vcet-portal`.
2. Link your local repo and push to the `main` branch:
```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/csi-vcet-portal.git
git branch -M main
git push -u origin main
```

*(If you have GitHub CLI installed later, you can also run: `gh repo create csi-vcet-portal --public --source=. --push`)*

---

## 🏛️ Accreditation & Institutional Disclaimer
**Computer Society of India (CSI)** Student Chapter  
**Vidyavardhini's College of Engineering and Technology (VCET)**  
K.T. Marg, Vasai Road (W), Dist. Palghar - 401202, Maharashtra, India.  
*Affiliated to the University of Mumbai • Approved by AICTE • DTE Code: 3200*
