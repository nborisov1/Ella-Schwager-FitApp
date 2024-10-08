import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddTrainingSessionScreen from './AddTrainingSessionScreen';
import AddExerciseScreen from './AddExerciseScreen';  // Import the screen
import ExerciseVideoScreen from '../components/ExerciseVideoScreen/ExerciseVideoScreen'
const Stack = createStackNavigator();
const AddTrainingSessionStack = ({userData}) => {
    console.log('userData ',userData);
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="AddTrainingSession"
          children={() => <AddTrainingSessionScreen userData={userData} />}
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
          options={{
            headerShown: false,
            title: 'Exercises',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    );
  };
    
  export default AddTrainingSessionStack;