
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import type {
  AuthContextType,
  AuthState,
  LoginCredentials,
  User,
} from '../types/auth.types';
import { storageUtils } from '../utils/storage';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  /**
   * Initialize auth state from storage on mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await storageUtils.getUser();
        const token = await storageUtils.getToken();

        if (user && token) {
          setAuthState({
            user,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user with credentials
   * In a real app, this would call an API endpoint
   */
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Simulate API call
      await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));

      // Mock user data - replace with actual API call
      const mockUser: User = {
        id: '1',
        email: credentials.email,
        name: credentials.email.split('@')[0],
        role: 'user',
      };

      const mockToken = 'mock-jwt-token-' + Date.now();

      // Save to storage
      await storageUtils.saveUser(mockUser);
      await storageUtils.saveToken(mockToken);

      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw error;
    }
  }, []);

  /**
   * Logout user and clear storage
   */
  const logout = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Clear storage
      await storageUtils.clearAll();

      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  }, []);

  /**
   * Register new user
   * In a real app, this would call an API endpoint
   */
  const register = useCallback(
    async (credentials: LoginCredentials & { name: string }) => {
      try {
        setAuthState(prev => ({ ...prev, isLoading: true }));

        // Simulate API call
        await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));

        // Mock user data - replace with actual API call
        const mockUser: User = {
          id: Date.now().toString(),
          email: credentials.email,
          name: credentials.name,
          role: 'user',
        };

        const mockToken = 'mock-jwt-token-' + Date.now();

        // Save to storage
        await storageUtils.saveUser(mockUser);
        await storageUtils.saveToken(mockToken);

        setAuthState({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
        throw error;
      }
    },
    []
  );

  const value: AuthContextType = {
    ...authState,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

