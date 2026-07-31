import React, { createContext, useContext, useState } from 'react';
import { useSiteData } from './SiteDataContext';
import { hashPassword } from '../utils/cryptoHelper';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (usernameInput: string, passwordInput: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data } = useSiteData();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('annenfeld_admin_auth') === 'true';
  });

  const login = async (usernameInput: string, passwordInput: string): Promise<boolean> => {
    const validUsername = data?.adminAuth?.username || 'admin';
    // Default SHA-256 hash of 'admin'
    const validPasswordHash =
      data?.adminAuth?.passwordHash || '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918';

    const inputHash = await hashPassword(passwordInput);

    if (usernameInput.trim() === validUsername && inputHash === validPasswordHash) {
      sessionStorage.setItem('annenfeld_admin_auth', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('annenfeld_admin_auth');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
