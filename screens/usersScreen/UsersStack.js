import { createStackNavigator } from '@react-navigation/stack';
import UsersScreen from './UsersScreen';
import UserDetailScreen from './UserDetailScreen/userDetailScreen';
import ExerciseListScreen from '../ExerciseListScreen/ExerciseListScreen';
import ExerciseVideoScreen from '../../components/ExerciseVideoScreen/ExerciseVideoScreen';
const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Users"
        component={UsersScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserDetail"
        component={UserDetailScreen}
        options={{ title: 'User Details' }}  // Customize the header title
      />
      <Stack.Screen
        name="ExerciseList"
        component={ExerciseListScreen}
        options={{ title: 'Exercises' }}
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

export default UserStack;
