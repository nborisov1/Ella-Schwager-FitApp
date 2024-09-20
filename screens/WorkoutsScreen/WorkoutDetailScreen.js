import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import WorkoutCard from '../cards/WorkoutCard';
import styles from './cards/styles';

const WorkoutDetailScreen = ({ route }) => {
  const { workout } = route.params;

  // List of individual workouts for this plan
  const workouts = [
    { name: 'Morning Run', duration: 30, type: 'Cardio', watched: 10, total: 30, image: 'https://www.auraleisure.ie/wp-content/uploads/2023/03/john-arano-h4i9G-de7Po-unsplash-1-scaled.jpg' },
    { name: 'Strength Training', duration: 45, type: 'Strength', watched: 20, total: 45, image: 'https://www.auraleisure.ie/wp-content/uploads/2023/03/john-arano-h4i9G-de7Po-unsplash-1-scaled.jpg' },
    // Add more individual workouts here...
  ];

  return (
    <ScrollView style={styles.container}>
        {workouts.map((workoutDetail, index) => (
          <WorkoutCard key={index} workout={workoutDetail} />
        ))}
    </ScrollView>
  );
};

export default WorkoutDetailScreen;
