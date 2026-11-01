// AI University Assistant Service
// Seamlessly connects to Gemini API when key is configured,
// or provides comprehensive contextual intelligence using the Smart Campus Knowledge Base.

const UNIVERSITY_KNOWLEDGE_BASE = {
  attendance: {
    rule: "Smart University mandates a minimum of 75% attendance in each course to be eligible for end-semester examinations. Medical condonation is permitted between 65% and 74% with appropriate verification from the University Health Center.",
    threshold: "Below 75%: Warning issued. Below 65%: Ineligible for regular examination seating.",
    view: "You can monitor your subject-wise and date-wise attendance directly in the Student Attendance module."
  },
  grading: {
    scale: "Grading Scale: O (Outstanding, 10.0), A+ (Excellent, 9.0), A (Very Good, 8.0), B+ (Good, 7.0), B (Above Average, 6.0), C (Pass, 5.0), RA (Re-appear, 0.0).",
    cgpa_formula: "CGPA = Sum of (Subject Credits * Grade Points) / Total Course Credits.",
  },
  fees: {
    modes: "Fees can be cleared via Simulated Net Banking, Debit/Credit Card, or UPI on the portal.",
    receipts: "Simulated receipts are generated automatically upon successful clearance with verifiable transaction numbers."
  },
  library: {
    rules: "Students can borrow up to 3 books simultaneously for a duration of 30 days. Renewals can be made online before the due date if no other hold exists.",
    location: "Central Digital Library, Ground & First Floor of Babbage Tower."
  },
  grievance: {
    steps: "To file a grievance, navigate to the Grievances tab, choose your category (Academic, Facilities, Hostel, Financial, or Other), provide a detailed subject and summary, and track status: Pending -> In Progress -> Resolved.",
  },
  exams: {
    schedule: "End-Semester Examinations commence in 2 weeks. Hall tickets are accessible from the Examinations page once clearance criteria are met.",
  }
};

