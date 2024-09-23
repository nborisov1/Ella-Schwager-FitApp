import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from './styles';
import ExerciseCard from './cards/ExerciseCard';  // Import the ExerciseCard component

const ExerciseListScreen = ({ route }) => {
  const { title, exercises } = route.params;  // Get title and exercise list passed from navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            name={exercise.name}
            sets={exercise.sets}
            reps={exercise.reps}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ExerciseListScreen;
