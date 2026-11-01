import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { mockData } from './data/mockStore.js';
import { processAIChat } from './services/aiService.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// 1. Health & Status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Smart University Digital Transformation Platform API',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    databaseConnected: false, // In demo mock mode by default
    aiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your-gemini-api-key')
  });
});

// 2. Authentication Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Find user by email
  const user = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) {
    return res.status(401).json({ error: 'Invalid university credentials' });
  }

  // In demo mode or production verification
  if (user.password !== password && password !== 'demo') {
    return res.status(401).json({ error: 'Invalid password' });
  }

  // Generate safe user profile payload
  const { password: _, ...userProfile } = user;
  return res.json({
    token: `jwt-simulated-${user.id}-${Date.now()}`,
    user: userProfile
  });
});

app.post('/api/auth/register', (req, res) => {
  const { fullName, email, password, role, department, studentId } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'Missing mandatory registration fields' });
  }

  // CRITICAL RULE: Never allow public registration for ADMINISTRATOR
  if (role === 'ADMINISTRATOR') {
    return res.status(403).json({ error: 'Administrator accounts must be securely provisioned by University Registrar.' });
  }

  const existing = mockData.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists' });
  }

  const newUser = {
    id: `user-${Date.now()}`,
    email,
    password,
    fullName,
    role: role || 'STUDENT',
    department: department || 'Computer Science & Engineering',
    studentId: role === 'STUDENT' ? (studentId || `SU-${new Date().getFullYear()}-CS-${Math.floor(100 + Math.random() * 900)}`) : undefined,
    cgpa: 3.70,
    attendanceRate: 92.0,
    pendingFees: 250,
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256'
  };

  mockData.users.push(newUser);
  const { password: _, ...safeProfile } = newUser;

  res.status(201).json({
    message: 'Registration successful',
    token: `jwt-simulated-${newUser.id}`,
    user: safeProfile
  });
});

// 3. Student Overview & Academic Stats
app.get('/api/students/:id/overview', (req, res) => {
  const { id } = req.params;
  const student = mockData.users.find(u => u.id === id || u.studentId === id) || mockData.users[3]; // default Marcus Chen
  
  res.json({
    profile: student,
    subjects: mockData.subjects,
    recentAttendance: mockData.attendanceRecords.filter(a => a.studentId === student.id).slice(0, 5),
    upcomingExams: mockData.examinations.slice(0, 3),
    recentAnnouncements: mockData.announcements.slice(0, 3),
    semesterResults: mockData.semesterResults,
    metrics: {
      overallAttendance: student.attendanceRate || 94.2,
      cgpa: student.cgpa || 3.84,
      totalCredits: 96,
      pendingAssignments: mockData.assignments.filter(a => a.status === 'PENDING').length,
      pendingFee: student.pendingFees || 250
    }
  });
});

// 4. Attendance Endpoints
app.get('/api/attendance', (req, res) => {
  const { studentId, subjectCode } = req.query;
  let records = [...mockData.attendanceRecords];

  if (studentId) {
    records = records.filter(r => r.studentId === studentId);
  }
  if (subjectCode) {
    records = records.filter(r => r.subjectCode === subjectCode);
  }

  res.json({
    summary: {
      totalClasses: 126,
      attendedClasses: 119,
      percentage: 94.4,
      thresholdAlert: false, // Warning if < 75%
      status: 'EXCELLENT'
    },
    subjectsBreakdown: mockData.subjects,
    records
  });
});

app.post('/api/attendance/record', (req, res) => {
  const { studentId, subjectCode, status, date, timeSlot } = req.body;
  if (!studentId || !subjectCode || !status) {
    return res.status(400).json({ error: 'Missing attendance parameters' });
  }

  const student = mockData.users.find(u => u.id === studentId || u.studentId === studentId);
  const newRecord = {
    id: `att-${Date.now()}`,
    studentId: student?.id || studentId,
    studentName: student?.fullName || 'Student',
    rollNo: student?.studentId || 'SU-2024-CS-042',
    subjectCode,
    subjectName: mockData.subjects.find(s => s.code === subjectCode)?.name || subjectCode,
    date: date || new Date().toISOString().split('T')[0],
    timeSlot: timeSlot || '09:00 - 10:30 AM',
    status: status.toUpperCase(),
    facultyName: 'Prof. Alexander Wright'
  };

  mockData.attendanceRecords.unshift(newRecord);
  res.status(201).json({ message: 'Attendance recorded successfully', record: newRecord });
});

