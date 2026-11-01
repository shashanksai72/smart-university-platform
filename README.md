# SMART UNIVERSITY – DIGITAL TRANSFORMATION PLATFORM
> **An intelligent, modern, responsive full-stack digital campus platform connecting students, faculty, administrators, and university leadership.**

---

## 🌟 Executive Summary & Vision

Traditional higher education institutions lose thousands of administrative hours each semester to disjointed paper attendance registers, manual marks tabulation, physical fee queues, and fragmented notices.

**Smart University** delivers a unified digital campus ecosystem:
- **Zero Paperwork:** 100% digitized student attendance, automated hall tickets, e-receipts, and complaints.
- **Intelligent Analytics:** Continuous GPA projection, threshold attendance tracking (&ge; 75%), and departmental revenue breakdown.
- **Role-Based Workspaces:** Dedicated, isolated portals for **Students**, **Faculty**, and **Administrators**.
- **Athena Campus AI:** 24/7 AI tutor and university information assistant (powered by an internal knowledge engine and configurable with Google Gemini API).

---

## 🚀 Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Recharts |
| **Backend** | Node.js, Express.js, REST APIs, CORS, Dotenv |
| **Database & Auth** | Supabase, PostgreSQL, Row Level Security (RLS), Role-Based Access Control (RBAC) |
| **AI Integration** | Athena Knowledge Engine + Configurable Google Gemini 1.5 Flash API |
| **Design** | Premium glassmorphism, responsive navigation, dark/light theme switcher |

---

## ⚡ Quick Start Guide (Beginner Friendly)

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** (included with Node.js)

### 2. Running the Full Stack Application

Open your terminal or PowerShell in the `smart-university` directory:

```bash
# Option A: Start both Backend and Frontend together
node start-dev.js
```

Or run each service individually in separate terminal tabs:

```bash
# Terminal 1: Backend Express Server
cd server
npm run dev
# Running on http://localhost:5000

# Terminal 2: Frontend Vite Client
cd client
npm run dev
# Running on http://localhost:5173
```

Open your browser and navigate to: **`http://localhost:5173`**

---

## 👥 Demo Personas & 1-Click Credentials

For testing and demonstration, the platform includes pre-configured university accounts. You can also click the **Persona Pills** in the top navigation bar at any time to instantly switch roles without re-authenticating!

| Role | Name | Institutional Email | Password | Key Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **STUDENT** | Marcus Chen | `student@smartuni.edu` | `password123` | View attendance (94.2%), CGPA (3.84), submit assignments, generate hall tickets, borrow library books, clear fees, file grievances, talk to Athena AI. |
| **FACULTY** | Prof. Alexander Wright | `faculty@smartuni.edu` | `password123` | Record & update class attendance, submit continuous internal marks, create assignments, view cohort performance, publish announcements. |
| **ADMINISTRATOR** | Dr. Sarah Jenkins | `admin@smartuni.edu` | `password123` | University KPI dashboard, visual analytics (Recharts), manage student accounts, grievance resolution desk, broadcast notices, system settings. |

---

## 📱 Detailed Module Capabilities

### 1. Landing Page
- Headline: *"Transforming Education Through Intelligent Technology"*
- Interactive hero with real-time sync metrics preview.
- Complete feature matrix covering all university departments.
- Live campus statistics counter and campus quadrant contact desk.

