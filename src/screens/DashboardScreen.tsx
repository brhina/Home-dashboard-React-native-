
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { DollarSign, Lightbulb, PlusCircle, Link, Wifi } from 'lucide-react-native';
import type { DashboardScreenProps } from '../types/navigation.types';

export const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const dashboardItems = [
    {
      id: '1',
      title: 'Banking',
      screen: 'Banking' as const,
      icon: DollarSign,
      description: 'Check your bank activities',
      color: '#7B68EE',
    },
    {
      id: '2',
      title: 'Ideas',
      screen: 'Ideas' as const,
      icon: Lightbulb,
      description: 'Capture your brilliant ideas',
      color: '#FF1493',
    },
    {
      id: '3',
      title: 'Add',
      screen: 'Add' as const,
      icon: PlusCircle,
      description: 'Add new items or content',
      color: '#20B2AA',
    },
    {
      id: '4',
      title: 'Links',
      screen: 'Links' as const,
      icon: Link,
      description: 'Manage your bookmarks',
      color: '#FFB400',
    },
  ];

  const handleItemPress = (screen: 'Banking' | 'Ideas' | 'Add' | 'Links' | 'Network') => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>HomeDashboard</Text>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Grid Container */}
        <View style={styles.gridContainer}>
          {/* First Row */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => handleItemPress(dashboardItems[0].screen)}
              activeOpacity={0.7}
            >
              <View style={styles.card}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: dashboardItems[0].color },
                  ]}
                >
                  {React.createElement(dashboardItems[0].icon, {
                    color: '#FFFFFF',
                    size: 36,
                  })}
                </View>
                <Text style={styles.cardTitle}>{dashboardItems[0].title}</Text>
                <Text style={styles.cardDescription}>
                  {dashboardItems[0].description}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => handleItemPress(dashboardItems[1].screen)}
              activeOpacity={0.7}
            >
              <View style={styles.card}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: dashboardItems[1].color },
                  ]}
                >
                  {React.createElement(dashboardItems[1].icon, {
                    color: '#FFFFFF',
                    size: 36,
                  })}
                </View>
                <Text style={styles.cardTitle}>{dashboardItems[1].title}</Text>
                <Text style={styles.cardDescription}>
                  {dashboardItems[1].description}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Second Row */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => handleItemPress(dashboardItems[2].screen)}
              activeOpacity={0.7}
            >
              <View style={styles.card}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: dashboardItems[2].color },
                  ]}
                >
                  {React.createElement(dashboardItems[2].icon, {
                    color: '#FFFFFF',
                    size: 36,
                  })}
                </View>
                <Text style={styles.cardTitle}>{dashboardItems[2].title}</Text>
                <Text style={styles.cardDescription}>
                  {dashboardItems[2].description}
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => handleItemPress(dashboardItems[3].screen)}
              activeOpacity={0.7}
            >
              <View style={styles.card}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: dashboardItems[3].color },
                  ]}
                >
                  {React.createElement(dashboardItems[3].icon, {
                    color: '#FFFFFF',
                    size: 36,
                  })}
                </View>
                <Text style={styles.cardTitle}>{dashboardItems[3].title}</Text>
                <Text style={styles.cardDescription}>
                  {dashboardItems[3].description}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Third Row - Single Centered Item */}
          <View style={styles.rowCentered}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => handleItemPress('Network')}
              activeOpacity={0.7}
            >
              <View style={styles.card}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: '#7B68EE' },
                  ]}
                >
                  <Wifi color="#FFFFFF" size={36} />
                </View>
                <Text style={styles.cardTitle}>Network</Text>
                <Text style={styles.cardDescription}>
                  Monitor network connections
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFB300',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 30,
  },
  gridContainer: {
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rowCentered: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardWrapper: {
    width: '48%',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 16,
  },
});
