/**
 * Navigation related type definitions
 */

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Dashboard: undefined;
  Banking: undefined;
  Ideas: undefined;
  Add: undefined;
  Links: undefined;
  Network: undefined;
};

export type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Dashboard'
>;

