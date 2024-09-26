import React from 'react';
import { Text, ScrollView, View, TouchableOpacity } from 'react-native';
import WorkoutPlanCard from './cards/WorkoutPlanCard';
import styles from '../cards/styles';
import { useNavigation } from '@react-navigation/native';

const WorkoutsScreen = ({ isSuperUser }) => {
  const workoutPlans = [
    {
      title: 'Intense ABS Workout',
      videos: 8,
      totalTime: 120,
      isUnlocked: true,
      image: 'https://media.self.com/photos/61bcd0e05aed92fc4251b026/4:3/w_2560%2Cc_limit/GettyImages-1213234926.jpeg',
    },
    {
      title: 'Full Body Burn',
      videos: 10,
      totalTime: 180,
      isUnlocked: false,
      image: 'https://indianutrition.com/wp-content/uploads/2020/03/core-strength-fitness.jpg',
    },
    // Add more workouts as needed
  ];

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {workoutPlans.map((workout, index) => (
        <WorkoutPlanCard key={index} workout={workout} />
      ))}

      {/* Conditionally render "Add Workout" button for super users */}
      {isSuperUser && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddWorkout')}
        >
          <Text style={styles.addButtonText}>Add Workout</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default WorkoutsScreen;
