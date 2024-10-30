import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const WorkoutPlanCard = ({ workout }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (workout.isUnlocked) {
      navigation.navigate('WorkoutDetail', { workout });
    } else {
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
      <ImageBackground source={{ uri: workout.image }} style={styles.workoutImage}>
        <View style={styles.overlay}>
          <View style={styles.workoutTopInfo}>
            <View style={styles.infoBlock}>
              <FontAwesome name="film" size={16} color="white" />
              <Text style={styles.infoText}>{`${workout.videos} Workouts`}</Text>
            </View>
            <View style={styles.infoBlock}>
              <FontAwesome name="clock-o" size={16} color="white" />
              <Text style={styles.infoText}>{`${workout.totalTime}`}</Text>
            </View>
          </View>

          <View style={styles.workoutInfoContainer}>
            <View>
              <Text style={styles.instructorName}>{workout.instructor}</Text>
              <Text style={styles.workoutTitle}>{workout.title}</Text>
            </View>
          </View>

          {/* Lock/Unlock Icon in the bottom-right corner */}
          <View style={styles.lockIconContainer}>
            <FontAwesome
              name={workout.isUnlocked ? "unlock" : "lock"}
              size={20}
              color="white"
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default WorkoutPlanCard;
