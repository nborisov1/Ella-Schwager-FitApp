import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { formatDuration, sortDays } from '../../../utils/utils';
import { translateDayToHebrew } from '../../../utils/utils';

const WorkoutPlanCard = ({ workout, onPress }) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(workout.liked || false);
  const exerciseCount = workout.videos ? workout.videos.length : 0
  const handlePress = () => {
    if (workout.isUnlocked) {
        navigation.navigate('ExerciseList', {
          title: workout.title,
          exercises: workout.videos,
          sessionId: workout.id,
          thumbnail: workout.image,
          description: workout.subtitle,
          totalDuration: workout.totalTime,
        });
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

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <TouchableOpacity style={styles.workoutPlanCard} onPress={onPress ? onPress : handlePress}>
      <View style={styles.thumbnailContainer}>
        <ImageBackground source={{ uri: workout.image }} style={styles.thumbnail} imageStyle={{ borderRadius: 10 }}>
          <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
            <View style={styles.heartContainer}>
              <FontAwesome 
                name={liked ? "heart" : "heart-o"} 
                size={18} 
                color={liked ? styles.workoutPlanCard.backgroundColor : "black"}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
  
      {(workout.level || workout.place) && (
        <View style={styles.labelsContainer}>
          {workout.level && (
            <View style={styles.labelPrimary}>
              <Text style={styles.labelText}>{workout.level}</Text>
            </View>
          )}
          {workout.place && (
            <View style={styles.labelSecondary}>
              <Text style={styles.labelText}>{workout.place}</Text>
            </View>
          )}
        </View>
      )}
  
      <View style={styles.contentContainer}>
        {/* Title and Description */}
        <View>
          <Text style={styles.workoutTitle}>{workout.title}</Text>
          {workout.subtitle && <Text style={styles.workoutDescription}>{workout.subtitle}</Text>}
        </View>
        
        {/* Stats at the Bottom */}
        <View style={styles.workoutStats}>
          {workout.totalTime && (
            <View style={styles.statsBlock}>
              <FontAwesome name="clock-o" size={16} color="black" />
              <Text style={styles.statsText}>{formatDuration(workout.totalTime)}</Text>
            </View>
          )}
          <View style={styles.statsBlock}>
            <FontAwesome name="fire" size={16} color="black" />
            <Text style={styles.statsText}>{exerciseCount === 1 ? 'תרגיל בודד' : `${exerciseCount} תרגילים`}</Text>
          </View>
        </View>
  
        {/* Days Container Inline */}
        {workout.days && workout.days.length > 0 && (
          <View style={styles.daysContainerInline}>
            <Text style={styles.dayText}>
              {sortDays(workout.days).map((day, index) => (
                `${translateDayToHebrew(day)}${index < workout.days.length - 1 ? ' • ' : ''}`
              )).join('')}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
  };

export default WorkoutPlanCard;
