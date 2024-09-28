import { View, Text } from 'react-native'
import React from 'react'
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
  const { user } = useAuth();
  return <HomeScreen isSuperUser={false}/>;

  if (user) {
    return <HomeScreen isSuperUser={false}/>;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          {/* Welcome Screen */}
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }} 
          />
          
          {/* Login Screen */}
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false ,
                       gestureEnabled: true,}} 
          />

          {/* Sign-Up Flow Screens (with gesture back enabled) */}
          <Stack.Screen 
            name="Gender" 
            component={GenderScreen} 
            options={{ headerShown: false ,
              gestureEnabled: true,}} 
 />
           <Stack.Screen 
            name="Age" 
            component={AgeScreen} 
            options={{ headerShown: false ,
                       gestureEnabled: true,}} 
 />
          <Stack.Screen 
            name="Weight" 
            component={WeightScreen} 
            options={{ headerShown: false ,
              gestureEnabled: true,}} 
 />
          <Stack.Screen 
            name="Height" 
            component={HeightScreen} 
            options={{ headerShown: false ,
              gestureEnabled: true,}} 
 />
          <Stack.Screen 
            name="Goals" 
            component={GoalsScreen} 
            options={{ headerShown: false ,
              gestureEnabled: true,}} 
 />
          <Stack.Screen 
            name="PhysicalActivity" 
            component={PhysicalActivityScreen} 
            options={{ headerShown: false ,
              gestureEnabled: true,}} 
 />
          <Stack.Screen 
            name="Account" 
            component={AccountScreen} 
            options={{ headerShown: false ,
              gestureEnabled: true,}} 
 />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}