export async function processAIChat({ message, role = 'STUDENT', userContext = {} }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const cleanMsg = (message || '').toLowerCase().trim();

  // If a real Gemini API key is configured, we can call Gemini
  if (apiKey && apiKey !== 'your-gemini-api-key' && apiKey.length > 10) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{
                text: `You are Athena, the official Smart University AI Assistant.
The current logged-in user is: ${userContext.fullName || 'User'} (${role}).
Student ID: ${userContext.studentId || 'N/A'}, Department: ${userContext.department || 'Computer Science'}, CGPA: ${userContext.cgpa || '3.84'}, Attendance: ${userContext.attendanceRate || '94.2%'}.
Respond helpfully, courteously, professionally, and concisely to the student's question about university policies, timetable, exams, fees, library, or academics.
User Question: "${message}"`
              }]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return {
            reply,
            source: 'gemini-1.5-flash',
            timestamp: new Date().toISOString(),
          };
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to built-in campus intelligence:', err.message);
    }
  }

  // Built-in Smart Campus Knowledge Engine (No external API needed)
  let reply = "";
  const studentName = userContext.fullName || "Marcus";
  const studentId = userContext.studentId || "SU-2024-CS-042";

  if (cleanMsg.includes('attendance') || cleanMsg.includes('percentage') || cleanMsg.includes('absent')) {
    reply = `Hello ${studentName}! Your overall university attendance currently stands at **94.2%**, which comfortably exceeds the mandatory 75% threshold.

- **CS501 (Deep Learning):** 94.4% (34/36 classes)
- **CS502 (Distributed Systems):** 93.8% (30/32 classes)
- **CS503 (Database Engineering):** 96.4% (27/28 classes)
- **CS504 (Cyber Security):** 93.3% (28/30 classes)

${UNIVERSITY_KNOWLEDGE_BASE.attendance.rule}`;
  } 
  else if (cleanMsg.includes('exam') || cleanMsg.includes('hall ticket') || cleanMsg.includes('schedule') || cleanMsg.includes('test')) {
    reply = `Regarding your examinations, ${studentName}:

1. **CS501 Deep Learning Written Exam:** Nov 20, 2026 | 09:30 AM - 12:30 PM (Exam Hall B, Seat B-42)
2. **CS502 Distributed Cloud Systems Lab:** Nov 24, 2026 | 02:00 PM - 05:00 PM (Terminal Lab 2)
3. **CS503 Advanced Database Engineering:** Nov 27, 2026 | 09:30 AM - 12:30 PM (Exam Hall B)

You can download your verified digital hall ticket directly from the **Examination** section!`;
  }
  else if (cleanMsg.includes('timetable') || cleanMsg.includes('class') || cleanMsg.includes('today') || cleanMsg.includes('schedule')) {
    reply = `Here is your academic timetable overview for this week:

- **Monday:** 
  - 09:00 AM - 10:30 AM: Deep Learning & Neural Architectures (Turing Hall 301)
  - 11:00 AM - 12:30 PM: Distributed Cloud Systems Lab (Cloud Cluster Lab 4)
- **Tuesday:**
  - 09:00 AM - 10:30 AM: Advanced Database Engineering (Turing Hall 205)
  - 01:30 PM - 03:00 PM: Cyber Security & Cryptography (Security Warfare Lab)
- **Wednesday:**
  - 10:00 AM - 11:30 AM: Deep Learning Seminar (Auditorium Alpha)

Check the **Timetable** tab for full room allocations and faculty details.`;
  }
  else if (cleanMsg.includes('cgpa') || cleanMsg.includes('grade') || cleanMsg.includes('marks') || cleanMsg.includes('result')) {
    reply = `Your current cumulative Grade Point Average (CGPA) is **3.84 / 4.00** (equivalent to 9.2/10 scale, First Class with Distinction).

- **Semester 1:** 3.75 GPA (24 Credits)
- **Semester 2:** 3.82 GPA (24 Credits)
- **Semester 3:** 3.88 GPA (24 Credits)
- **Semester 4:** 3.91 GPA (24 Credits)
- **Current Semester 5:** On track with high distinction internal marks (Avg 95%).`;
  }
  else if (cleanMsg.includes('fee') || cleanMsg.includes('dues') || cleanMsg.includes('payment') || cleanMsg.includes('receipt')) {
    reply = `Here is your current fee clearance summary:
- **Tuition Fee (Sem 5):** $3,500.00 — **PAID** (Receipt #REC-SU-2026-9081)
- **Lab & HPC Access Fee:** $750.00 — **PAID** (Receipt #REC-SU-2026-9082)
- **Exam & Digital Library Fee:** $250.00 — **PENDING** (Due date: Nov 25, 2026)

You can clear the pending balance in one click from the **Fee Details** page.`;
  }
  else if (cleanMsg.includes('library') || cleanMsg.includes('book') || cleanMsg.includes('borrow')) {
    reply = `In the Smart Digital Library:
- **Active Borrowed Book:** *Deep Learning* by Ian Goodfellow (Due: Nov 15, 2026)
- **Returned:** *Designing Data-Intensive Applications* by Martin Kleppmann
- **Total Borrow Limit:** Up to 3 physical or unlimited digital e-books.
Browse and reserve books from the **Library** section anytime!`;
  }
  else if (cleanMsg.includes('grievance') || cleanMsg.includes('complaint') || cleanMsg.includes('issue') || cleanMsg.includes('problem')) {
    reply = `You can submit and track formal grievances through the **Grievances** module:
- You currently have 1 active grievance: **"Wi-Fi Latency in Computer Lab 3"** (Status: **IN_PROGRESS** - Network team is upgrading access points).
- 1 previously resolved grievance: "Request for Elective Course Credit Transfer" (**RESOLVED**).
Need to report something new? Click on the Grievance tab and submit your ticket.`;
  }
  else if (cleanMsg.includes('assignment') || cleanMsg.includes('homework') || cleanMsg.includes('project')) {
    reply = `You have two upcoming assignments pending:
1. **Transformer Architecture from Scratch** (CS501) — Due in 7 days (Total: 100 pts)
2. **Raft Consensus Protocol Implementation** (CS502) — Due in 14 days (Total: 100 pts)
You can upload submissions and review faculty grading rubrics in the **Assignments** module.`;
  }
  else {
    reply = `Hello ${studentName}! I am **Athena**, your Smart University AI Assistant. 

I can assist you with:
- **Attendance & Eligibility:** Check current stats and 75% threshold rules.
- **Academic Progress & CGPA:** Internal assessment scores and semester transcripts.
- **Timetables & Classrooms:** Lecture hours, lab venues, and faculty details.
- **Examinations:** Upcoming mid-terms, final exams, and hall tickets.
- **Fees & Receipts:** Balance reminders and simulated transaction receipts.
- **Digital Library:** Book searches, due dates, and hold requests.
- **Grievance Resolution:** Ticket filing and administrative response tracking.

How can I help you today?`;
  }

  return {
    reply,
    source: 'university-knowledge-engine',
    timestamp: new Date().toISOString(),
  };
}
