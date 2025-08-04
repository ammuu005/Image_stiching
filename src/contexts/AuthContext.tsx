import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  lastLogin: Date;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  users: User[];
  userActivities: UserActivity[];
}

interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  details: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);

  useEffect(() => {
    // Initialize with mock data
    const mockUsers: User[] = [
      {
        id: '1',
        email: 'admin@stitchsmart.com',
        name: 'Admin User',
        role: 'admin',
        lastLogin: new Date(),
        createdAt: new Date('2024-01-01')
      },
      {
        id: '2',
        email: 'user@example.com',
        name: 'John Doe',
        role: 'user',
        lastLogin: new Date(Date.now() - 86400000),
        createdAt: new Date('2024-01-15')
      },
      {
        id: '3',
        email: 'jane@example.com',
        name: 'Jane Smith',
        role: 'user',
        lastLogin: new Date(Date.now() - 172800000),
        createdAt: new Date('2024-02-01')
      }
    ];

    const mockActivities: UserActivity[] = [
      {
        id: '1',
        userId: '2',
        action: 'Image Upload',
        timestamp: new Date(Date.now() - 3600000),
        details: 'Uploaded 3 images for stitching'
      },
      {
        id: '2',
        userId: '3',
        action: 'Image Stitch',
        timestamp: new Date(Date.now() - 7200000),
        details: 'Successfully stitched panorama image'
      },
      {
        id: '3',
        userId: '2',
        action: 'Login',
        timestamp: new Date(Date.now() - 86400000),
        details: 'User logged in'
      }
    ];

    setUsers(mockUsers);
    setUserActivities(mockActivities);

    // Check for saved user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = users.find(u => u.email === email);
    if (foundUser && password === 'password') {
      const updatedUser = { ...foundUser, lastLogin: new Date() };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Add login activity
      const newActivity: UserActivity = {
        id: Date.now().toString(),
        userId: foundUser.id,
        action: 'Login',
        timestamp: new Date(),
        details: 'User logged in successfully'
      };
      setUserActivities(prev => [newActivity, ...prev]);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      login,
      logout,
      users,
      userActivities
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}