import React from 'react';
import { Text, ScrollView, View } from 'react-native';
import WorkoutPlanCard from './cards/WorkoutPlanCard';
import styles from './cards/styles';

const WorkoutsScreen = () => {
  const workoutPlans = [
    {
      title: 'Intense ABS Workout',
      videos: 8,
      totalTime: 120,
      isUnlocked: true,  // Unlocked status
      image: 'https://media.self.com/photos/61bcd0e05aed92fc4251b026/4:3/w_2560%2Cc_limit/GettyImages-1213234926.jpeg',  // Replace with actual image URL
    },
    {
      title: 'Full Body Burn',
      videos: 10,
      totalTime: 180,
      isUnlocked: false,  // Locked status
      image: 'https://indianutrition.com/wp-content/uploads/2020/03/core-strength-fitness.jpg',
    },
    {
        title: 'Intense ABS Workout',
        videos: 8,
        totalTime: 120,
        isUnlocked: true,  // Unlocked status
        image: 'https://media.self.com/photos/61bcd0e05aed92fc4251b026/4:3/w_2560%2Cc_limit/GettyImages-1213234926.jpeg',  // Replace with actual image URL
      },
      {
        title: 'Full Body Burn',
        videos: 10,
        totalTime: 180,
        isUnlocked: false,  // Locked status
        image: 'https://indianutrition.com/wp-content/uploads/2020/03/core-strength-fitness.jpg',
      },
  ];

  return (
    <ScrollView style={styles.container}>
      {workoutPlans.map((workout, index) => (
        <WorkoutPlanCard key={index} workout={workout} />
      ))}
    </ScrollView>
  );
};

export default WorkoutsScreen;