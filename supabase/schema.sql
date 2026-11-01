-- ============================================================================
-- SMART UNIVERSITY - DIGITAL TRANSFORMATION PLATFORM
-- DATABASE SCHEMA (PostgreSQL / Supabase)
-- ============================================================================

-- 1. Create Custom Types & Enums
CREATE TYPE user_role AS ENUM ('STUDENT', 'FACULTY', 'ADMINISTRATOR');
CREATE TYPE attendance_status AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');
CREATE TYPE grievance_status AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');
CREATE TYPE grievance_priority AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');
CREATE TYPE fee_status AS ENUM ('PAID', 'PENDING', 'PARTIAL', 'OVERDUE');
CREATE TYPE assignment_status AS ENUM ('PENDING', 'SUBMITTED', 'GRADED', 'LATE');
CREATE TYPE book_status AS ENUM ('AVAILABLE', 'BORROWED', 'RESERVED', 'MAINTENANCE');

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Extends Supabase auth.users or standalone)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE, -- References auth.users(id) if Supabase Auth is enabled
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'STUDENT',
  avatar_url TEXT,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Departments
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  head_of_department VARCHAR(255),
  description TEXT,
  building VARCHAR(100),
  contact_email VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Faculty Members
CREATE TABLE IF NOT EXISTS faculty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  employee_id VARCHAR(50) NOT NULL UNIQUE,
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  designation VARCHAR(100) NOT NULL,
  qualification VARCHAR(255),
  specialization VARCHAR(255),
  office_room VARCHAR(50),
  joining_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Courses (Degree Programs e.g. B.Tech Computer Science)
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  code VARCHAR(20) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  degree_level VARCHAR(50) NOT NULL, -- 'Undergraduate', 'Postgraduate', 'Doctoral'
  duration_years INT NOT NULL DEFAULT 4,
  total_semesters INT NOT NULL DEFAULT 8,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Students
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  student_id VARCHAR(50) NOT NULL UNIQUE, -- e.g. SU-2024-CS-042
  department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  academic_year INT NOT NULL DEFAULT 3,
  current_semester INT NOT NULL DEFAULT 5,
  section VARCHAR(10) DEFAULT 'A',
  cgpa NUMERIC(3,2) DEFAULT 0.00,
  admission_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Subjects (Courses modules e.g. CS501 Data Structures)
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  credits INT NOT NULL DEFAULT 3,
  semester INT NOT NULL,
  faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
  description TEXT,
  syllabus TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Enrollments (Student - Subject mapping)
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  academic_year INT NOT NULL,
  semester INT NOT NULL,
  enrollment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  status VARCHAR(20) DEFAULT 'ENROLLED',
  UNIQUE(student_id, subject_id, semester)
);

-- 9. Attendance
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
  date DATE NOT NULL,
  status attendance_status NOT NULL DEFAULT 'PRESENT',
  time_slot VARCHAR(50),
  remarks TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(student_id, subject_id, date, time_slot)
);

-- 10. Marks (Internal, Mid-term, Continuous Assessment)
CREATE TABLE IF NOT EXISTS marks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  assessment_type VARCHAR(100) NOT NULL, -- 'Internal Test 1', 'Internal Test 2', 'Lab Evaluation', 'Quiz'
  max_marks NUMERIC(5,2) NOT NULL,
  marks_obtained NUMERIC(5,2) NOT NULL,
  faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
  remarks TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Assignments
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  faculty_id UUID NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  total_points INT DEFAULT 100,
  attachment_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Submissions
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  submission_text TEXT,
  file_url TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status assignment_status NOT NULL DEFAULT 'SUBMITTED',
  marks_awarded NUMERIC(5,2),
  feedback TEXT,
  graded_at TIMESTAMPTZ,
  UNIQUE(assignment_id, student_id)
);

-- 13. Timetables
CREATE TABLE IF NOT EXISTS timetables (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  semester INT NOT NULL,
  section VARCHAR(10) DEFAULT 'A',
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
  day_of_week VARCHAR(20) NOT NULL, -- 'Monday', 'Tuesday', ...
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Examinations
CREATE TABLE IF NOT EXISTS examinations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  exam_type VARCHAR(100) NOT NULL, -- 'End Semester Examination', 'Mid Term', 'Practical'
  exam_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room_number VARCHAR(50),
  invigilator_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
  instructions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. Results (Semester End Official Results)
CREATE TABLE IF NOT EXISTS results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  semester INT NOT NULL,
  internal_marks NUMERIC(5,2) NOT NULL,
  external_marks NUMERIC(5,2) NOT NULL,
  total_marks NUMERIC(5,2) NOT NULL,
  grade VARCHAR(5) NOT NULL, -- 'O', 'A+', 'A', 'B+', 'B', 'RA'
  grade_point NUMERIC(3,1) NOT NULL,
  status VARCHAR(20) DEFAULT 'PASSED',
  published_date DATE DEFAULT CURRENT_DATE,
  UNIQUE(student_id, subject_id, semester)
);

-- 16. Books (Digital & Physical Library)
CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  isbn VARCHAR(30) UNIQUE,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  total_copies INT NOT NULL DEFAULT 5,
  available_copies INT NOT NULL DEFAULT 5,
  shelf_location VARCHAR(50),
  cover_url TEXT,
  description TEXT,
  status book_status NOT NULL DEFAULT 'AVAILABLE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. Book Transactions (Issuing & Returns)
