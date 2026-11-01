import React, { createContext, useContext, useState } from 'react';
import {
  Department,
  Subject,
  AttendanceRecord,
  MarkRecord,
  SemesterResult,
  TimetableEntry,
  Assignment,
  Examination,
  LibraryBook,
  BookTransaction,
  FeeRecord,
  Grievance,
  Announcement,
  NotificationItem,
  StudentItem,
  FacultyItem,
} from '../types';

interface DataContextType {
  departments: Department[];
  subjects: Subject[];
  attendanceRecords: AttendanceRecord[];
  marksRecords: MarkRecord[];
  semesterResults: SemesterResult[];
  timetables: TimetableEntry[];
  assignments: Assignment[];
  examinations: Examination[];
  books: LibraryBook[];
  bookTransactions: BookTransaction[];
  feeRecords: FeeRecord[];
  grievances: Grievance[];
  announcements: Announcement[];
  notifications: NotificationItem[];
  unreadNotifCount: number;

  students: StudentItem[];
  facultyList: FacultyItem[];

  // Actions
  addStudent: (student: Omit<StudentItem, 'id' | 'status'> & { status?: 'ACTIVE' | 'DEACTIVATED' }) => void;
  updateStudent: (id: string, updated: Partial<StudentItem>) => void;
  toggleStudentStatus: (id: string) => void;
  addFaculty: (faculty: Omit<FacultyItem, 'id' | 'status'> & { status?: 'ACTIVE' | 'DEACTIVATED' }) => void;
  updateFaculty: (id: string, updated: Partial<FacultyItem>) => void;
  toggleFacultyStatus: (id: string) => void;

  recordAttendance: (data: { studentId: string; studentName: string; rollNo: string; subjectCode: string; status: 'PRESENT' | 'ABSENT' | 'LATE'; timeSlot?: string }) => void;
  submitMarks: (mark: { studentId: string; subjectCode: string; assessment: string; maxMarks: number; obtainedMarks: number; remarks?: string }) => void;
  submitAssignment: (assignmentId: string, submissionText: string) => void;
  createAssignment: (newAsg: Omit<Assignment, 'id' | 'status' | 'submission'>) => void;
  borrowBook: (bookId: string) => boolean;
  returnBook: (transactionId: string) => void;
  payFee: (feeId: string, method?: string) => void;
  createGrievance: (ticket: { subject: string; category: Grievance['category']; description: string; priority: Grievance['priority'] }) => void;
  respondGrievance: (grievanceId: string, responseText: string, newStatus?: Grievance['status']) => void;
  createAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [departments] = useState<Department[]>([
    {
      id: 'dept-1',
      code: 'CSE',
      name: 'Computer Science & Engineering',
      hod: 'Dr. Aris Thorne',
      building: 'Turing Hall, West Wing',
      email: 'cse@smartuni.edu',
      studentsCount: 420,
      facultyCount: 28,
    },
    {
      id: 'dept-2',
      code: 'ECE',
      name: 'Electronics & Communication',
      hod: 'Dr. Priya Sharma',
      building: 'Tesla Complex, East Wing',
      email: 'ece@smartuni.edu',
      studentsCount: 310,
      facultyCount: 22,
    },
    {
      id: 'dept-3',
      code: 'MECH',
      name: 'Mechanical & Aerospace Engineering',
      hod: 'Dr. David Miller',
      building: 'Newton Pavilion, North Wing',
      email: 'mech@smartuni.edu',
      studentsCount: 260,
      facultyCount: 18,
    },
    {
      id: 'dept-4',
      code: 'MGMT',
      name: 'School of Business & Data Analytics',
      hod: 'Dr. Elena Rostova',
      building: 'Babbage Tower, South Wing',
      email: 'mgmt@smartuni.edu',
      studentsCount: 190,
      facultyCount: 14,
    },
  ]);

