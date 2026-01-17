/**
 * Authentication Context
 * Manages authentication state and provides auth methods
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AuthContextType, AuthState, LoginCredentials, User } from '../types/auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = '@auth_user';

// Mock users for testing
const MOCK_USERS = [
  {
    id: '1',
    username: 'admin',
    password: 'brie1192',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
  },
  {
    id: '2',
    username: 'john',
    password: 'brie1192',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
  },
  {
    id: '3',
    username: 'Brie',
    password: 'brie1192',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
  },
  {
    id: '4',
    username: 'root',
    password: 'root123',
    name: 'Root User',
    email: 'root@example.com',
    role: 'user',
  },
];

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Check if user is already authenticated on mount
  // For this demo, we always clear auth state on app restart
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Clear AsyncStorage on app start to ensure user is logged out
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      // Always set user as logged out on app restart
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        try {
          // Validate credentials against mock users
          const mockUser = MOCK_USERS.find(
            (user) =>
              user.username.toLowerCase() === credentials.username.toLowerCase().trim() &&
              user.password === credentials.password
          );

          if (!mockUser) {
            reject(new Error('Invalid username or password'));
            return;
          }

          // Create user object from mock user
          const user: User = {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            role: mockUser.role,
          };

          // Store user in AsyncStorage
          AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
            .then(() => {
              setAuthState({
                user,
                isAuthenticated: true,
                isLoading: false,
              });
              resolve();
            })
            .catch((error) => {
              console.error('Error storing user:', error);
              reject(new Error('Failed to save authentication data'));
            });
        } catch (error) {
          reject(new Error('Login failed'));
        }
      }, 500); // Simulate network delay
    });
  };

  const logout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error logging out:', error);
      throw new Error('Logout failed');
    }
  };

  const register = async (
    credentials: LoginCredentials & { name: string }
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Simulate API call delay
      setTimeout(() => {
        try {
          // For demo purposes, create user directly
          // In a real app, this would call your registration API
          const user: User = {
            id: Date.now().toString(),
            email: credentials.username, // Store username as email for backward compatibility
            name: credentials.name,
          };

          // Store user in AsyncStorage
          AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
            .then(() => {
              setAuthState({
                user,
                isAuthenticated: true,
                isLoading: false,
              });
              resolve();
            })
            .catch((error) => {
              console.error('Error storing user:', error);
              reject(new Error('Failed to save registration data'));
            });
        } catch (error) {
          reject(new Error('Registration failed'));
        }
      }, 500); // Simulate network delay
    });
  };

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

