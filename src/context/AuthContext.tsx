import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  User,
  UserCredential
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

interface AdminUser {
  email: string;
  isAdmin: true;
}

interface AuthContextType {
  currentUser: (User | AdminUser) | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential | AdminUser>;
  signup: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<(User | AdminUser) | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = currentUser?.email === 'admin@gmail.com';

  async function login(email: string, password: string) {
    // Handle admin login separately
    if (email === 'admin@gmail.com') {
      if (password === '12345678') {
        const adminUser: AdminUser = {
          email: 'admin@gmail.com',
          isAdmin: true
        };
        setCurrentUser(adminUser);
        // Store admin session
        localStorage.setItem('authUser', JSON.stringify(adminUser));
        return adminUser;
      }
      throw new Error('Invalid admin credentials');
    }
    // Handle regular user login through Firebase
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Store user session
    localStorage.setItem('authUser', JSON.stringify({
      email: result.user.email,
      uid: result.user.uid
    }));
    return result;
  }

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async function logout() {
    localStorage.removeItem('authUser');
    setCurrentUser(null);
    await signOut(auth);
  }

  useEffect(() => {
    // Check for stored auth state
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.isAdmin) {
        setCurrentUser(user as AdminUser);
      }
    }

    // Listen for Firebase auth changes for non-admin users
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email !== 'admin@gmail.com') {
        setCurrentUser(user);
        // Only store user data if user exists
        if (user.email && user.uid) {
          localStorage.setItem('authUser', JSON.stringify({
            email: user.email,
            uid: user.uid
          }));
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    isAdmin,
    loading,
    login,
    signup,
    loginWithGoogle,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
