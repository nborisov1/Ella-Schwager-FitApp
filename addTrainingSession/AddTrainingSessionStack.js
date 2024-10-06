import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddTrainingSessionScreen from './AddTrainingSessionScreen';
import AddExerciseScreen from './AddExerciseScreen';  // Import the screen
import ExerciseVideoScreen from '../addTrainingSession/ExerciseVideoScreen'
const Stack = createStackNavigator();
const AddTrainingSessionStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AddTrainingSession"
          component={AddTrainingSessionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
            name="AddExerciseScreen"  // Define the new route
            component={AddExerciseScreen}  // Point to the new component
            options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ExerciseVideoScreen"
          component={ExerciseVideoScreen}
          options={{ title: 'Exercise Videos' }}
        />
      </Stack.Navigator>
    );
  };
    
  export default AddTrainingSessionStack;