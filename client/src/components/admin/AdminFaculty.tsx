import React, { useState } from 'react';
import { GraduationCap, UserPlus, Search, Filter, CheckCircle2, XCircle, Edit3, Mail, Phone, Building2, BookOpen, X, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { FacultyItem } from '../../types';

export const AdminFaculty: React.FC = () => {
  const { facultyList, addFaculty, updateFaculty, toggleFacultyStatus, departments } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<FacultyItem | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [designation, setDesignation] = useState('Associate Professor');
  const [qualification, setQualification] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [officeRoom, setOfficeRoom] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setEmail('');
    setEmployeeId('');
    setDepartment('Computer Science & Engineering');
    setDesignation('Associate Professor');
    setQualification('');
    setSpecialization('');
    setOfficeRoom('');
    setPhone('');
    setEditingFaculty(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    const autoId = `FAC-${Math.floor(100 + Math.random() * 900)}`;
    setEmployeeId(autoId);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (fac: FacultyItem) => {
    setEditingFaculty(fac);
    setName(fac.name);
    setEmail(fac.email);
    setEmployeeId(fac.employeeId);
    setDepartment(fac.department);
    setDesignation(fac.designation);
    setQualification(fac.qualification);
    setSpecialization(fac.specialization);
    setOfficeRoom(fac.officeRoom);
    setPhone(fac.phone || '');
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    if (editingFaculty) {
      updateFaculty(editingFaculty.id, {
        name,
        email,
        employeeId,
        department,
        designation,
        qualification,
        specialization,
        officeRoom,
        phone,
      });
      setFeedback(`Faculty record for ${name} updated successfully!`);
    } else {
      addFaculty({
        name,
        email,
        employeeId: employeeId || `FAC-${Math.floor(100 + Math.random() * 900)}`,
        department,
        designation,
        qualification: qualification || 'Ph.D. in Engineering',
        specialization: specialization || 'Advanced Research',
        officeRoom: officeRoom || 'Faculty Quad 201',
        phone,
        assignedSubjectsCount: 2,
        totalStudentsAssigned: 75,
      });
      setFeedback(`New faculty member ${name} (${employeeId}) appointed successfully!`);
    }

    setShowAddModal(false);
    resetForm();
    setTimeout(() => setFeedback(null), 3500);
  };

  const filtered = facultyList.filter(f => {
    const matchesDept = selectedDeptFilter === 'ALL' || f.department === selectedDeptFilter;
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.designation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDept && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Office of Academic Dean & Faculty Affairs</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Manage Faculty Appointments</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Appoint new professors, manage department allocations, and update faculty credentials.
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/25 transition-all flex items-center space-x-2 self-start sm:self-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add New Faculty</span>
          </button>
        </div>

        {feedback && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center space-x-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{feedback}</span>
          </div>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto flex-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search faculty by name, ID, or specialization..."
              className="w-full pl-10 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <select
            value={selectedDeptFilter}
            onChange={e => setSelectedDeptFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="ALL">All Departments ({facultyList.length})</option>
            {departments.map(d => (
              <option key={d.id} value={d.name}>
                {d.code} - {d.name}
              </option>
            ))}
          </select>
        </div>

        <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
          Showing {filtered.length} of {facultyList.length} Faculty Members
        </span>
      </div>

      {/* Faculty Directory Table */}
      <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/70 dark:bg-slate-900/60 text-slate-500 uppercase text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Faculty Member</th>
                <th className="py-3 px-4">Employee ID</th>
                <th className="py-3 px-4">Department & Designation</th>
                <th className="py-3 px-4">Specialization</th>
                <th className="py-3 px-4">Office Venue</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map(f => (
                <tr key={f.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 dark:text-white text-xs">{f.name}</p>
                    <p className="text-[11px] text-slate-400">{f.email}</p>
                    <p className="text-[10px] text-slate-400 italic">{f.qualification}</p>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{f.employeeId}</td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{f.designation}</p>
                    <p className="text-[11px] text-slate-400">{f.department}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {f.specialization}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-cyan-600 dark:text-cyan-400">
                    {f.officeRoom}
                  </td>
                  <td className="py-3.5 px-4">
                    {f.status === 'ACTIVE' ? (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>ACTIVE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 font-bold text-[10px]">
                        <XCircle className="w-3 h-3" />
                        <span>INACTIVE</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(f)}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                        title="Edit Faculty Record"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => toggleFacultyStatus(f.id)}
                        className={`px-2.5 py-1 rounded-xl text-[10px] font-bold transition-all ${
                          f.status === 'ACTIVE'
                            ? 'border border-rose-200 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                            : 'border border-emerald-200 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                        }`}
                      >
                        {f.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Faculty Modal */}
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
              {editingFaculty ? 'Edit Faculty Record' : 'Appoint New Faculty Member'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {editingFaculty
                ? `Updating appointment records for ${editingFaculty.employeeId}`
                : 'Provision faculty credentials and institutional office allocation'}
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Faculty Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jennifer Adams"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Institutional Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. j.adams@smartuni.edu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Faculty Employee ID *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FAC-CS-105"
                    value={employeeId}
                    onChange={e => setEmployeeId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-mono font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Academic Designation *
                  </label>
                  <select
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Professor & Head of Department">Professor & HOD</option>
                    <option value="Professor">Professor</option>
                    <option value="Associate Professor">Associate Professor</option>
                    <option value="Assistant Professor">Assistant Professor</option>
                    <option value="Senior Research Fellow">Senior Research Fellow</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Department *
                  </label>
                  <select
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
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
                    Highest Qualification
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Ph.D. in AI (Stanford)"
                    value={qualification}
                    onChange={e => setQualification(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Specialization & Research Field
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Machine Learning & Neural Networks"
                    value={specialization}
                    onChange={e => setSpecialization(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                    Office Room Venue
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Turing Hall 405"
                    value={officeRoom}
                    onChange={e => setOfficeRoom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. +1 (555) 019-4422"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900 text-xs focus:ring-2 focus:ring-blue-500 outline-none"
                />
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
                  {editingFaculty ? 'Save Changes' : 'Confirm Faculty Appointment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
