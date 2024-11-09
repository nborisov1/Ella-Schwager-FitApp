import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';
import { formatDuration } from '../../../utils/utils';

const MediumWorkoutCard = ({ workout, onPress, onToggleLike }) => (
  <TouchableOpacity style={styles.mediumCardContainer} onPress={onPress}>
    <ImageBackground source={{ uri: workout.image }} style={styles.mediumThumbnail} imageStyle={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
    {(workout.level || workout.place) && (<View style={styles.labelsContainer}>
        {workout.level && (<View style={styles.labelPrimary}>
          <Text style={styles.labelText}>{workout.level}</Text>
        </View>)}
        {workout.place && (<View style={styles.labelSecondary}>
          <Text style={styles.labelText}>{workout.place}</Text>
        </View>)}
      </View>)}
      <TouchableOpacity style={styles.heartIcon} onPress={onToggleLike}>
        <FontAwesome name={workout.liked ? "heart" : "heart-o"} size={20} color="white" />
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
        {workout.videos ? (<View style={styles.statsBlock}>
          <FontAwesome name="fire" size={16} color="black" />
          <Text style={styles.statsText}>{workout.videos > 1 ? ' ' + workout.videos + ' תרגילים': ' תרגיל בודד'}</Text>
        </View>) : null}
      </View>
    </View>
  </TouchableOpacity>
);

export default MediumWorkoutCard;
