import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutsScreen from './WorkoutsScreen';  // The screen with the workout plans
import WorkoutDetailScreen from './WorkoutDetailScreen';  // The detailed screen for unlocked workouts

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Workouts"
          component={WorkoutsScreen}
        />
        <Stack.Screen
          name="WorkoutDetail"
          component={WorkoutDetailScreen}
          options={{ title: 'Workout Details' }}  // Customize header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
