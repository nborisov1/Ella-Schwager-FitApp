import { createStackNavigator } from '@react-navigation/stack';
import UsersScreen from './UsersScreen';
import UserDetailScreen from './UserDetailScreen/userDetailScreen';
import ExerciseListScreen from '../ExerciseListScreen/ExerciseListScreen';
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
    </Stack.Navigator>
  );
};

export default UserStack;
