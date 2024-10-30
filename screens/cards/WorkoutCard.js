import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // For the play button icon
import styles from './styles';

const WorkoutCard = ({ workout }) => {
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
        <Text style={{fontSize: 18, fontWeight: '600', color: '#333', marginBottom: 8, }}>{workout.name}</Text> 
        <View style={styles.workoutFooter}>
          {/* Play Button */}
          <TouchableOpacity style={styles.playButton}>
            <FontAwesome name="play" size={16} color="white" style={styles.playIcon} />
            <Text style={styles.playButtonText}>Continue now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutCard;
