// components/SmallWorkoutCard.js

import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './smallWorkoutCardStyles';

const SmallWorkoutCard = ({ workout, onPress }) => (
  <TouchableOpacity style={styles.smallCardContainer} onPress={onPress}>
    <ImageBackground source={{ uri: workout.image }} style={styles.smallThumbnail} imageStyle={{ borderRadius: 10 }}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{workout.label}</Text>
      </View>
    </ImageBackground>
    <Text style={styles.smallCardTitle}>{workout.title}</Text>
  </TouchableOpacity>
);

export default SmallWorkoutCard;