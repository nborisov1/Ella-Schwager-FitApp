import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { formatDuration } from '../../../utils/utils';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MediumWorkoutCard = ({ workout, onPress, onToggleLike, onPaymentPress }) => {
  // Local state to manage liked status immediately on toggle
  const [liked, setLiked] = useState(workout.liked);
  const navigation = useNavigation();
  useEffect(() => {
    setLiked(workout.liked);
  }, [workout.liked]);
  const handleLikeToggle = () => {
    setLiked(!liked); // Toggle liked status locally
    onToggleLike(); // Call the parent function to handle backend update
  };
  const handlePress = () => {
    if (workout.isUnlocked) {
        onPress();
    } else {
      Alert.alert(
        'האימון נעול',
        'האימון לא זמין עבורך - הפוך לחבר פרימיום וקבל גישה לכל האימונים שלנו',
        [
          { text: 'ביטול', style: 'cancel' },
          { 
            text: 'הפוך לחבר פרימיום', 
            onPress: () => onPaymentPress
          }
        ],
        { cancelable: true }
      );
    }
  };
  return (
    <TouchableOpacity style={styles.mediumCardContainer} onPress={handlePress}>
      <ImageBackground source={{ uri: workout.image }} style={styles.mediumThumbnail} blurRadius={!workout.isUnlocked ? 10 : 0} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        {!workout.isUnlocked && (<View style={styles.lockedOverlay}>
              <FontAwesome name="lock" size={24} color="white" />
        </View>)}
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
        <TouchableOpacity style={styles.heartIconMediumCard} onPress={handleLikeToggle}>
          <FontAwesome name={liked ? "heart" : "heart-o"} size={20} color="white" />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.mediumCardContent}>
        <Text style={styles.workoutTitle}>{workout.title}</Text>
        <Text style={styles.workoutDescription}>{workout.description}</Text>
        <View style={styles.workoutStats}>
          {workout.totalTime ? (
            <View style={styles.statsBlock}>
              <FontAwesome name="clock-o" size={16} color="black" />
              <Text style={styles.statsText}> {formatDuration(workout.totalTime)}</Text>
            </View>
          ) : null}
          {workout.videos ? (
            <View style={styles.statsBlock}>
              <FontAwesome name="fire" size={16} color="black" />
              <Text style={styles.statsText}>
                {workout.videos > 1 ? ' ' + workout.videos + ' תרגילים' : ' תרגיל בודד'}
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MediumWorkoutCard;
