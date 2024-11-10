import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { formatDuration, sortDays } from '../../../utils/utils';
import { translateDayToHebrew } from '../../../utils/utils';

const WorkoutPlanCard = ({ workout, onPress, onLike }) => {
  const [liked, setLiked] = useState(workout.liked || false);
  const exerciseCount = workout.videos ? workout.videos.length : 0

  const toggleLike = () => {
    setLiked(!liked);
    if (onLike) {
      onLike();
    }
  };

  return (
    <TouchableOpacity style={styles.workoutPlanCard} onPress={onPress ? onPress : handlePress}>
      <View style={styles.thumbnailContainer}>
        <ImageBackground source={{ uri: workout.image }} style={styles.thumbnail} blurRadius={workout.isUnlocked ? 0 :10} imageStyle={{ borderRadius: 10 } }>
        {!workout.isUnlocked && (
            <View style={styles.lockedOverlay}>
              <FontAwesome name="lock" size={24} color="white" />
            </View>
          )}
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
        
        {onLike ? (<View style={styles.titleContainer}>
            <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
              <FontAwesome name={liked ? 'heart' : 'heart-o'} size={20} color={liked ? 'white' : 'black'} />
            </TouchableOpacity>
            <Text style={styles.workoutTitle}>{workout.title}</Text>
          </View>) : <Text style={styles.workoutTitle}>{workout.title}</Text>}
          {workout.subtitle && <Text style={styles.workoutDescription}>{workout.subtitle}</Text>}
        </View>
        
        {/* Stats at the Bottom */}
        <View style={styles.workoutStats}>
          {workout.totalTime && (
            <View style={styles.statsBlock}>
              <FontAwesome name="clock-o" size={16} color="black" />
              <Text style={styles.statsText}> {formatDuration(workout.totalTime)}</Text>
            </View>
          )}
          <View style={styles.statsBlock}>
            <FontAwesome name="fire" size={16} color="black" />
            <Text style={styles.statsText}>{exerciseCount === 1 ? 'תרגיל בודד' : ` ${exerciseCount} תרגילים`}</Text>
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
