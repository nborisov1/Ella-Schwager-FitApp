import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // Hook for navigation
import styles from './styles';

const WorkoutPlanCard = ({ workout }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (workout.isUnlocked) {
      // Navigate to the WorkoutDetailScreen with the workout data
      navigation.navigate('WorkoutDetail', { workout });
    } else {
      // Show an alert with a message and a Pay button if the workout is locked
      Alert.alert(
        'Workout Locked',
        'This workout plan is locked. Unlock to continue.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Pay for Workout', 
            onPress: () => navigation.navigate('Payment', { workoutId: workout.id }) 
          }
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <TouchableOpacity style={styles.workoutPlanCard} onPress={handlePress}>
      <View style={styles.workoutTopInfo}>
        <View style={styles.infoBlock}>
          <FontAwesome name="film" size={16} color="white" />
          <Text style={styles.infoText}>{`${workout.videos} Workouts`}</Text>
        </View>
        <View style={styles.infoBlock}>
          <FontAwesome name="clock-o" size={16} color="white" />
          <Text style={styles.infoText}>{`${workout.totalTime} min`}</Text>
        </View>
      </View>

      <Image source={{ uri: workout.image }} style={styles.workoutImage} />

      <View style={styles.workoutInfoContainer}>
        <Image source={{ uri: workout.instructorImage }} style={styles.instructorImage} />
        <View>
          <Text style={styles.instructorName}>{workout.instructor}</Text>
          <Text style={styles.workoutTitle}>{workout.title}</Text>
        </View>
      </View>

      <View style={styles.lockIconContainer}>
        <FontAwesome
          name={workout.isUnlocked ? "unlock" : "lock"}
          size={20}
          color="white"
        />
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPlanCard;
