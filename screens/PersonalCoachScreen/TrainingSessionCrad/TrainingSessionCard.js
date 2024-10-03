// components/TrainingSessionCard.js
import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

const TrainingSessionCard = ({ title, exercises, imageUri, days, onPress }) => {
  return (
    console.log("ex natan",exercises),
    <TouchableOpacity onPress={onPress}>
      <ImageBackground
        source={{ uri: imageUri }}
        style={styles.card}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
          <View style={styles.textContainer}>
            <Text style={styles.sessionTitle}>{title}</Text>
            <Text style={styles.sessionSubtitle}>{exercises} Exercises</Text>

            {/* Render the list of days horizontally */}
            <View style={styles.daysContainer}>
              {days && days.length > 0 && days.map((day, index) => (
                <View key={index} style={styles.dayWrapper}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default TrainingSessionCard;
