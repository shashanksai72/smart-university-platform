import React, { useState } from 'react';
import { Users, UserPlus, Search, Filter, CheckCircle2, XCircle, Edit3, Trash2, Phone, Mail, Award, BookOpen, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { StudentItem } from '../../types';

export const AdminStudents: React.FC = () => {
  const { students, addStudent, updateStudent, toggleStudentStatus, departments } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<StudentItem | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [course, setCourse] = useState('B.Tech Computer Science & AI');
  const [year, setYear] = useState(1);
  const [semester, setSemester] = useState(1);
  const [section, setSection] = useState('A');
  const [phone, setPhone] = useState('');
  const [cgpa, setCgpa] = useState(3.60);
  const [feedback, setFeedback] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setEmail('');
    setStudentId('');
    setDepartment('Computer Science & Engineering');
    setCourse('B.Tech Computer Science & AI');
    setYear(1);
    setSemester(1);
    setSection('A');
    setPhone('');
    setCgpa(3.60);
    setEditingStudent(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    const autoId = `SU-2026-${Math.floor(100 + Math.random() * 900)}`;
    setStudentId(autoId);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (student: StudentItem) => {
    setEditingStudent(student);
    setName(student.name);
    setEmail(student.email);
    setStudentId(student.studentId);
    setDepartment(student.department);
    setCourse(student.course);
    setYear(student.year);
    setSemester(student.semester);
    setSection(student.section);
    setPhone(student.phone || '');
    setCgpa(student.cgpa);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        name,
        email,
        studentId,
        department,
        course,
        year: Number(year),
        semester: Number(semester),
        section,
        phone,
        cgpa: Number(cgpa),
      });
      setFeedback(`Student account for ${name} updated successfully!`);
    } else {
      addStudent({
        name,
        email,
        studentId: studentId || `SU-2026-${Math.floor(100 + Math.random() * 900)}`,
        department,
        course,
        year: Number(year),
        semester: Number(semester),
        section,
        phone,
        cgpa: Number(cgpa),
        attendanceRate: 92.5,
        pendingFees: 250,
      });
      setFeedback(`New student ${name} (${studentId}) enrolled successfully!`);
    }

    setShowAddModal(false);
    resetForm();
    setTimeout(() => setFeedback(null), 3500);
  };

  const filtered = students.filter(s => {
    const matchesDept = selectedDeptFilter === 'ALL' || s.department === selectedDeptFilter;
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>Registrar Student Roster Management</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Manage Student Accounts</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Add new student enrolments, update academic profiles, and manage enrollment status.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2 self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Student</span>
          </button>
        </div>

        {feedback && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Search & Department Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name, roll no, or email..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            value={selectedDeptFilter}
            onChange={e => setSelectedDeptFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ALL">All Departments ({students.length})</option>
            {departments.map(d => (
              <option key={d.id} value={d.name}>
                {d.code} - {d.name}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
          Showing {filtered.length} of {students.length} Students
        </span>
      </div>

      {/* Students Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Student Details</th>
                <th className="py-3 px-4">Student ID</th>
                <th className="py-3 px-4">Program & Sem</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 dark:text-white text-xs">{s.name}</p>
                    <p className="text-[11px] text-slate-400">{s.email}</p>
                    {s.phone && <p className="text-[10px] text-slate-400 font-mono">{s.phone}</p>}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">{s.studentId}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{s.course}</p>
                    <p className="text-[11px] text-slate-400">
                      {s.department} • Year {s.year}, Sem {s.semester} ({s.section})
                    </p>
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">{s.cgpa.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-700 dark:text-slate-300">
                    <span className={s.attendanceRate < 75 ? 'text-rose-600' : 'text-emerald-600'}>
                      {s.attendanceRate}%
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    {s.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ACTIVE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                        <XCircle className="w-3 h-3" />
                        <span>SUSPENDED</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(s)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        title="Edit Student Info"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleStudentStatus(s.id)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
                          s.status === 'ACTIVE'
                            ? 'border border-rose-200 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                            : 'border border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                        }`}
                      >
                        {s.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-xl w-full p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setShowAddModal(false);
                resetForm();
              }}
              className="absolute top-5 right-5 p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {editingStudent ? 'Edit Student Profile' : 'Enroll New Student'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {editingStudent
                ? `Updating institutional record for ${editingStudent.studentId}`
                : 'Create and provision new institutional student record'}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Lin"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    University Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. maya.lin@smartuni.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Student Roll Number (ID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SU-2026-CS-049"
                    value={studentId}
                    onChange={e => setStudentId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-mono font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 012-3456"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Academic Department *
                  </label>
                  <select
                    value={department}
                    onChange={e => {
                      setDepartment(e.target.value);
                      if (e.target.value.includes('Computer')) setCourse('B.Tech Computer Science & AI');
                      else if (e.target.value.includes('Electronics')) setCourse('B.Tech Electronics & Robotics');
                      else if (e.target.value.includes('Mechanical')) setCourse('B.Tech Mechanical & Autonomous Systems');
                      else setCourse('BBA in Business Analytics');
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Computer Science & Engineering">Computer Science & Engineering (CSE)</option>
                    <option value="Electronics & Communication">Electronics & Communication (ECE)</option>
                    <option value="Mechanical & Aerospace Engineering">Mechanical & Aerospace (MECH)</option>
                    <option value="School of Business & Data Analytics">Business & Data Analytics (MGMT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Enrolled Degree Program *
                  </label>
                  <input
                    type="text"
                    required
                    value={course}
                    onChange={e => setCourse(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Year</label>
                  <select
                    value={year}
                    onChange={e => setYear(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value={1}>Year 1</option>
                    <option value={2}>Year 2</option>
                    <option value={3}>Year 3</option>
                    <option value={4}>Year 4</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Semester</label>
                  <select
                    value={semester}
                    onChange={e => setSemester(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s}>
                        Sem {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Section</label>
                  <select
                    value={section}
                    onChange={e => setSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="A">Sec A</option>
                    <option value="B">Sec B</option>
                    <option value="C">Sec C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">Initial CGPA</label>
                  <input
                    type="number"
                    step="0.05"
                    min="0"
                    max="4.0"
                    value={cgpa}
                    onChange={e => setCgpa(parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/25"
                >
                  {editingStudent ? 'Save Changes' : 'Confirm Enrollment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
