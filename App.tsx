/**
 * Main App Component
 * Handles authentication flow and navigation
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  DashboardScreen,
  BankingScreen,
  IdeasScreen,
  AddScreen,
  LinksScreen,
  NetworkScreen,
} from './src/screens';
import type { RootStackParamList } from './src/types/navigation.types';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Navigation component
 */
function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
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
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
