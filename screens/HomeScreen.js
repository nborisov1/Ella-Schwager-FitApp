import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './ProfileScreen/ProfileScreen'
import WorkoutsScreen from './WorkoutsScreen/workoutsScreen';
import WorkoutDetailScreen from './WorkoutsScreen/WorkoutDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from './PaymentScreen/PaymentScreen';
import MyPlanStack from './PersonalCoachScreen/MyPlanStack';
import AddWorkoutScreen from './WorkoutsScreen/addWorkoutScreen'
const Stack = createStackNavigator();

const DietScreen = () => (
  <View style={styles.screen}>
    <Text>Diet Screen</Text>
  </View>
);

const SettingsScreen = () => (
  <View style={styles.screen}>
    <Text>Settings Screen</Text>
  </View>
);

const StoreScreen = () => (
  <View style={styles.screen}>
    <Text>Store Screen</Text>
  </View>
);

// Create the Bottom Tab Navigator
const Tab = createBottomTabNavigator();

const WorkoutStack = ({isSuperUser}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workouts Plans"
        children={()=><WorkoutsScreen isSuperUser={isSuperUser}/>}
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
            <Stack.Screen
        name="AddWorkout"  // New screen for adding workouts
        component={AddWorkoutScreen}
        options={{ title: 'Add Workout' }}  // Set the title for this screen
      />
    </Stack.Navigator>
    
  );
};

const HomeScreen = ({isSuperUser}) => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            // Choose the icon based on the route name (tab name)
            switch (route.name) {
              case 'Profile':
                iconName = 'person';
                break;
              case 'Workouts':
                iconName = 'barbell';
                break;
              case 'My Plan':
                iconName = 'clipboard';
                break;
              case 'Settings':
                iconName = 'settings';
                break;
              case 'Store':
                iconName = 'cart';
                break;
            }

            // Return the Icon component from react-native-vector-icons
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',  // Active tab color
          tabBarInactiveTintColor: 'gray',  // Inactive tab color
        })}
      >
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
          title: 'Profile',  // This customizes the header title
          headerTitleStyle: {
            fontWeight: 'bold',  // Customize the font style
            fontSize: 20,  // Customize font size
          },
          headerShown:false
        }}
 />
        <Tab.Screen name="Workouts" children={()=><WorkoutStack isSuperUser={isSuperUser}/>} />
        <Tab.Screen name="My Plan" component={MyPlanStack} options={{headerShown:false}}/>
        <Tab.Screen name="Store" component={StoreScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
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
});

export default HomeScreen;