### 2. Student Portal
- **Overview:** GPA progression graph, today's schedule, exam countdown, quick action buttons.
- **My Profile:** Institutional ID, batch cohort, academic advisor, and editable contact info.
- **Smart Attendance:** Subject-wise breakdown, session history table, low-attendance alert (<75%), and downloadable verified attendance certificate.
- **Academic Results & CGPA:** Internal marks scorecard, historical semester GPA transcripts, and an **interactive CGPA simulator slider**.
- **Timetable:** Daily and weekly master timetable with room venues, course codes, and instructor details.
- **Assignments:** Due date trackers, coursework submit modal with text/repository input, and faculty marks/feedback.
- **Examinations:** Official schedule and 1-click **Download/Print Digital Hall Ticket** with photo and QR validation.
- **Digital Library:** Live catalogue search by title/author/ISBN, category filter, 1-click **Borrow & Return** workflow.
- **Fee Management:** Itemized ledger for tuition and lab dues, **simulated payment gateway**, and downloadable **Official E-Receipt**.
- **Grievance Redressal:** Submit tickets (Academic, Facilities, Hostel, Financial), track status (*Pending &rarr; In Progress &rarr; Resolved*), read administration replies.
- **Athena AI Assistant:** Conversational chat interface with suggested quick prompts, typing indicator, context memory, and copy buttons.

### 3. Faculty Portal
- **Roster & Assigned Students:** List of all 142 students across CS501, CS502, and CS503 with performance classifications.
- **Record Attendance:** Live session attendance marker with 1-click *Mark All Present* / *Mark All Absent* and instant calculation.
- **Enter Internal Marks:** Select assessment type, enter student marks with max-score bounds, and auto-compute grades (O, A+, A, etc.).
- **Coursework Management:** Create new assignments with deadlines, points, and instructions.

### 4. Administrator Portal
- **Command Center:** Institutional summary of 1,180 students, 82 faculty, and $3.42M fee revenue.
- **Visual Analytics (Recharts):**
  - Monthly attendance trajectory vs. 75% regulatory requirement (Line Chart).
  - Department staffing ratios (Bar Chart).
  - Fee collection realization (Donut / Pie Chart).
- **Student Management:** Add new student profiles, search by ID, and activate/deactivate accounts.
- **Grievance Resolution Desk:** Review filed student tickets, draft official administrative responses, and update status to Resolved.
- **Broadcast Announcements:** Publish notices tagged by category (*Academic, Exam, Urgent*) with pin-to-top option.

---

## 🗄️ Database Architecture (PostgreSQL / Supabase)

The platform includes production-ready SQL scripts located in the `supabase/` directory:

- `supabase/schema.sql`: Contains definitions for all **21 requested tables**, primary/foreign keys, enum types, indexes, and Row Level Security (RLS) policies:
  - `profiles`, `departments`, `faculty`, `courses`, `students`, `subjects`, `enrollments`, `attendance`, `marks`, `assignments`, `submissions`, `timetables`, `examinations`, `results`, `books`, `book_transactions`, `fee_records`, `announcements`, `notifications`, `grievances`, `grievance_responses`.
- `supabase/seed.sql`: Realistic mock dataset for testing and sandbox evaluation.

### Connecting to your Supabase Project:
1. Log in to [Supabase](https://supabase.com) and create a project.
2. Open the **SQL Editor** in Supabase and run `supabase/schema.sql` followed by `supabase/seed.sql`.
3. Add your Supabase URL and anon key to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

---

## 🤖 Configuring Google Gemini AI API

The built-in **Athena AI Assistant** is ready to answer university policy, exam, and attendance questions out of the box using its campus knowledge base.

To connect Athena to Google's live **Gemini 1.5 Flash** model:
1. Obtain an API key from [Google AI Studio](https://aistudio.google.com/).
2. Add the key to your `.env` or `server/.env` file:
   ```env
   GEMINI_API_KEY=AIzaSy...your-gemini-key
   ```
3. Restart the server (`npm run dev:server`). Athena will automatically switch to the Gemini model!

---

## 🔒 Security Best Practices
- **No Hardcoded Secrets:** All credentials reside in private `.env` configurations.
- **RBAC Enforcement:** Public registration for the `ADMINISTRATOR` role is strictly disabled.
- **Simulated Payment Sandbox:** Financial transactions are clearly designated as simulated sandbox records.

---

## 📄 License
This project is licensed under the MIT License. Developed for Smart University Digital Transformation.
