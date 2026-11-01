import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  STUDENT: {
    id: 'user-stu-1',
    email: 'student@smartuni.edu',
    fullName: 'Marcus Chen',
    role: 'STUDENT',
    studentId: 'SU-2024-CS-042',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=256',
    department: 'Computer Science & Engineering',
    departmentId: 'dept-1',
    course: 'B.Tech Computer Science & AI',
    year: 3,
    semester: 5,
    section: 'A',
    cgpa: 3.84,
    attendanceRate: 94.2,
    pendingFees: 250,
    totalCredits: 96,
    phone: '+1 (555) 234-8901',
    address: 'Pioneer Hall, Room 314, Smart University Campus',
    status: 'ACTIVE'
  },
  FACULTY: {
    id: 'user-fac-1',
    email: 'faculty@smartuni.edu',
    fullName: 'Prof. Alexander Wright',
    role: 'FACULTY',
    employeeId: 'FAC-CS-101',
    title: 'Associate Professor & AI Lab Director',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    phone: '+1 (555) 014-9820',
    department: 'Computer Science & Engineering',
    departmentId: 'dept-1',
    specialization: 'Deep Learning & Distributed Systems',
  },
  ADMINISTRATOR: {
    id: 'user-admin-1',
    email: 'admin@smartuni.edu',
    fullName: 'Dr. Sarah Jenkins',
    role: 'ADMINISTRATOR',
    title: 'University Registrar & Academic Admin',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    phone: '+1 (555) 019-2831',
    department: 'Central Administration',
  }
};

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  quickLogin: (role: UserRole) => void;
  register: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('smart_uni_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    // Default to student Marcus Chen for seamless first exploration
    return DEMO_USERS.STUDENT;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('smart_uni_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smart_uni_user');
    }
  }, [user]);

  const login = async (email: string, _password?: string): Promise<boolean> => {
    const cleanEmail = email.toLowerCase().trim();
    if (cleanEmail.includes('admin')) {
      setUser(DEMO_USERS.ADMINISTRATOR);
      return true;
    } else if (cleanEmail.includes('faculty') || cleanEmail.includes('prof') || cleanEmail.includes('wright')) {
      setUser(DEMO_USERS.FACULTY);
      return true;
    } else {
      setUser(DEMO_USERS.STUDENT);
      return true;
    }
  };

  const quickLogin = (selectedRole: UserRole) => {
    setUser(DEMO_USERS[selectedRole]);
  };

  const register = async (profileData: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (profileData.role === 'ADMINISTRATOR') {
      return { success: false, error: 'Administrator accounts cannot be created via public registration.' };
    }

    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      email: profileData.email || 'new.user@smartuni.edu',
      fullName: profileData.fullName || 'Student User',
      role: profileData.role || 'STUDENT',
      department: profileData.department || 'Computer Science & Engineering',
      studentId: profileData.role === 'STUDENT' ? `SU-2024-NEW-${Math.floor(100 + Math.random() * 900)}` : undefined,
      employeeId: profileData.role === 'FACULTY' ? `FAC-NEW-${Math.floor(100 + Math.random() * 900)}` : undefined,
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=256',
      year: 1,
      semester: 1,
      cgpa: 3.50,
      attendanceRate: 90.0,
      pendingFees: 3500,
      status: 'ACTIVE'
    };

    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        login,
        quickLogin,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
