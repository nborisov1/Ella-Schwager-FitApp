import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './ProfileScreen';  // Your main screen
import ExerciseListScreen from '../ExerciseListScreen/ExerciseListScreen';  // New screen for exercise list

const Stack = createStackNavigator();
const ProfileScreenStack = ({user}) => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileScreen"
          children={() => <ProfileScreen user={user} />}
          options={{ headerShown: false }}  // No header for the main screen
        />
        <Stack.Screen
          name="ExerciseList"
          component={ExerciseListScreen}
          options={{
            headerShown: true,
            title: 'Exercises',
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
    );
  };
    
  export default ProfileScreenStack;