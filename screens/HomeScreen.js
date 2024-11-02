import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import WorkoutsScreen from './WorkoutsScreen/workoutsScreen';
import WorkoutDetailScreen from './WorkoutsScreen/WorkoutDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from './PaymentScreen/PaymentScreen';
import MyPlanStack from './PersonalCoachScreen/MyPlanStack';
import ProfileScreenStack from './ProfileScreen/ProfileStack';
import SettingsScreen from './SettingsScreen/SettingsScreen';

const Stack = createStackNavigator();

const DietScreen = () => (
  <View style={styles.screen}>
    <Text>Diet Screen</Text>
  </View>
);

const StoreScreen = () => (
  <View style={styles.screen}>
    <Text>Store Screen</Text>
  </View>
);

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// The Workout Stack
const WorkoutStack = ({ user }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workouts Plans"
        children={() => <WorkoutsScreen user={user} />}
        options={{ headerShown: false }}  // Customize header
      />
      <Stack.Screen
        name="WorkoutDetail"
        component={WorkoutDetailScreen}
        options={{ headerShown: false }}  // Customize header
      />
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Main Home Screen with bottom tabs
const HomeScreen = ({ userData }) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let iconName;
            let iconColor = focused ? '#C73D8C' : '#000';  // Black for inactive, purple for active
            let iconSize = focused ? 30 : 24;  // Make the active icon larger

            // Choose the outline icon based on the route name
            switch (route.name) {
              case 'אימונים':
                iconName = 'barbell-outline';
                break;
              case 'התוכנית שלי':
                iconName = 'clipboard-outline';
                break;
              case 'הגדרות':
                iconName = 'settings-outline';
                break;
              case 'חנות':
                iconName = 'cart-outline';
                break;
              case 'פרופיל':
                iconName = 'people-outline';
                break;
            }

            return (
              <View style={{ alignItems: 'center' }}>
                {/* Move the icon up for the focused tab */}
                <Icon name={iconName} size={iconSize} color={iconColor} style={{ marginTop: focused ? -6 : 0 }} />
              </View>
            );
          },
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarStyle: styles.tabBarStyle,
          tabBarActiveTintColor: styles.tabBarActiveTintColor.color,  
          tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,  
        })}>
          <Tab.Screen
          name="פרופיל"
          children={() => <ProfileScreenStack user={userData} />}
          options={
            {headerShown: false}
          }
        />
        <Tab.Screen
          name="אימונים"
          children={() => <WorkoutStack user={userData}/>}
          options={{ headerShown: false }}
        />
        <Tab.Screen
            name="התוכנית שלי"
            children={() => <MyPlanStack userData={userData} />}
            options={{ headerShown: false }}
          />
                  <Tab.Screen name="הגדרות" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    height: 85,  
    paddingVertical: 5,  
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20,  
    backgroundColor: '#FFFFFF',  
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarLabelStyle: {
    fontSize: 12,  
    fontWeight: 'bold',  
  },
  tabBarActiveTintColor: {
    color: '#C73D8C',
  },
  tabBarInactiveTintColor: {
    color: '#000',
  },
});

export default HomeScreen;