CREATE TABLE IF NOT EXISTS book_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  return_date DATE,
  fine_amount NUMERIC(6,2) DEFAULT 0.00,
  status VARCHAR(30) NOT NULL DEFAULT 'ISSUED', -- 'ISSUED', 'RETURNED', 'OVERDUE'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. Fee Records
CREATE TABLE IF NOT EXISTS fee_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  academic_year INT NOT NULL,
  semester INT NOT NULL,
  fee_type VARCHAR(100) NOT NULL, -- 'Tuition Fee', 'Hostel Fee', 'Laboratory & Library Fee', 'Exam Fee'
  amount NUMERIC(10,2) NOT NULL,
  paid_amount NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  balance_amount NUMERIC(10,2) NOT NULL,
  due_date DATE NOT NULL,
  status fee_status NOT NULL DEFAULT 'PENDING',
  payment_method VARCHAR(50),
  transaction_reference VARCHAR(100),
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  target_role VARCHAR(50) DEFAULT 'ALL', -- 'ALL', 'STUDENT', 'FACULTY'
  category VARCHAR(50) DEFAULT 'GENERAL', -- 'ACADEMIC', 'EVENT', 'EXAM', 'URGENT'
  is_pinned BOOLEAN DEFAULT FALSE,
  expires_at DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'ATTENDANCE', 'FEE', 'EXAM', 'GRADE', 'GRIEVANCE', 'ASSIGNMENT'
  is_read BOOLEAN DEFAULT FALSE,
  link_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 21. Grievances
CREATE TABLE IF NOT EXISTS grievances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  category VARCHAR(100) NOT NULL, -- 'ACADEMIC', 'FACILITIES', 'HOSTEL', 'FINANCIAL', 'EXAM', 'OTHER'
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority grievance_priority NOT NULL DEFAULT 'MEDIUM',
  status grievance_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 22. Grievance Responses
CREATE TABLE IF NOT EXISTS grievance_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  grievance_id UUID NOT NULL REFERENCES grievances(id) ON DELETE CASCADE,
  responder_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  response_text TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_students_profile_id ON students(profile_id);
CREATE INDEX IF NOT EXISTS idx_students_department ON students(department_id);
CREATE INDEX IF NOT EXISTS idx_faculty_profile_id ON faculty(profile_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_date ON attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_attendance_subject ON attendance(subject_id);
CREATE INDEX IF NOT EXISTS idx_marks_student ON marks(student_id);
CREATE INDEX IF NOT EXISTS idx_assignments_subject ON assignments(subject_id);
CREATE INDEX IF NOT EXISTS idx_submissions_assignment ON submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_timetables_course_sem ON timetables(course_id, semester);
CREATE INDEX IF NOT EXISTS idx_notifications_profile ON notifications(profile_id, is_read);
CREATE INDEX IF NOT EXISTS idx_grievances_student ON grievances(student_id, status);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE marks ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE fee_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE grievances ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'ADMINISTRATOR'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- Profiles: Users can view all profiles, but only update their own
CREATE POLICY "Public profiles can be viewed by authenticated users"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE USING (auth.uid() = user_id OR is_admin());

-- Students: Students see own row; Faculty & Admin can see all students
CREATE POLICY "Students see own record, Faculty & Admin see all"
  ON students FOR SELECT USING (
    profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('FACULTY', 'ADMINISTRATOR'))
  );

-- Attendance: Students see own attendance; Faculty & Admin can insert/view all
CREATE POLICY "Student can see own attendance"
  ON attendance FOR SELECT USING (
    student_id IN (SELECT s.id FROM students s JOIN profiles p ON s.profile_id = p.id WHERE p.user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('FACULTY', 'ADMINISTRATOR'))
  );

CREATE POLICY "Faculty and admin can record attendance"
  ON attendance FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('FACULTY', 'ADMINISTRATOR'))
  );

-- Marks: Students see own; Faculty can enter & edit; Admin can manage
CREATE POLICY "Student can view own marks"
  ON marks FOR SELECT USING (
    student_id IN (SELECT s.id FROM students s JOIN profiles p ON s.profile_id = p.id WHERE p.user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('FACULTY', 'ADMINISTRATOR'))
  );

CREATE POLICY "Faculty can insert marks"
  ON marks FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role IN ('FACULTY', 'ADMINISTRATOR'))
  );

-- Fees: Students see own fees; Admin can manage
CREATE POLICY "Student views own fee records"
  ON fee_records FOR SELECT USING (
    student_id IN (SELECT s.id FROM students s JOIN profiles p ON s.profile_id = p.id WHERE p.user_id = auth.uid())
    OR is_admin()
  );

-- Grievances: Students see own; Admin sees all
CREATE POLICY "Student views and creates own grievances"
  ON grievances FOR SELECT USING (
    student_id IN (SELECT s.id FROM students s JOIN profiles p ON s.profile_id = p.id WHERE p.user_id = auth.uid())
    OR is_admin()
  );

CREATE POLICY "Student can create grievances"
  ON grievances FOR INSERT WITH CHECK (
    student_id IN (SELECT s.id FROM students s JOIN profiles p ON s.profile_id = p.id WHERE p.user_id = auth.uid())
    OR is_admin()
  );

CREATE POLICY "Admin can update grievances"
  ON grievances FOR UPDATE USING (is_admin());
