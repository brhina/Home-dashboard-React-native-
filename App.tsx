/**
 * Main App Component
 * Handles authentication flow and navigation
 */

import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, useColorScheme, View, ActivityIndicator, StyleSheet, InteractionManager } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  LoginScreen,
  DashboardScreen,
  BankingScreen,
  IdeasScreen,
  AddScreen,
  LinksScreen,
  NetworkScreen,
} from './src/screens';
import { AuthProvider, useAuth } from './src/contexts/AuthContext';
import type { RootStackParamList } from './src/types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Navigation component - shows Login or Dashboard based on auth state
 */
function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigationRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Skip navigation during initial loading
    if (isLoading || !isNavigationReady) {
      return;
    }

    // Wait for all interactions to complete before navigating
    const task = InteractionManager.runAfterInteractions(() => {
      if (navigationRef.current?.isReady()) {
        const currentRoute = navigationRef.current.getCurrentRoute();
        const targetRoute = isAuthenticated ? 'Dashboard' : 'Login';
        
        // Navigate if we're not already on the target route
        if (currentRoute?.name !== targetRoute) {
          try {
            navigationRef.current.reset({
              index: 0,
              routes: [{ name: targetRoute }],
            });
          } catch (error) {
            console.error('Navigation error:', error);
          }
        }
      }
    });

    // Cleanup function to cancel the task if component unmounts
    return () => {
      task.cancel();
    };
  }, [isAuthenticated, isLoading, isNavigationReady]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFB300" />
      </View>
    );
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => setIsNavigationReady(true)}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        initialRouteName={isAuthenticated ? 'Dashboard' : 'Login'}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Banking"
          component={BankingScreen}
        />
        <Stack.Screen
          name="Ideas"
          component={IdeasScreen}
        />
        <Stack.Screen
          name="Add"
          component={AddScreen}
        />
        <Stack.Screen
          name="Links"
          component={LinksScreen}
        />
        <Stack.Screen
          name="Network"
          component={NetworkScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * Root App component with all providers
 */
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default App;