  const [subjects] = useState<Subject[]>([
    {
      id: 'sub-1',
      code: 'CS501',
      name: 'Deep Learning & Neural Architectures',
      credits: 4,
      semester: 5,
      facultyId: 'user-fac-1',
      facultyName: 'Prof. Alexander Wright',
      departmentId: 'dept-1',
      totalClasses: 36,
      attendedClasses: 34,
      percentage: 94.4,
    },
    {
      id: 'sub-2',
      code: 'CS502',
      name: 'Distributed Cloud Systems',
      credits: 4,
      semester: 5,
      facultyId: 'user-fac-1',
      facultyName: 'Prof. Alexander Wright',
      departmentId: 'dept-1',
      totalClasses: 32,
      attendedClasses: 30,
      percentage: 93.8,
    },
    {
      id: 'sub-3',
      code: 'CS503',
      name: 'Advanced Database Engineering',
      credits: 3,
      semester: 5,
      facultyId: 'user-fac-1',
      facultyName: 'Prof. Alexander Wright',
      departmentId: 'dept-1',
      totalClasses: 28,
      attendedClasses: 27,
      percentage: 96.4,
    },
    {
      id: 'sub-4',
      code: 'CS504',
      name: 'Cyber Security & Cryptography',
      credits: 3,
      semester: 5,
      facultyId: 'user-fac-2',
      facultyName: 'Dr. Priya Sharma',
      departmentId: 'dept-1',
      totalClasses: 30,
      attendedClasses: 28,
      percentage: 93.3,
    },
  ]);

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: 'att-1',
      studentId: 'user-stu-1',
      studentName: 'Marcus Chen',
      rollNo: 'SU-2024-CS-042',
      subjectCode: 'CS501',
      subjectName: 'Deep Learning & Neural Architectures',
      date: '2026-10-31',
      timeSlot: '09:00 - 10:30 AM',
      status: 'PRESENT',
      facultyName: 'Prof. Alexander Wright',
    },
    {
      id: 'att-2',
      studentId: 'user-stu-1',
      studentName: 'Marcus Chen',
      rollNo: 'SU-2024-CS-042',
      subjectCode: 'CS502',
      subjectName: 'Distributed Cloud Systems',
      date: '2026-10-31',
      timeSlot: '11:00 - 12:30 PM',
      status: 'PRESENT',
      facultyName: 'Prof. Alexander Wright',
    },
    {
      id: 'att-3',
      studentId: 'user-stu-1',
      studentName: 'Marcus Chen',
      rollNo: 'SU-2024-CS-042',
      subjectCode: 'CS503',
      subjectName: 'Advanced Database Engineering',
      date: '2026-10-30',
      timeSlot: '02:00 - 03:30 PM',
      status: 'PRESENT',
      facultyName: 'Prof. Alexander Wright',
    },
    {
      id: 'att-4',
      studentId: 'user-stu-1',
      studentName: 'Marcus Chen',
      rollNo: 'SU-2024-CS-042',
      subjectCode: 'CS504',
      subjectName: 'Cyber Security & Cryptography',
      date: '2026-10-28',
      timeSlot: '10:00 - 11:30 AM',
      status: 'ABSENT',
      facultyName: 'Dr. Priya Sharma',
    },
  ]);

  const [marksRecords, setMarksRecords] = useState<MarkRecord[]>([
    {
      id: 'mk-1',
      studentId: 'user-stu-1',
      subjectCode: 'CS501',
      subjectName: 'Deep Learning',
      assessment: 'Internal Assessment 1',
      maxMarks: 50,
      obtainedMarks: 48.5,
      grade: 'O',
      status: 'Outstanding',
      date: '2026-10-15',
    },
    {
      id: 'mk-2',
      studentId: 'user-stu-1',
      subjectCode: 'CS501',
      subjectName: 'Deep Learning',
      assessment: 'Internal Assessment 2',
      maxMarks: 50,
      obtainedMarks: 47.0,
      grade: 'A+',
      status: 'Very Good',
      date: '2026-10-25',
    },
    {
      id: 'mk-3',
      studentId: 'user-stu-1',
      subjectCode: 'CS502',
      subjectName: 'Distributed Cloud Systems',
      assessment: 'Internal Assessment 1',
      maxMarks: 50,
      obtainedMarks: 46.5,
      grade: 'A+',
      status: 'Very Good',
      date: '2026-10-16',
    },
    {
      id: 'mk-4',
      studentId: 'user-stu-1',
      subjectCode: 'CS503',
      subjectName: 'Database Engineering',
      assessment: 'Internal Assessment 1',
      maxMarks: 50,
      obtainedMarks: 49.0,
      grade: 'O',
      status: 'Outstanding',
      date: '2026-10-17',
    },
    {
      id: 'mk-5',
      studentId: 'user-stu-1',
      subjectCode: 'CS504',
      subjectName: 'Cyber Security',
      assessment: 'Internal Assessment 1',
      maxMarks: 50,
      obtainedMarks: 45.0,
      grade: 'A+',
      status: 'Very Good',
      date: '2026-10-18',
    },
  ]);

  const [semesterResults] = useState<SemesterResult[]>([
    { semester: 'Semester 1', gpa: 3.75, credits: 24, status: 'Completed' },
    { semester: 'Semester 2', gpa: 3.82, credits: 24, status: 'Completed' },
    { semester: 'Semester 3', gpa: 3.88, credits: 24, status: 'Completed' },
    { semester: 'Semester 4', gpa: 3.91, credits: 24, status: 'Completed' },
    { semester: 'Semester 5 (Current)', gpa: 3.84, credits: 24, status: 'In Progress' },
  ]);

  const [timetables] = useState<TimetableEntry[]>([
    {
      id: 'tt-1',
      day: 'Monday',
      time: '09:00 AM - 10:30 AM',
      subject: 'Deep Learning & Neural Architectures',
      code: 'CS501',
      faculty: 'Prof. Alexander Wright',
      room: 'Turing Hall 301',
      type: 'Lecture',
    },
    {
      id: 'tt-2',
      day: 'Monday',
      time: '11:00 AM - 12:30 PM',
      subject: 'Distributed Cloud Systems Lab',
      code: 'CS502',
      faculty: 'Prof. Alexander Wright',
      room: 'Cloud Cluster Lab 4',
      type: 'Practical Lab',
    },
    {
      id: 'tt-3',
      day: 'Tuesday',
      time: '09:00 AM - 10:30 AM',
      subject: 'Advanced Database Engineering',
      code: 'CS503',
      faculty: 'Prof. Alexander Wright',
      room: 'Turing Hall 205',
      type: 'Lecture',
    },
    {
      id: 'tt-4',
      day: 'Tuesday',
      time: '01:30 PM - 03:00 PM',
      subject: 'Cyber Security & Cryptography',
      code: 'CS504',
      faculty: 'Dr. Priya Sharma',
      room: 'Security Warfare Lab',
      type: 'Hands-on Lab',
    },
    {
      id: 'tt-5',
      day: 'Wednesday',
      time: '10:00 AM - 11:30 AM',
      subject: 'Deep Learning Seminar & Paper Review',
      code: 'CS501',
      faculty: 'Prof. Alexander Wright',
      room: 'Auditorium Alpha',
      type: 'Seminar',
    },
    {
      id: 'tt-6',
      day: 'Thursday',
      time: '09:00 AM - 10:30 AM',
      subject: 'Distributed Cloud Systems',
      code: 'CS502',
      faculty: 'Prof. Alexander Wright',
      room: 'Turing Hall 301',
      type: 'Lecture',
    },
    {
      id: 'tt-7',
      day: 'Friday',
      time: '11:00 AM - 01:00 PM',
      subject: 'Capstone Project Mentoring & Code Review',
      code: 'CS599',
      faculty: 'Faculty Panel',
      room: 'Innovation Incubator',
      type: 'Workshop',
    },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'asg-1',
      title: 'Transformer Architecture from Scratch',
      subjectCode: 'CS501',
      subjectName: 'Deep Learning',
      facultyName: 'Prof. Alexander Wright',
      dueDate: '2026-11-08',
      totalPoints: 100,
      status: 'PENDING',
      description: 'Implement multi-head self-attention and positional encodings in PyTorch or JAX. Evaluate on the AG News dataset with convergence loss plots.',
      submission: null,
    },
    {
      id: 'asg-2',
      title: 'Raft Consensus Protocol Implementation',
      subjectCode: 'CS502',
      subjectName: 'Distributed Cloud Systems',
      facultyName: 'Prof. Alexander Wright',
      dueDate: '2026-11-15',
      totalPoints: 100,
      status: 'PENDING',
      description: 'Build a 3-node cluster handling leader election and log replication during simulated network partitions.',
      submission: null,
    },
    {
      id: 'asg-3',
      title: 'B-Tree Index Optimizer in C++',
      subjectCode: 'CS503',
      subjectName: 'Advanced Database Engineering',
      facultyName: 'Prof. Alexander Wright',
      dueDate: '2026-10-22',
      totalPoints: 100,
      status: 'GRADED',
      description: 'Implement high-performance B-tree indexing with cache line optimization and branchless binary searches.',
      marksAwarded: 98,
      feedback: 'Outstanding cache locality optimization and clean memory leak-free implementation.',
      submission: 'Submitted on Oct 21: github.com/student/btree-opt',
    },
  ]);

  const [examinations] = useState<Examination[]>([
    {
      id: 'ex-1',
      subjectCode: 'CS501',
      subjectName: 'Deep Learning & Neural Architectures',
      examType: 'Mid-Semester Written Examination',
      date: '2026-11-20',
      time: '09:30 AM - 12:30 PM',
      hall: 'Exam Complex Hall B',
      seatNo: 'B-42',
      status: 'Scheduled',
    },
    {
      id: 'ex-2',
      subjectCode: 'CS502',
      subjectName: 'Distributed Cloud Systems',
      examType: 'Hands-on Practical Examination',
      date: '2026-11-24',
      time: '02:00 PM - 05:00 PM',
      hall: 'Cloud Systems Terminal Lab 2',
      seatNo: 'TL-18',
      status: 'Scheduled',
    },
    {
      id: 'ex-3',
      subjectCode: 'CS503',
      subjectName: 'Advanced Database Engineering',
      examType: 'Final Theory Assessment',
      date: '2026-11-27',
      time: '09:30 AM - 12:30 PM',
      hall: 'Exam Complex Hall B',
      seatNo: 'B-42',
      status: 'Scheduled',
    },
  ]);

  const [books, setBooks] = useState<LibraryBook[]>([
    {
      id: 'bk-1',
      isbn: '978-0262035613',
      title: 'Deep Learning',
      author: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
      category: 'Artificial Intelligence',
      totalCopies: 8,
      availableCopies: 4,
      shelfLocation: 'Shelf AI-01',
      coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=256',
      status: 'AVAILABLE',
    },
    {
      id: 'bk-2',
      isbn: '978-1491950357',
      title: 'Designing Data-Intensive Applications',
      author: 'Martin Kleppmann',
      category: 'Systems Engineering',
      totalCopies: 12,
      availableCopies: 5,
      shelfLocation: 'Shelf SYS-09',
      coverUrl: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?auto=format&fit=crop&q=80&w=256',
      status: 'AVAILABLE',
    },
    {
      id: 'bk-3',
      isbn: '978-0134685991',
      title: 'Effective Java (3rd Edition)',
      author: 'Joshua Bloch',
      category: 'Computer Science',
      totalCopies: 10,
      availableCopies: 8,
      shelfLocation: 'Shelf CS-04',
      coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=256',
      status: 'AVAILABLE',
    },
    {
      id: 'bk-4',
      isbn: '978-0321573513',
      title: 'Algorithms (4th Edition)',
      author: 'Robert Sedgewick, Kevin Wayne',
      category: 'Algorithms',
      totalCopies: 10,
      availableCopies: 7,
      shelfLocation: 'Shelf ALG-03',
      coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=256',
      status: 'AVAILABLE',
    },
  ]);

  const [bookTransactions, setBookTransactions] = useState<BookTransaction[]>([
    {
      id: 'tx-1',
      bookTitle: 'Deep Learning',
      isbn: '978-0262035613',
      borrowDate: '2026-10-15',
      dueDate: '2026-11-15',
      status: 'BORROWED',
      fine: 0,
    },
    {
      id: 'tx-2',
      bookTitle: 'Designing Data-Intensive Applications',
      isbn: '978-1491950357',
      borrowDate: '2026-09-10',
      dueDate: '2026-10-10',
      returnDate: '2026-10-08',
      status: 'RETURNED',
      fine: 0,
    },
  ]);

  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([
    {
      id: 'fee-1',
      title: 'Semester 5 Tuition Fee',
      academicYear: '2026 - 2027',
      totalAmount: 3500.0,
      paidAmount: 3500.0,
      balance: 0.0,
      dueDate: '2026-09-30',
      status: 'PAID',
      method: 'Net Banking (Simulated)',
      receiptNo: 'REC-SU-2026-9081',
      paidDate: '2026-09-28',
    },
    {
      id: 'fee-2',
      title: 'Laboratory & High-Performance Computing Access',
      academicYear: '2026 - 2027',
      totalAmount: 750.0,
      paidAmount: 750.0,
      balance: 0.0,
      dueDate: '2026-09-30',
      status: 'PAID',
      method: 'Card Payment (Simulated)',
      receiptNo: 'REC-SU-2026-9082',
      paidDate: '2026-09-28',
    },
    {
      id: 'fee-3',
      title: 'Semester Examination & Digital Library Dues',
      academicYear: '2026 - 2027',
      totalAmount: 250.0,
      paidAmount: 0.0,
      balance: 250.0,
      dueDate: '2026-11-25',
      status: 'PENDING',
      method: null,
      receiptNo: null,
      paidDate: null,
    },
  ]);

  const [grievances, setGrievances] = useState<Grievance[]>([
    {
      id: 'grv-1',
      studentId: 'user-stu-1',
      studentName: 'Marcus Chen',
      category: 'FACILITIES',
      subject: 'Wi-Fi Latency in Computer Lab 3',
      description: 'The gigabit connection in Computer Lab 3 experiences packet drops during deep learning model weight downloads.',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      createdAt: '2026-10-28',
      responses: [
        {
          id: 'grv-res-1',
          authorName: 'Dr. Sarah Jenkins (Admin)',
          text: 'Campus Network Operations has scheduled firmware re-flashing and load balancing for the access points tonight.',
          date: '2026-10-29',
        },
      ],
    },
    {
      id: 'grv-2',
      studentId: 'user-stu-1',
      studentName: 'Marcus Chen',
      category: 'ACADEMIC',
      subject: 'Request for Elective Course Credit Transfer',
      description: 'Submitted verified certificate for MOOC Cloud Computing specialization to count towards semester 5 open elective.',
      priority: 'LOW',
      status: 'RESOLVED',
      createdAt: '2026-10-12',
      responses: [
        {
          id: 'grv-res-2',
          authorName: 'Academic Registrar Office',
          text: 'Elective credits verified and recorded into your official academic transcript.',
          date: '2026-10-14',
        },
      ],
    },
  ]);

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 'ann-1',
      title: 'Smart Campus Digital Transformation Platform 2.0 Live',
      content: 'Welcome to the unified Smart University portal! Students and faculty can now access real-time attendance, digital transcripts, AI tutoring, and fee receipts in one place.',
      category: 'ACADEMIC',
      target: 'ALL',
      author: 'Dr. Sarah Jenkins (Registrar)',
      isPinned: true,
      date: '2026-11-01',
    },
    {
      id: 'ann-2',
      title: 'Annual University Innovation & AI Hackathon',
      content: 'Registrations are open for the 48-Hour Global AI Innovation Challenge. $25,000 prize pool and incubation support for top 3 student teams.',
      category: 'EVENT',
      target: 'STUDENT',
      author: 'Research & Innovation Cell',
      isPinned: false,
      date: '2026-10-29',
    },
    {
      id: 'ann-3',
      title: 'End-Semester Examination Hall Tickets Available',
      content: 'Hall tickets for November 2026 examinations are ready for download. Please ensure attendance requirements (>75%) are fulfilled before exam dates.',
      category: 'EXAM',
      target: 'ALL',
      author: 'Controller of Examinations',
      isPinned: true,
      date: '2026-10-27',
    },
  ]);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'New Assignment Published',
      message: 'Prof. Alexander Wright published "Transformer Architecture from Scratch" due in 7 days.',
      type: 'ASSIGNMENT',
      isRead: false,
      time: '10 mins ago',
    },
    {
      id: 'notif-2',
      title: 'Attendance Standing: Excellent (94.2%)',
      message: 'You have maintained >90% attendance across all subjects this semester. Keep it up!',
      type: 'ATTENDANCE',
      isRead: false,
      time: '2 hours ago',
    },
    {
      id: 'notif-3',
      title: 'Fee Payment Reminder',
      message: 'Examination & Digital Library Dues ($250.00) are due by November 25, 2026.',
      type: 'FEE',
      isRead: true,
      time: '1 day ago',
    },
  ]);

  const [students, setStudents] = useState<StudentItem[]>([
    {
      id: 'stu-1',
      name: 'Marcus Chen',
      email: 'student@smartuni.edu',
      studentId: 'SU-2024-CS-042',
      department: 'Computer Science & Engineering',
      course: 'B.Tech Computer Science & AI',
      year: 3,
      semester: 5,
      section: 'A',
      cgpa: 3.84,
      attendanceRate: 94.2,
      pendingFees: 250,
      phone: '+1 (555) 234-8901',
      status: 'ACTIVE',
      admissionDate: '2024-08-15',
    },
    {
      id: 'stu-2',
      name: 'Aisha Khan',
      email: 'aisha@smartuni.edu',
      studentId: 'SU-2024-CS-043',
      department: 'Computer Science & Engineering',
      course: 'B.Tech Computer Science & AI',
      year: 3,
      semester: 5,
      section: 'A',
      cgpa: 3.92,
      attendanceRate: 98.0,
      pendingFees: 0,
      phone: '+1 (555) 345-6789',
      status: 'ACTIVE',
      admissionDate: '2024-08-15',
    },
    {
      id: 'stu-3',
      name: 'Liam Ross',
      email: 'liam@smartuni.edu',
      studentId: 'SU-2024-EC-015',
      department: 'Electronics & Communication',
      course: 'B.Tech Electronics & Robotics',
      year: 2,
      semester: 3,
      section: 'B',
      cgpa: 3.45,
      attendanceRate: 88.5,
      pendingFees: 1200,
      phone: '+1 (555) 456-7890',
      status: 'ACTIVE',
      admissionDate: '2025-08-20',
    },
    {
      id: 'stu-4',
      name: 'Devon Vance',
      email: 'devon@smartuni.edu',
      studentId: 'SU-2024-CS-088',
      department: 'Computer Science & Engineering',
      course: 'B.Tech Computer Science & AI',
      year: 3,
      semester: 5,
      section: 'A',
      cgpa: 2.85,
      attendanceRate: 68.5,
      pendingFees: 3500,
      phone: '+1 (555) 567-8901',
      status: 'DEACTIVATED',
      admissionDate: '2024-08-15',
    },
    {
      id: 'stu-5',
      name: 'Chloe Bennett',
      email: 'chloe@smartuni.edu',
      studentId: 'SU-2024-CS-092',
      department: 'Computer Science & Engineering',
      course: 'B.Tech Computer Science & AI',
      year: 3,
      semester: 5,
      section: 'A',
      cgpa: 3.55,
      attendanceRate: 71.2,
      pendingFees: 500,
      phone: '+1 (555) 678-9012',
      status: 'ACTIVE',
      admissionDate: '2024-08-15',
    },
    {
      id: 'stu-6',
      name: 'Siddharth Patel',
      email: 'siddharth@smartuni.edu',
      studentId: 'SU-2024-CS-104',
      department: 'Computer Science & Engineering',
      course: 'B.Tech Computer Science & AI',
      year: 2,
      semester: 3,
      section: 'A',
      cgpa: 3.65,
      attendanceRate: 91.0,
      pendingFees: 0,
      phone: '+1 (555) 789-0123',
      status: 'ACTIVE',
      admissionDate: '2025-08-20',
    },
  ]);

  const [facultyList, setFacultyList] = useState<FacultyItem[]>([
    {
      id: 'fac-1',
      name: 'Prof. Alexander Wright',
      email: 'faculty@smartuni.edu',
      employeeId: 'FAC-CS-101',
      department: 'Computer Science & Engineering',
      designation: 'Associate Professor & AI Lab Director',
      qualification: 'Ph.D. in Computer Science (MIT)',
      specialization: 'Deep Learning & Distributed Systems',
      officeRoom: 'Turing Hall 302',
      phone: '+1 (555) 014-9820',
      assignedSubjectsCount: 3,
      totalStudentsAssigned: 142,
      status: 'ACTIVE',
      joiningDate: '2019-07-01',
    },
    {
      id: 'fac-2',
      name: 'Dr. Priya Sharma',
      email: 'sharma@smartuni.edu',
      employeeId: 'FAC-EC-102',
      department: 'Electronics & Communication',
      designation: 'Professor & Head of Department',
      qualification: 'Ph.D. in VLSI Systems (Stanford)',
      specialization: 'Neural Silicon & IoT Hardware',
      officeRoom: 'Tesla Complex 104',
      phone: '+1 (555) 018-7712',
      assignedSubjectsCount: 2,
      totalStudentsAssigned: 110,
      status: 'ACTIVE',
      joiningDate: '2017-06-15',
    },
    {
      id: 'fac-3',
      name: 'Dr. David Miller',
      email: 'miller@smartuni.edu',
      employeeId: 'FAC-ME-103',
      department: 'Mechanical & Aerospace Engineering',
      designation: 'Professor & Head of Department',
      qualification: 'Ph.D. in Aerospace (Caltech)',
      specialization: 'Autonomous Propulsion & Smart Materials',
      officeRoom: 'Newton Pavilion 201',
      phone: '+1 (555) 017-3344',
      assignedSubjectsCount: 3,
      totalStudentsAssigned: 95,
      status: 'ACTIVE',
      joiningDate: '2018-09-01',
    },
    {
      id: 'fac-4',
      name: 'Dr. Elena Rostova',
      email: 'rostova@smartuni.edu',
      employeeId: 'FAC-MG-104',
      department: 'School of Business & Data Analytics',
      designation: 'Associate Professor & Dean',
      qualification: 'Ph.D. in FinTech Analytics (Oxford)',
      specialization: 'Data Science & Strategic Innovation',
      officeRoom: 'Babbage Tower 402',
      phone: '+1 (555) 016-5599',
      assignedSubjectsCount: 2,
      totalStudentsAssigned: 80,
      status: 'ACTIVE',
      joiningDate: '2020-01-10',
    },
  ]);

  const addStudent = (newStu: Omit<StudentItem, 'id' | 'status'> & { status?: 'ACTIVE' | 'DEACTIVATED' }) => {
    const student: StudentItem = {
      ...newStu,
      id: `stu-${Date.now()}`,
      status: newStu.status || 'ACTIVE',
      admissionDate: newStu.admissionDate || new Date().toISOString().split('T')[0],
    };
    setStudents(prev => [student, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Student Enrolled',
        message: `${student.name} (${student.studentId}) successfully registered in ${student.department}.`,
        type: 'ASSIGNMENT',
        isRead: false,
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  const updateStudent = (id: string, updated: Partial<StudentItem>) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
  };

  const toggleStudentStatus = (id: string) => {
    setStudents(prev =>
      prev.map(s =>
        s.id === id ? { ...s, status: s.status === 'ACTIVE' ? 'DEACTIVATED' : 'ACTIVE' } : s
      )
    );
  };

  const addFaculty = (newFac: Omit<FacultyItem, 'id' | 'status'> & { status?: 'ACTIVE' | 'DEACTIVATED' }) => {
    const faculty: FacultyItem = {
      ...newFac,
      id: `fac-${Date.now()}`,
      status: newFac.status || 'ACTIVE',
      joiningDate: newFac.joiningDate || new Date().toISOString().split('T')[0],
      assignedSubjectsCount: newFac.assignedSubjectsCount || 1,
      totalStudentsAssigned: newFac.totalStudentsAssigned || 45,
    };
    setFacultyList(prev => [faculty, ...prev]);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'New Faculty Appointed',
        message: `${faculty.name} (${faculty.employeeId}) appointed to ${faculty.department}.`,
        type: 'ASSIGNMENT',
        isRead: false,
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  const updateFaculty = (id: string, updated: Partial<FacultyItem>) => {
    setFacultyList(prev => prev.map(f => (f.id === id ? { ...f, ...updated } : f)));
  };

  const toggleFacultyStatus = (id: string) => {
    setFacultyList(prev =>
      prev.map(f =>
        f.id === id ? { ...f, status: f.status === 'ACTIVE' ? 'DEACTIVATED' : 'ACTIVE' } : f
      )
    );
  };

  // Actions
  const recordAttendance = (data: { studentId: string; studentName: string; rollNo: string; subjectCode: string; status: 'PRESENT' | 'ABSENT' | 'LATE'; timeSlot?: string }) => {
    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      studentId: data.studentId,
      studentName: data.studentName,
      rollNo: data.rollNo,
      subjectCode: data.subjectCode,
      subjectName: subjects.find(s => s.code === data.subjectCode)?.name || data.subjectCode,
      date: new Date().toISOString().split('T')[0],
      timeSlot: data.timeSlot || '09:00 - 10:30 AM',
      status: data.status,
      facultyName: 'Prof. Alexander Wright',
    };
    setAttendanceRecords(prev => [newRecord, ...prev]);
  };

  const submitMarks = (mark: { studentId: string; subjectCode: string; assessment: string; maxMarks: number; obtainedMarks: number; remarks?: string }) => {
    const ratio = mark.obtainedMarks / mark.maxMarks;
    const grade = ratio >= 0.9 ? 'O' : (ratio >= 0.8 ? 'A+' : (ratio >= 0.7 ? 'A' : (ratio >= 0.6 ? 'B+' : 'B')));
    const newRecord: MarkRecord = {
      id: `mk-${Date.now()}`,
      studentId: mark.studentId,
      subjectCode: mark.subjectCode,
      subjectName: subjects.find(s => s.code === mark.subjectCode)?.name || mark.subjectCode,
      assessment: mark.assessment,
      maxMarks: mark.maxMarks,
      obtainedMarks: mark.obtainedMarks,
      grade,
      status: 'Verified',
      date: new Date().toISOString().split('T')[0],
    };
    setMarksRecords(prev => [newRecord, ...prev]);
  };

  const submitAssignment = (assignmentId: string, submissionText: string) => {
    setAssignments(prev =>
      prev.map(a =>
        a.id === assignmentId
          ? { ...a, status: 'SUBMITTED', submission: submissionText }
          : a
      )
    );
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Assignment Submitted',
        message: 'Your assignment submission was successfully uploaded and logged.',
        type: 'ASSIGNMENT',
        isRead: false,
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  const createAssignment = (newAsg: Omit<Assignment, 'id' | 'status' | 'submission'>) => {
    const asg: Assignment = {
      ...newAsg,
      id: `asg-${Date.now()}`,
      status: 'PENDING',
      submission: null,
    };
    setAssignments(prev => [asg, ...prev]);
  };

  const borrowBook = (bookId: string): boolean => {
    const book = books.find(b => b.id === bookId);
    if (!book || book.availableCopies <= 0) return false;

    setBooks(prev =>
      prev.map(b => (b.id === bookId ? { ...b, availableCopies: b.availableCopies - 1 } : b))
    );

    const newTx: BookTransaction = {
      id: `tx-${Date.now()}`,
      bookTitle: book.title,
      isbn: book.isbn,
      borrowDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'BORROWED',
      fine: 0,
    };

    setBookTransactions(prev => [newTx, ...prev]);
    return true;
  };

  const returnBook = (transactionId: string) => {
    const tx = bookTransactions.find(t => t.id === transactionId);
    if (!tx) return;

    setBookTransactions(prev =>
      prev.map(t =>
        t.id === transactionId
          ? { ...t, status: 'RETURNED', returnDate: new Date().toISOString().split('T')[0] }
          : t
      )
    );

    setBooks(prev =>
      prev.map(b => (b.title === tx.bookTitle ? { ...b, availableCopies: b.availableCopies + 1 } : b))
    );
  };

  const payFee = (feeId: string, method = 'Simulated Net Banking') => {
    setFeeRecords(prev =>
      prev.map(f =>
        f.id === feeId
          ? {
              ...f,
              paidAmount: f.totalAmount,
              balance: 0,
              status: 'PAID',
              method: `${method} (Simulation)`,
              receiptNo: `REC-SU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
              paidDate: new Date().toISOString().split('T')[0],
            }
          : f
      )
    );

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Fee Payment Verified',
        message: 'Your simulated payment was processed and the official receipt has been issued.',
        type: 'FEE',
        isRead: false,
        time: 'Just now',
      },
      ...prev,
    ]);
  };

  const createGrievance = (ticket: {
    subject: string;
    category: Grievance['category'];
    description: string;
    priority: Grievance['priority'];
  }) => {
    const newGrievance: Grievance = {
      id: `grv-${Date.now()}`,
      studentId: 'user-stu-1',
      studentName: 'Marcus Chen',
      category: ticket.category,
      subject: ticket.subject,
      description: ticket.description,
      priority: ticket.priority,
      status: 'PENDING',
      createdAt: new Date().toISOString().split('T')[0],
      responses: [],
    };
    setGrievances(prev => [newGrievance, ...prev]);
  };

  const respondGrievance = (
    grievanceId: string,
    responseText: string,
    newStatus?: Grievance['status']
  ) => {
    setGrievances(prev =>
      prev.map(g => {
        if (g.id !== grievanceId) return g;
        const updatedResponses = [
          ...g.responses,
          {
            id: `grv-res-${Date.now()}`,
            authorName: 'University Administration Desk',
            text: responseText,
            date: new Date().toISOString().split('T')[0],
          },
        ];
        return {
          ...g,
          status: newStatus || g.status,
          responses: updatedResponses,
        };
      })
    );
  };

  const createAnnouncement = (ann: Omit<Announcement, 'id' | 'date'>) => {
    const newAnn: Announcement = {
      ...ann,
      id: `ann-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setAnnouncements(prev => [newAnn, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotifCount = notifications.filter(n => !n.isRead).length;

  return (
    <DataContext.Provider
      value={{
        departments,
        subjects,
        attendanceRecords,
        marksRecords,
        semesterResults,
        timetables,
        assignments,
        examinations,
        books,
        bookTransactions,
        feeRecords,
        grievances,
        announcements,
        notifications,
        unreadNotifCount,
        students,
        facultyList,
        addStudent,
        updateStudent,
        toggleStudentStatus,
        addFaculty,
        updateFaculty,
        toggleFacultyStatus,
        recordAttendance,
        submitMarks,
        submitAssignment,
        createAssignment,
        borrowBook,
        returnBook,
        payFee,
        createGrievance,
        respondGrievance,
        createAnnouncement,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within a DataProvider');
  return context;
};
