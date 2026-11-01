// TypeScript Type Definitions for Smart University Platform

export type UserRole = 'STUDENT' | 'FACULTY' | 'ADMINISTRATOR';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  address?: string;
  department?: string;
  departmentId?: string;
  // Student specific
  studentId?: string;
  course?: string;
  year?: number;
  semester?: number;
  section?: string;
  cgpa?: number;
  attendanceRate?: number;
  pendingFees?: number;
  totalCredits?: number;
  status?: string;
  // Faculty specific
  employeeId?: string;
  title?: string;
  specialization?: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  hod: string;
  building: string;
  email: string;
  studentsCount: number;
  facultyCount: number;
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  facultyId: string;
  facultyName: string;
  departmentId: string;
  totalClasses: number;
  attendedClasses: number;
  percentage: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNo: string;
  subjectCode: string;
  subjectName: string;
  date: string;
  timeSlot: string;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'EXCUSED';
  facultyName: string;
}

export interface MarkRecord {
  id: string;
  studentId: string;
  subjectCode: string;
  subjectName: string;
  assessment: string;
  maxMarks: number;
  obtainedMarks: number;
  grade: string;
  status: string;
  date: string;
}

export interface SemesterResult {
  semester: string;
  gpa: number;
  credits: number;
  status: string;
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  code: string;
  faculty: string;
  room: string;
  type: string;
}

export interface Assignment {
  id: string;
  title: string;
  subjectCode: string;
  subjectName: string;
  facultyName: string;
  dueDate: string;
  totalPoints: number;
  status: 'PENDING' | 'SUBMITTED' | 'GRADED';
  description: string;
  marksAwarded?: number;
  feedback?: string;
  submission?: string | null;
}

export interface Examination {
  id: string;
  subjectCode: string;
  subjectName: string;
  examType: string;
  date: string;
  time: string;
  hall: string;
  seatNo: string;
  status: string;
}

export interface LibraryBook {
  id: string;
  isbn: string;
  title: string;
  author: string;
  category: string;
  totalCopies: number;
  availableCopies: number;
  shelfLocation: string;
  coverUrl: string;
  status: 'AVAILABLE' | 'BORROWED';
}

export interface BookTransaction {
  id: string;
  bookTitle: string;
  isbn: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'BORROWED' | 'RETURNED' | 'OVERDUE';
  fine: number;
}

export interface FeeRecord {
  id: string;
  title: string;
  academicYear: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  dueDate: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  method?: string | null;
  receiptNo?: string | null;
  paidDate?: string | null;
}

export interface GrievanceResponse {
  id: string;
  authorName: string;
  text: string;
  date: string;
}

export interface Grievance {
  id: string;
  studentId: string;
  studentName: string;
  category: 'ACADEMIC' | 'FACILITIES' | 'HOSTEL' | 'FINANCIAL' | 'EXAM' | 'OTHER';
  subject: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  createdAt: string;
  responses: GrievanceResponse[];
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: 'ACADEMIC' | 'EVENT' | 'EXAM' | 'URGENT';
  target: 'ALL' | 'STUDENT' | 'FACULTY';
  author: string;
  isPinned: boolean;
  date: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'ATTENDANCE' | 'FEE' | 'EXAM' | 'ASSIGNMENT' | 'GRIEVANCE';
  isRead: boolean;
  time: string;
}

export interface StudentItem {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  course: string;
  year: number;
  semester: number;
  section: string;
  cgpa: number;
  attendanceRate: number;
  pendingFees: number;
  phone?: string;
  status: 'ACTIVE' | 'DEACTIVATED';
  admissionDate?: string;
}

export interface FacultyItem {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  designation: string;
  qualification: string;
  specialization: string;
  officeRoom: string;
  phone?: string;
  assignedSubjectsCount: number;
  totalStudentsAssigned: number;
  status: 'ACTIVE' | 'DEACTIVATED';
  joiningDate?: string;
}
