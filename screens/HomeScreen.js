import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import UsersScreen from './usersScreen/UsersScreen'; // Import the new UsersScreen
import WorkoutsScreen from './WorkoutsScreen/workoutsScreen';
import WorkoutDetailScreen from './WorkoutsScreen/WorkoutDetailScreen';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentScreen from './PaymentScreen/PaymentScreen';
import MyPlanStack from './PersonalCoachScreen/MyPlanStack';
import AddTrainingSessionStack from '../addTrainingSession/AddTrainingSessionStack'
import AddWorkoutScreen from './WorkoutsScreen/addWorkoutScreen';
import UserStack from './usersScreen/UsersStack';
import ProfileScreenStack from './ProfileScreen/ProfileStack';

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

// The Workout Stack
const WorkoutStack = ({ isSuperUser, user }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Workouts Plans"
        children={() => <WorkoutsScreen isSuperUser={isSuperUser} user={user} />}
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
        options={{ headerShown: false}}  // Set the title for this screen
      />
    </Stack.Navigator>
  );
};

// Main Home Screen with bottom tabs
const HomeScreen = ({ userData }) => {
  const isSuperUser = userData ? userData.role == 'Admin' : false
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            let iconColor = focused ? '#C73D8C' : '#000';  // Black for inactive, purple for active
            let iconSize = focused ? 30 : 24;  // Make the active icon larger

            // Choose the outline icon based on the route name
            switch (route.name) {
              case 'UsersStack':
                iconName = 'people-outline'; 
                break;
              case 'Workouts':
                iconName = 'barbell-outline';
                break;
              case 'My Plan':
                iconName = 'clipboard-outline';
                break;
              case 'Add Training':
                iconName = 'add-circle-outline';
                break;
              case 'Settings':
                iconName = 'settings-outline';
                break;
              case 'Store':
                iconName = 'cart-outline';
                break;
              case 'Profile':
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

        {isSuperUser ? (
          <Tab.Screen
            name="UsersStack"
            component={UserStack}  // Use the UsersStack for navigation within the Users tab
            options={{
              title: 'Users',  // This customizes the header title
              headerTitleStyle: {
                fontWeight: 'bold',  // Customize the font style
                fontSize: 20,  // Customize font size
              },
              headerShown: false,
            }}
          />
        ) : (
          <Tab.Screen
            name="Profile"
            children={() => <ProfileScreenStack user={userData} />}
            options={
              {headerShown: false}
            }
          />
        )}

        <Tab.Screen
          name="Workouts"
          children={() => <WorkoutStack isSuperUser={isSuperUser} user={userData}/>}
        />

        {isSuperUser ? (
          <Tab.Screen
            name="Add Training"
            children={() => <AddTrainingSessionStack userData={userData} />}
            options={{ headerShown: false }}
          />
        ) : (
          <Tab.Screen
            name="My Plan"
            children={() => <MyPlanStack userData={userData} />}
            options={{ headerShown: false }}
          />
        )}
        
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