// 5. Academics, Marks & Results
app.get('/api/academics/marks', (req, res) => {
  res.json({
    marks: mockData.marksRecords,
    semesterResults: mockData.semesterResults,
    cgpa: 3.84,
    gradeClassification: 'First Class with Distinction'
  });
});

app.post('/api/academics/marks/submit', (req, res) => {
  const { studentId, subjectCode, assessment, maxMarks, obtainedMarks, remarks } = req.body;
  const newMark = {
    id: `mk-${Date.now()}`,
    studentId: studentId || 'user-stu-1',
    subjectCode: subjectCode || 'CS501',
    subjectName: mockData.subjects.find(s => s.code === subjectCode)?.name || 'Subject',
    assessment: assessment || 'Internal Assessment',
    maxMarks: Number(maxMarks) || 50,
    obtainedMarks: Number(obtainedMarks) || 45,
    grade: obtainedMarks / maxMarks >= 0.9 ? 'O' : (obtainedMarks / maxMarks >= 0.8 ? 'A+' : 'A'),
    status: 'Verified',
    date: new Date().toISOString().split('T')[0]
  };

  mockData.marksRecords.unshift(newMark);
  res.status(201).json({ message: 'Marks submitted successfully', record: newMark });
});

// 6. Timetables & Examinations
app.get('/api/timetables', (req, res) => {
  res.json(mockData.timetables);
});

app.get('/api/examinations', (req, res) => {
  res.json(mockData.examinations);
});

// 7. Assignments & Submissions
app.get('/api/assignments', (req, res) => {
  res.json(mockData.assignments);
});

app.post('/api/assignments/submit', (req, res) => {
  const { assignmentId, submissionText } = req.body;
  const asg = mockData.assignments.find(a => a.id === assignmentId);
  if (!asg) {
    return res.status(404).json({ error: 'Assignment not found' });
  }

  asg.status = 'SUBMITTED';
  asg.submission = submissionText || 'Code repo submitted: https://github.com/smart-uni/transformer-impl';
  
  // Add notification
  mockData.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'Assignment Submitted',
    message: `Your submission for "${asg.title}" was registered.`,
    type: 'ASSIGNMENT',
    isRead: false,
    time: 'Just now'
  });

  res.json({ message: 'Assignment submitted successfully', assignment: asg });
});

app.post('/api/assignments/create', (req, res) => {
  const { title, subjectCode, dueDate, totalPoints, description } = req.body;
  const newAsg = {
    id: `asg-${Date.now()}`,
    title,
    subjectCode: subjectCode || 'CS501',
    subjectName: mockData.subjects.find(s => s.code === subjectCode)?.name || 'Course Subject',
    facultyName: 'Prof. Alexander Wright',
    dueDate,
    totalPoints: Number(totalPoints) || 100,
    status: 'PENDING',
    description,
    submission: null
  };
  mockData.assignments.unshift(newAsg);
  res.status(201).json({ message: 'Assignment created successfully', assignment: newAsg });
});

// 8. Digital Library
app.get('/api/library/books', (req, res) => {
  const { search, category } = req.query;
  let result = [...mockData.books];
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) || b.isbn.includes(q));
  }
  if (category && category !== 'ALL') {
    result = result.filter(b => b.category === category);
  }
  res.json({
    books: result,
    transactions: mockData.bookTransactions,
    categories: ['ALL', 'Artificial Intelligence', 'Systems Engineering', 'Computer Science', 'Algorithms']
  });
});

app.post('/api/library/borrow', (req, res) => {
  const { bookId } = req.body;
  const book = mockData.books.find(b => b.id === bookId);
  if (!book || book.availableCopies <= 0) {
    return res.status(400).json({ error: 'Book currently unavailable' });
  }

  book.availableCopies -= 1;
  const newTx = {
    id: `tx-${Date.now()}`,
    bookTitle: book.title,
    isbn: book.isbn,
    borrowDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'BORROWED',
    fine: 0
  };
  mockData.bookTransactions.unshift(newTx);
  res.json({ message: `Successfully borrowed "${book.title}"`, transaction: newTx, book });
});

