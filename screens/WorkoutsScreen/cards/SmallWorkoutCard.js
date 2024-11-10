import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './smallWorkoutCardStyles';
import { FontAwesome } from '@expo/vector-icons';

const SmallWorkoutCard = ({ workout, onPress }) => (
  <TouchableOpacity style={styles.smallCardContainer} onPress={onPress}>
    {/* Blurred Background */}
    <ImageBackground source={{ uri: workout.image }} style={styles.smallCardContainer} imageStyle={{ borderRadius: 10 }} blurRadius={workout.isUnlocked ? 0 : 10}>
      {/* Overlay */}
      <View style={styles.overlayContainer}>
        {/* Bronze Gradient and Text (Unblurred) */}
        <LinearGradient colors={['#D4A373', 'transparent']} style={styles.gradientOverlay}>
          <Text style={styles.smallCardTitle}>{workout.title}</Text>
        </LinearGradient>

        {/* Locked Icon if workout is locked */}
        {!workout.isUnlocked && (
          <View style={styles.lockedOverlay}>
            <FontAwesome name="lock" size={24} color="white" />
          </View>
        )}
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

export default SmallWorkoutCard;
