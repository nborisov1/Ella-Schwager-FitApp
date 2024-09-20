import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ProgressBar } from 'react-native-paper';  // This is a simple progress bar
import { FontAwesome } from '@expo/vector-icons';  // For the play button icon
import styles from './styles';

const WorkoutCard = ({ workout }) => {
  const progress = workout.watched / workout.total;  // Assuming you have 'watched' and 'total' for the progress

  return (
    <TouchableOpacity style={styles.workoutCard}>
      {/* Workout Image */}
      {/* Total Time Positioned at the Top Right */}
      <View style={styles.totalTimeContainer}>
        <FontAwesome name="clock-o" size={14} color="white" />
        <Text style={styles.totalTimeText}>{`${workout.total}`}</Text>
      </View>
      <Image source={{ uri: workout.image }} style={styles.workoutImage} />

      {/* Workout Info */}
      <View style={styles.workoutInfo}>
        <Text style={styles.workoutTitle}>{workout.name}</Text>
        <Text style={styles.workoutType}>{workout.type}</Text>

        {/* Progress Bar */}
        <ProgressBar progress={progress} color="#FF8C00" style={styles.progressBar} />

        <View style={styles.workoutFooter}>
          {/* Play Button */}
          <TouchableOpacity style={styles.playButton}>
            <FontAwesome name="play" size={16} color="white" style={styles.playIcon} />
            <Text style={styles.playButtonText}>Continue now</Text>
          </TouchableOpacity>

          {/* Workout Completion Percentage */}
          <Text style={styles.percentageText}>{Math.round(progress * 100)}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutCard;
