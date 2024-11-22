import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/SignUpFlow/WelcomeScreen/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import useAuth from '../hooks/useAuth';
import GenderScreen from '../screens/SignUpFlow/GenderScreen/GenderScreen';
import WeightScreen from '../screens/SignUpFlow/WeightScreen';
import HeightScreen from '../screens/SignUpFlow/HeightScreen/HeightScreen';
import GoalsScreen from '../screens/SignUpFlow/GoalsScreen/GoalsScreen';
import PhysicalActivityScreen from '../screens/SignUpFlow/PhysicalActivityScreen/PhysicalActivityScreen';
import AccountScreen from '../screens/SignUpFlow/AccountScreen/AccountScreen';
import AgeScreen from '../screens/SignUpFlow/AgeScreen/AgeScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { userData, loading } = useAuth(); // Get userData and loading state

  if (loading) {
    // Display loading indicator while fetching user data
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (userData) {
    // Once user data is fetched, pass the role to HomeScreen
    return <HomeScreen userData={userData} />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false, gestureEnabled: true }} 
          />
          <Stack.Screen 
            name="Gender" 
            component={GenderScreen} 
            options={{ headerShown: false, gestureEnabled: true }} 
          />
          <Stack.Screen 
            name="Age" 
            component={AgeScreen} 
            options={{ headerShown: false, gestureEnabled: true }} 
          />
          <Stack.Screen 
            name="Weight" 
            component={WeightScreen} 
            options={{ headerShown: false, gestureEnabled: true }} 
          />
          <Stack.Screen 
            name="Height" 
            component={HeightScreen} 
            options={{ headerShown: false, gestureEnabled: true }} 
          />
          <Stack.Screen 
            name="Goals" 
            component={GoalsScreen} 
            options={{ headerShown: false, gestureEnabled: true }} 
          />
          <Stack.Screen 
            name="PhysicalActivity" 
            component={PhysicalActivityScreen} 
            options={{ headerShown: false, gestureEnabled: true }} 
          />
          <Stack.Screen 
            name="Account" 
            component={AccountScreen} 
            options={{ headerShown: false, gestureEnabled: true }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
