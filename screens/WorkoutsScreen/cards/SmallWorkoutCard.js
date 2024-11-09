import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from Expo
import styles from './smallWorkoutCardStyles';

const SmallWorkoutCard = ({ workout, onPress }) => (
  <TouchableOpacity style={styles.smallCardContainer} onPress={onPress}>
    <ImageBackground source={{ uri: workout.image }} style={styles.smallCardContainer} imageStyle={{ borderRadius: 10 }}>
      <LinearGradient
        colors={['#D4A373', 'transparent']} // Bronze gradient colors
        style={styles.gradientOverlay}
      >
        <Text style={styles.smallCardTitle}>{workout.title}</Text>
      </LinearGradient>
    </ImageBackground>
  </TouchableOpacity>
);

export default SmallWorkoutCard;
