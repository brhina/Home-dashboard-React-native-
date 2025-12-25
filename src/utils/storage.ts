
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from '../types/auth.types';

const STORAGE_KEYS = {
  USER: '@myapp:user',
  TOKEN: '@myapp:token',
} as const;

export const storageUtils = {
  /**
   * Save user data to storage
   */
  saveUser: async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to storage:', error);
      throw error;
    }
  },

  /**
   * Get user data from storage
   */
  getUser: async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user from storage:', error);
      return null;
    }
  },

  /**
   * Remove user data from storage
   */
  removeUser: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error removing user from storage:', error);
      throw error;
    }
  },

  /**
   * Save auth token to storage
   */
  saveToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    } catch (error) {
      console.error('Error saving token to storage:', error);
      throw error;
    }
  },

  /**
   * Get auth token from storage
   */
  getToken: async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error getting token from storage:', error);
      return null;
    }
  },

  /**
   * Remove auth token from storage
   */
  removeToken: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Error removing token from storage:', error);
      throw error;
    }
  },

  /**
   * Clear all storage
   */
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.TOKEN]);
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};