app.post('/api/library/return', (req, res) => {
  const { transactionId } = req.body;
  const tx = mockData.bookTransactions.find(t => t.id === transactionId);
  if (!tx) {
    return res.status(404).json({ error: 'Transaction record not found' });
  }

  tx.status = 'RETURNED';
  tx.returnDate = new Date().toISOString().split('T')[0];

  const book = mockData.books.find(b => b.title === tx.bookTitle || b.isbn === tx.isbn);
  if (book) book.availableCopies += 1;

  res.json({ message: 'Book returned successfully', transaction: tx });
});

// 9. Fee Management
app.get('/api/fees', (req, res) => {
  res.json({
    records: mockData.feeRecords,
    summary: {
      totalFee: 4500.0,
      paidAmount: 4250.0,
      balance: 250.0,
      nextDueDate: '2026-11-25',
      status: 'PENDING_CLEARANCE'
    }
  });
});

app.post('/api/fees/pay', (req, res) => {
  const { feeId, paymentMethod } = req.body;
  const fee = mockData.feeRecords.find(f => f.id === feeId);
  if (!fee) {
    return res.status(404).json({ error: 'Fee invoice record not found' });
  }

  fee.paidAmount = fee.totalAmount;
  fee.balance = 0.0;
  fee.status = 'PAID';
  fee.method = `${paymentMethod || 'Net Banking'} (Simulated)`;
  fee.receiptNo = `REC-SU-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  fee.paidDate = new Date().toISOString().split('T')[0];

  res.json({
    message: 'Fee invoice cleared successfully in simulated sandbox!',
    receipt: fee
  });
});

// 10. Grievance Management
app.get('/api/grievances', (req, res) => {
  res.json(mockData.grievances);
});

app.post('/api/grievances/create', (req, res) => {
  const { subject, category, description, priority, studentId, studentName } = req.body;
  if (!subject || !description) {
    return res.status(400).json({ error: 'Subject and description are required' });
  }

  const newGrievance = {
    id: `grv-${Date.now()}`,
    studentId: studentId || 'user-stu-1',
    studentName: studentName || 'Marcus Chen',
    category: category || 'ACADEMIC',
    subject,
    description,
    priority: priority || 'MEDIUM',
    status: 'PENDING',
    createdAt: new Date().toISOString().split('T')[0],
    responses: []
  };

  mockData.grievances.unshift(newGrievance);

  // Notify admin
  mockData.notifications.unshift({
    id: `notif-${Date.now()}`,
    title: 'New Student Grievance Filed',
    message: `A new ticket "${subject}" was filed under ${category}.`,
    type: 'GRIEVANCE',
    isRead: false,
    time: 'Just now'
  });

  res.status(201).json({ message: 'Grievance ticket registered', grievance: newGrievance });
});

app.post('/api/grievances/:id/respond', (req, res) => {
  const { id } = req.params;
  const { responseText, newStatus, authorName } = req.body;
  const grievance = mockData.grievances.find(g => g.id === id);

  if (!grievance) {
    return res.status(404).json({ error: 'Grievance ticket not found' });
  }

  if (responseText) {
    grievance.responses.push({
      id: `grv-res-${Date.now()}`,
      authorName: authorName || 'University Administration Desk',
      text: responseText,
      date: new Date().toISOString().split('T')[0]
    });
  }

  if (newStatus) {
    grievance.status = newStatus;
  }

  res.json({ message: 'Grievance updated successfully', grievance });
});

// 11. Announcements & Notifications
app.get('/api/announcements', (req, res) => {
  res.json(mockData.announcements);
});

app.post('/api/announcements/create', (req, res) => {
  const { title, content, target, category, isPinned, author } = req.body;
  const newAnn = {
    id: `ann-${Date.now()}`,
    title,
    content,
    target: target || 'ALL',
    category: category || 'ACADEMIC',
    author: author || 'University Registrar',
    isPinned: Boolean(isPinned),
    date: new Date().toISOString().split('T')[0]
  };
  mockData.announcements.unshift(newAnn);
  res.status(201).json({ message: 'Announcement broadcasted', announcement: newAnn });
});

app.get('/api/notifications', (req, res) => {
  res.json(mockData.notifications);
});

app.post('/api/notifications/mark-read', (req, res) => {
  const { id } = req.body;
  if (id) {
    const notif = mockData.notifications.find(n => n.id === id);
    if (notif) notif.isRead = true;
  } else {
    // Mark all as read
    mockData.notifications.forEach(n => n.isRead = true);
  }
  res.json({ message: 'Notifications marked as read' });
});

// 12. Faculty Specific Endpoints
app.get('/api/faculty/dashboard', (req, res) => {
  res.json({
    profile: mockData.users[1], // Prof. Alexander Wright
    assignedStudents: mockData.users.filter(u => u.role === 'STUDENT'),
    totalAssignedStudents: 142,
    totalSubjects: 3,
    todayClasses: [
      { subject: 'Deep Learning', time: '09:00 - 10:30 AM', room: 'Turing Hall 301', attended: '42 / 45' },
      { subject: 'Distributed Cloud Systems', time: '11:00 - 12:30 PM', room: 'Cloud Cluster Lab 4', attended: '44 / 45' }
    ],
    attendanceStats: {
      averageAttendance: 92.4,
      lowAttendanceCount: 3,
      highestAttendanceSubject: 'Deep Learning (94.4%)'
    }
  });
});

// 13. Admin Management & Visual Analytics
app.get('/api/admin/metrics', (req, res) => {
  res.json({
    kpis: {
      totalStudents: 1180,
      totalFaculty: 82,
      totalDepartments: mockData.departments.length,
      totalCourses: mockData.courses.length,
      overallAttendanceRate: 91.8,
      totalFeesCollected: '$3.42M',
      pendingFeeCollection: '$148K',
      activeGrievances: mockData.grievances.filter(g => g.status !== 'RESOLVED').length
    },
    departments: mockData.departments,
    attendanceTrends: [
      { month: 'Jun', rate: 94.5 },
      { month: 'Jul', rate: 93.2 },
      { month: 'Aug', rate: 89.8 },
      { month: 'Sep', rate: 92.1 },
      { month: 'Oct', rate: 91.8 },
    ],
    departmentEnrollment: [
      { name: 'Computer Science', students: 420, faculty: 28 },
      { name: 'Electronics', students: 310, faculty: 22 },
      { name: 'Mechanical', students: 260, faculty: 18 },
      { name: 'Business & Mgmt', students: 190, faculty: 14 },
    ],
    feeCollectionDistribution: [
      { name: 'Tuition Fees', value: 72 },
      { name: 'Lab & Tech', value: 16 },
      { name: 'Hostel & Amenities', value: 8 },
      { name: 'Library & Exam', value: 4 },
    ],
    recentActivities: [
      { time: '12 mins ago', action: 'Semester 5 Exam Schedule published by Dean Office' },
      { time: '35 mins ago', action: 'New student enrolled: Aisha Khan (SU-2024-CS-043)' },
      { time: '1 hour ago', action: 'Wi-Fi Latency grievance marked IN_PROGRESS by Admin' },
      { time: '2 hours ago', action: 'Automated 75% attendance threshold report generated' },
    ]
  });
});

// Admin student management
app.get('/api/admin/students', (req, res) => {
  const students = mockData.users.filter(u => u.role === 'STUDENT');
  res.json(students);
});

app.post('/api/admin/students', (req, res) => {
  const { fullName, email, department, studentId, year, semester } = req.body;
  const newStudent = {
    id: `user-stu-${Date.now()}`,
    email,
    password: 'password123',
    fullName,
    role: 'STUDENT',
    studentId: studentId || `SU-2024-NEW-${Math.floor(100 + Math.random() * 900)}`,
    department: department || 'Computer Science & Engineering',
    year: Number(year) || 1,
    semester: Number(semester) || 1,
    section: 'A',
    cgpa: 3.50,
    attendanceRate: 90.0,
    pendingFees: 3500,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    status: 'ACTIVE'
  };
  mockData.users.push(newStudent);
  res.status(201).json({ message: 'Student created successfully', student: newStudent });
});

// 14. AI University Assistant Endpoint
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, role, userContext } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message query is required' });
    }

    const aiResponse = await processAIChat({
      message,
      role: role || 'STUDENT',
      userContext: userContext || {}
    });

    res.json(aiResponse);
  } catch (error) {
    console.error('Error in AI Assistant handler:', error);
    res.status(500).json({
      error: 'AI assistant service temporarily unavailable',
      reply: 'Athena encountered an issue processing your request. Please try again shortly.',
      source: 'error-handler'
    });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` SMART UNIVERSITY API SERVER RUNNING ON PORT: ${PORT}`);
  console.log(` API Endpoint: http://localhost:${PORT}/api/health`);
  console.log(`======================================================\n`);
});
