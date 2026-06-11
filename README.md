# CareNova – Home Healthcare Booking Platform

## Overview

CareNova is a modern healthcare platform that connects patients with verified healthcare professionals for home-based medical services. The platform enables patients to book home nursing and physiotherapy services, manage appointments, track payments, and receive quality healthcare at their doorstep.

The application is designed with security, accessibility, and user experience in mind, providing dedicated dashboards for Patients, Healthcare Professionals, and Administrators.

---

# Features

## Patient Features

* User Registration & Login
* Secure Authentication using Supabase Auth
* Book Home Nursing Services
* Book Physiotherapy Services
* View Appointment History
* Manage Profile Information
* View Payment Transactions
* Appointment Status Tracking

## Healthcare Professional Features

* Professional Registration
* Profile Management
* Availability Management
* View Assigned Appointments
* Accept or Reject Appointments
* Earnings & Transaction History

## Admin Features

* Manage Patients
* Manage Healthcare Professionals
* Verify Professional Accounts
* Appointment Monitoring
* Dashboard Analytics
* Platform Management

## Security Features

* Supabase Authentication
* Protected Routes
* Role-Based Access Control (RBAC)
* Database Row Level Security (RLS)
* Secure Environment Variables
* Session Management

---

# Technology Stack

## Frontend

* React.js
* Vite
* Bootstrap 5
* Bootstrap Icons
* React Router DOM

## Backend & Database

  * Supabase
  * Authentication
  * Row Level Security (RLS)

## Payments

* Razorpay Payment Gateway

## Deployment

* Vercel (Frontend)
---

# Project Architecture

```text
src/
│
├── assets/
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── ProtectedRoute.jsx
│
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── PatientDashboard.jsx
│   ├── ProfessionalDashboard.jsx
│   └── AdminDashboard.jsx
│
├── hooks/
│   ├── useAuth.js
│   └── useCurrentUser.js
│
├── services/
│   ├── authService.js
│   ├── patientService.js
│   ├── professionalService.js
│   ├── appointmentService.js
│   └── paymentService.js
│
├── styles/
│   ├── variables.css
│   ├── Home.css
│   ├── Navbar.css
│   └── Forms.css
│
└── App.jsx
```

---

# Screenshots

## Home Page

Modern healthcare landing page featuring:

* Service Overview
* Booking Actions
* FAQs
* Contact Information

## Patient Dashboard

* Appointment Tracking
* Booking History
* Transaction Management

## Professional Dashboard

* Assigned Patients
* Schedule Management
* Earnings Overview

## Admin Dashboard

* User Management
* Professional Verification
* Appointment Monitoring

---

# Environment Variables

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Important:

* Never commit `.env`
* Never expose Supabase Service Role Keys
* Never store secrets in frontend code

---

# Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/carenova.git](https://github.com/susmera-code/Healthcare_Demo_Project.git)
```

Navigate into the project:

```bash
cd carenova
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

# Security Considerations

This project follows modern security practices:

* Role-Based Authorization
* Protected Routes
* Secure Session Management
* Row Level Security (RLS)
* Input Validation
* Environment Variable Protection

---

# Author

Developed by Susmera N A

If you found this project helpful, please consider starring the repository.
