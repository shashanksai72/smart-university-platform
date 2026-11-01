-- ============================================================================
-- SMART UNIVERSITY - SAMPLE DEMO SEED DATA
-- (Clearly identified as demo data for sandbox & testing)
-- ============================================================================

-- Clean existing data in reverse dependency order
TRUNCATE grievance_responses, grievances, notifications, announcements, fee_records, 
  book_transactions, books, results, examinations, timetables, submissions, assignments, 
  marks, attendance, enrollments, subjects, students, courses, faculty, departments, profiles CASCADE;

-- 1. Insert Departments
INSERT INTO departments (id, code, name, head_of_department, description, building, contact_email) VALUES
  ('11111111-1111-1111-1111-111111111101', 'CSE', 'Computer Science & Engineering', 'Dr. Aris Thorne', 'Cutting-edge computing, AI, systems, and cyber security research.', 'Turing Hall, West Wing', 'cse@smartuni.edu'),
  ('11111111-1111-1111-1111-111111111102', 'ECE', 'Electronics & Communication', 'Dr. Priya Sharma', 'Next-gen semiconductor, IoT, robotics, and communication systems.', 'Tesla Complex, East Wing', 'ece@smartuni.edu'),
  ('11111111-1111-1111-1111-111111111103', 'MECH', 'Mechanical & Aerospace Engineering', 'Dr. David Miller', 'Advanced materials, autonomous propulsion, and smart manufacturing.', 'Newton Pavilion, North Wing', 'mech@smartuni.edu'),
  ('11111111-1111-1111-1111-111111111104', 'MGMT', 'School of Business & Data Analytics', 'Dr. Elena Rostova', 'FinTech, modern business strategy, and technological innovation.', 'Babbage Tower, South Wing', 'mgmt@smartuni.edu');

