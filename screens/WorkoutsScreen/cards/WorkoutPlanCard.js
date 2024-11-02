import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const WorkoutPlanCard = ({ workout }) => {
  const navigation = useNavigation();
  const [liked, setLiked] = useState(workout.liked || false);

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

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <TouchableOpacity style={styles.workoutPlanCard} onPress={handlePress}>
      {/* Left Side Thumbnail */}
      <View style={styles.thumbnailContainer}>
        <ImageBackground source={{ uri: workout.image }} style={styles.thumbnail} imageStyle={{ borderRadius: 10 }}>
          {/* Heart Icon for Like */}
          <TouchableOpacity style={styles.heartIcon} onPress={toggleLike}>
            <FontAwesome name={liked ? "heart" : "heart-o"} size={20} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Right Side Content */}
      <View style={styles.contentContainer}>
        {/* Workout Title */}
        <Text style={styles.workoutTitle}>{workout.title}</Text>

        {/* Labels Between Title and Subtitle */}
        <View style={styles.labelsRow}>
          <View style={styles.labelPrimary}>
            <Text style={styles.labelText}>{workout.level}</Text>
          </View>
          <View style={styles.labelSecondary}>
            <Text style={styles.labelText}>{workout.place}</Text>
          </View>
        </View>

        {/* Workout Description */}
        <Text style={styles.workoutDescription}>{workout.subtitle}</Text>
        
        {/* Stats Section */}
        <View style={styles.workoutStats}>
          <View style={styles.statsBlock}>
            <FontAwesome name="clock-o" size={16} color="black" />
            <Text style={styles.statsText}>{workout.totalTime}</Text>
          </View>
          <View style={styles.statsBlock}>
            <FontAwesome name="fire" size={16} color="black" />
            <Text style={styles.statsText}>{workout.videos} תרגילים</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default WorkoutPlanCard;