-- 2. Insert Profiles
-- Admin
INSERT INTO profiles (id, email, full_name, role, avatar_url, phone, address) VALUES
  ('22222222-2222-2222-2222-222222222201', 'admin@smartuni.edu', 'Dr. Sarah Jenkins (Registrar & Admin)', 'ADMINISTRATOR', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256', '+1-555-0100', 'University Administration Quad, Suite 101');

-- Faculty
INSERT INTO profiles (id, email, full_name, role, avatar_url, phone, address) VALUES
  ('22222222-2222-2222-2222-222222222202', 'faculty@smartuni.edu', 'Prof. Alexander Wright', 'FACULTY', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256', '+1-555-0101', 'Faculty Towers, Apt 4B'),
  ('22222222-2222-2222-2222-222222222203', 'sharma@smartuni.edu', 'Dr. Priya Sharma', 'FACULTY', 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=256', '+1-555-0102', 'Silicon Heights, Villa 12');

-- Students
INSERT INTO profiles (id, email, full_name, role, avatar_url, phone, address) VALUES
  ('22222222-2222-2222-2222-222222222204', 'student@smartuni.edu', 'Marcus Chen (Demo Student)', 'STUDENT', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256', '+1-555-0103', 'Pioneer Hall, Room 314'),
  ('22222222-2222-2222-2222-222222222205', 'aisha.khan@smartuni.edu', 'Aisha Khan', 'STUDENT', 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256', '+1-555-0104', 'Pioneer Hall, Room 316'),
  ('22222222-2222-2222-2222-222222222206', 'liam.ross@smartuni.edu', 'Liam Ross', 'STUDENT', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256', '+1-555-0105', 'Cascade Residence, Room 102');

-- 3. Insert Faculty Table Entries
INSERT INTO faculty (id, profile_id, employee_id, department_id, designation, qualification, specialization, office_room) VALUES
  ('33333333-3333-3333-3333-333333333301', '22222222-2222-2222-2222-222222222202', 'FAC-CS-101', '11111111-1111-1111-1111-111111111101', 'Associate Professor', 'Ph.D. in Computer Science (MIT)', 'Artificial Intelligence & Distributed Systems', 'TH-302'),
  ('33333333-3333-3333-3333-333333333302', '22222222-2222-2222-2222-222222222203', 'FAC-EC-102', '11111111-1111-1111-1111-111111111102', 'Professor & Head', 'Ph.D. in VLSI Systems (Stanford)', 'Embedded IoT & Neural Hardware', 'TC-104');

-- 4. Insert Courses
INSERT INTO courses (id, department_id, code, title, degree_level, duration_years, total_semesters) VALUES
  ('44444444-4444-4444-4444-444444444401', '11111111-1111-1111-1111-111111111101', 'BTECH-CS', 'B.Tech in Computer Science & Artificial Intelligence', 'Undergraduate', 4, 8),
  ('44444444-4444-4444-4444-444444444402', '11111111-1111-1111-1111-111111111102', 'BTECH-EC', 'B.Tech in Electronics & Robotic Systems', 'Undergraduate', 4, 8);

-- 5. Insert Students Table Entries
INSERT INTO students (id, profile_id, student_id, department_id, course_id, academic_year, current_semester, section, cgpa) VALUES
  ('55555555-5555-5555-5555-555555555501', '22222222-2222-2222-2222-222222222204', 'SU-2024-CS-042', '11111111-1111-1111-1111-111111111101', '44444444-4444-4444-4444-444444444401', 3, 5, 'A', 3.84),
  ('55555555-5555-5555-5555-555555555502', '22222222-2222-2222-2222-222222222205', 'SU-2024-CS-043', '11111111-1111-1111-1111-111111111101', '44444444-4444-4444-4444-444444444401', 3, 5, 'A', 3.92),
  ('55555555-5555-5555-5555-555555555503', '22222222-2222-2222-2222-222222222206', 'SU-2024-EC-015', '11111111-1111-1111-1111-111111111102', '44444444-4444-4444-4444-444444444402', 2, 3, 'B', 3.45);

-- 6. Insert Subjects
INSERT INTO subjects (id, course_id, code, name, credits, semester, faculty_id, description) VALUES
  ('66666666-6666-6666-6666-666666666601', '44444444-4444-4444-4444-444444444401', 'CS501', 'Deep Learning & Neural Architectures', 4, 5, '33333333-3333-3333-3333-333333333301', 'Foundations of CNNs, Transformers, optimization techniques, and generative models.'),
  ('66666666-6666-6666-6666-666666666602', '44444444-4444-4444-4444-444444444401', 'CS502', 'Distributed Cloud Systems', 4, 5, '33333333-3333-3333-3333-333333333301', 'Microservices architecture, consensus algorithms (Raft/Paxos), and cloud native scaling.'),
  ('66666666-6666-6666-6666-666666666603', '44444444-4444-4444-4444-444444444401', 'CS503', 'Advanced Database Engineering', 3, 5, '33333333-3333-3333-3333-333333333301', 'Query planning, indexing, transaction isolation levels, and vector databases.'),
  ('66666666-6666-6666-6666-666666666604', '44444444-4444-4444-4444-444444444401', 'CS504', 'Cyber Security & Cryptography', 3, 5, '33333333-3333-3333-3333-333333333301', 'Public-key cryptography, zero-knowledge proofs, and web exploitation defense.');

-- 7. Insert Attendance Records (Marcus Chen)
INSERT INTO attendance (student_id, subject_id, faculty_id, date, status, time_slot, remarks) VALUES
  ('55555555-5555-5555-5555-555555555501', '66666666-6666-6666-6666-666666666601', '33333333-3333-3333-3333-333333333301', CURRENT_DATE - INTERVAL '1 day', 'PRESENT', '09:00 - 10:30 AM', 'Active participation in attention mechanisms'),
  ('55555555-5555-5555-5555-555555555501', '66666666-6666-6666-6666-666666666602', '33333333-3333-3333-3333-333333333301', CURRENT_DATE - INTERVAL '1 day', 'PRESENT', '11:00 - 12:30 PM', 'Lab session on Kubernetes deployment'),
  ('55555555-5555-5555-5555-555555555501', '66666666-6666-6666-6666-666666666603', '33333333-3333-3333-3333-333333333301', CURRENT_DATE - INTERVAL '2 days', 'PRESENT', '02:00 - 03:30 PM', 'SQL query optimization session'),
  ('55555555-5555-5555-5555-555555555501', '66666666-6666-6666-6666-666666666604', '33333333-3333-3333-3333-333333333301', CURRENT_DATE - INTERVAL '3 days', 'ABSENT', '10:00 - 11:30 AM', 'Medical leave - submitted slip');

-- 8. Insert Marks
INSERT INTO marks (student_id, subject_id, assessment_type, max_marks, marks_obtained, remarks) VALUES
  ('55555555-5555-5555-5555-555555555501', '66666666-6666-6666-6666-666666666601', 'Mid-Term Exam', 50, 48.5, 'Excellent mathematical formulation of backprop'),
  ('55555555-5555-5555-5555-555555555501', '66666666-6666-6666-6666-666666666602', 'Continuous Assessment 1', 25, 24.0, 'Flawless microservice containerization'),
  ('55555555-5555-5555-5555-555555555501', '66666666-6666-6666-6666-666666666603', 'Lab Assessment', 30, 29.0, 'Efficient B-Tree indexing benchmarks'),
  ('55555555-5555-5555-5555-555555555501', '66666666-6666-6666-6666-666666666604', 'Quiz 1', 20, 19.5, 'Strong conceptual grasp of RSA & Elliptic curves');

-- 9. Insert Timetables
INSERT INTO timetables (course_id, semester, section, subject_id, faculty_id, day_of_week, start_time, end_time, room_number) VALUES
  ('44444444-4444-4444-4444-444444444401', 5, 'A', '66666666-6666-6666-6666-666666666601', '33333333-3333-3333-3333-333333333301', 'Monday', '09:00:00', '10:30:00', 'Room 301 - Smart Lab'),
  ('44444444-4444-4444-4444-444444444401', 5, 'A', '66666666-6666-6666-6666-666666666602', '33333333-3333-3333-3333-333333333301', 'Monday', '11:00:00', '12:30:00', 'Room 404 - Cloud Cluster Lab'),
  ('44444444-4444-4444-4444-444444444401', 5, 'A', '66666666-6666-6666-6666-666666666603', '33333333-3333-3333-3333-333333333301', 'Tuesday', '09:00:00', '10:30:00', 'Room 205 - DB Engineering Room'),
  ('44444444-4444-4444-4444-444444444401', 5, 'A', '66666666-6666-6666-6666-666666666604', '33333333-3333-3333-3333-333333333301', 'Wednesday', '14:00:00', '15:30:00', 'Auditorium Alpha');

-- 10. Insert Assignments
INSERT INTO assignments (id, subject_id, faculty_id, title, description, due_date, total_points) VALUES
  ('77777777-7777-7777-7777-777777777701', '66666666-6666-6666-6666-666666666601', '33333333-3333-3333-3333-333333333301', 'Transformer Architecture from Scratch', 'Implement multi-head self-attention, positional encoding, and evaluate on text classification.', NOW() + INTERVAL '4 days', 100),
  ('77777777-7777-7777-7777-777777777702', '66666666-6666-6666-6666-666666666602', '33333333-3333-3333-3333-333333333301', 'Raft Consensus Protocol Implementation', 'Design leader election and log replication nodes with simulated network partitions.', NOW() + INTERVAL '7 days', 100);

-- 11. Insert Examinations
INSERT INTO examinations (course_id, subject_id, title, exam_type, exam_date, start_time, end_time, room_number, instructions) VALUES
  ('44444444-4444-4444-4444-444444444401', '66666666-6666-6666-6666-666666666601', 'Deep Learning Final Examination', 'End Semester Examination', CURRENT_DATE + INTERVAL '14 days', '09:30:00', '12:30:00', 'Exam Hall B', 'Digital ID card mandatory. Non-programmable calculators permitted.'),
  ('44444444-4444-4444-4444-444444444401', '66666666-6666-6666-6666-666666666602', 'Distributed Cloud Systems Lab Practical', 'Practical Exam', CURRENT_DATE + INTERVAL '18 days', '14:00:00', '17:00:00', 'Lab Cluster 4', 'Live terminal coding and architectural defense.');

-- 12. Insert Library Books
INSERT INTO books (isbn, title, author, category, total_copies, available_copies, shelf_location) VALUES
  ('978-0134685991', 'Effective Java (3rd Edition)', 'Joshua Bloch', 'Computer Science', 10, 8, 'Shelf CS-04'),
  ('978-0262035613', 'Deep Learning', 'Ian Goodfellow, Yoshua Bengio, Aaron Courville', 'Artificial Intelligence', 8, 4, 'Shelf AI-01'),
  ('978-1491950357', 'Designing Data-Intensive Applications', 'Martin Kleppmann', 'Systems Engineering', 12, 5, 'Shelf SYS-09'),
  ('978-0131103627', 'The C Programming Language', 'Brian W. Kernighan, Dennis M. Ritchie', 'Computer Science', 15, 12, 'Shelf CS-01'),
  ('978-0321573513', 'Algorithms (4th Edition)', 'Robert Sedgewick, Kevin Wayne', 'Algorithms', 10, 7, 'Shelf ALG-03');

-- 13. Insert Fee Records (Simulated)
INSERT INTO fee_records (student_id, academic_year, semester, fee_type, amount, paid_amount, balance_amount, due_date, status, payment_method, transaction_reference) VALUES
  ('55555555-5555-5555-5555-555555555501', 3, 5, 'Semester Tuition Fee', 3500.00, 3500.00, 0.00, CURRENT_DATE - INTERVAL '30 days', 'PAID', 'Net Banking (Simulation)', 'SIM-TXN-984321'),
  ('55555555-5555-5555-5555-555555555501', 3, 5, 'Laboratory & Technology Access Fee', 750.00, 750.00, 0.00, CURRENT_DATE - INTERVAL '30 days', 'PAID', 'Credit Card (Simulation)', 'SIM-TXN-984322'),
  ('55555555-5555-5555-5555-555555555501', 3, 5, 'Semester Examination & Library Dues', 250.00, 0.00, 250.00, CURRENT_DATE + INTERVAL '20 days', 'PENDING', NULL, NULL);

-- 14. Insert Announcements
INSERT INTO announcements (author_id, title, content, target_role, category, is_pinned) VALUES
  ('22222222-2222-2222-2222-222222222201', 'Smart Campus AI Portal 2.0 Live Announcement', 'Welcome to the Smart University Digital Transformation Platform! Access your automated attendance, examination hall tickets, AI tutor, and digital transcripts right from your dashboard.', 'ALL', 'ACADEMIC', true),
  ('22222222-2222-2222-2222-222222222201', 'Annual University Innovation & Hackathon 2026', 'Registrations are now open for the 48-Hour Global AI Innovation Challenge. Grand prize pool of $25,000 with incubation support.', 'STUDENT', 'EVENT', false),
  ('22222222-2222-2222-2222-222222222202', 'Mid-Semester Examination Schedule Published', 'The official examination timetable for 5th semester Computer Science & Engineering is uploaded. Check the Examination section for hall allocations.', 'STUDENT', 'EXAM', true);

-- 15. Insert Grievances
INSERT INTO grievances (id, student_id, category, subject, description, priority, status) VALUES
  ('88888888-8888-8888-8888-888888888801', '55555555-5555-5555-5555-555555555501', 'FACILITIES', 'Wi-Fi Latency in Computer Lab 3', 'The gigabit connection in Computer Lab 3 experiences intermittent dropped packets during deep learning model weight downloads.', 'MEDIUM', 'IN_PROGRESS'),
  ('88888888-8888-8888-8888-888888888802', '55555555-5555-5555-5555-555555555501', 'ACADEMIC', 'Request for Elective Course Credit Transfer', 'Submitted application for MOOC cloud specialization credits transfer towards open elective semester 5.', 'LOW', 'RESOLVED');

-- 16. Insert Grievance Responses
INSERT INTO grievance_responses (grievance_id, responder_id, response_text) VALUES
  ('88888888-8888-8888-8888-888888888801', '22222222-2222-2222-2222-222222222201', 'Campus Network Operations is upgrading the access point firmware and rebalancing load across switches this evening.'),
  ('88888888-8888-8888-8888-888888888802', '22222222-2222-2222-2222-222222222201', 'Credits verified by Academic Dean Committee and successfully transferred to your transcript.');

-- 17. Insert Notifications
INSERT INTO notifications (profile_id, title, message, type) VALUES
  ('22222222-2222-2222-2222-222222222204', 'Assignment Released', 'Prof. Alexander Wright posted "Transformer Architecture from Scratch" due in 4 days.', 'ASSIGNMENT'),
  ('22222222-2222-2222-2222-222222222204', 'Attendance Threshold Alert: Excellent', 'Your overall attendance is 94.2%. You are well above the university mandatory 75% requirement.', 'ATTENDANCE'),
  ('22222222-2222-2222-2222-222222222204', 'Upcoming Fee Due Date', 'Semester Exam Fee ($250.00) is scheduled for clearance within 20 days.', 'FEE');
