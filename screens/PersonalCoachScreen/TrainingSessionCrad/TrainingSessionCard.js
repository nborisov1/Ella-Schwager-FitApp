import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Dimensions, ActivityIndicator, I18nManager } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import styles from './styles';
import { sortDays, translateDayToHebrew } from '../../../utils/utils';

I18nManager.forceRTL(false);

const TrainingSessionCard = ({ title, exercises, imageUri, days, onPress, subtitle }) => {
  const [maxLines, setMaxLines] = useState(1);
  const [loading, setLoading] = useState(true);  // Loading state for image
  const { width } = Dimensions.get('window');  // Get the width of the device

  useEffect(() => {
    if (subtitle) {
      calculateNumberOfLines(subtitle, width);
    }
  }, [subtitle, width]);

  const calculateNumberOfLines = (subtitleText, cardWidth) => {
    const gradientEnd = cardWidth * 0.75;  // Gradient starts at 75% of the card width
    const characterLimitPerLine = Math.floor(gradientEnd / 12);  // Approximation: 12px per character
    const numCharacters = subtitleText.length;

    // Calculate how many lines are needed
    const linesNeeded = Math.ceil(numCharacters / characterLimitPerLine);

    // Set the maximum number of lines based on subtitle length and available space
    setMaxLines(linesNeeded);
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
      
      {/* Position Days outside of the Image and Gradient */}
      <View style={styles.daysContainer}>
      {days && days.length > 0 && sortDays(days).map((day, index) => (
          <View key={index} style={styles.dayWrapper}>
            <Text style={styles.dayText}>{translateDayToHebrew(day)}</Text>
          </View>
        ))}
      </View>
      
      {/* Image covering entire card with gradient */}
      <View>
        <ImageBackground
          source={{ uri: imageUri }}
          style={styles.card}  // The image fills the entire card
          imageStyle={{ borderRadius: 15 }}  // Move the image's center to the right
          resizeMode="cover"  // Resize the image while maintaining its aspect ratio
          onLoadEnd={() => setLoading(false)}  // Hide ActivityIndicator once the image is loaded
        >
          <LinearGradient
            colors={styles.linearGradient.colors}
            start={styles.linearGradient.start}
            end={styles.linearGradient.end}
            style={styles.gradient}
          >
            <View style={styles.textContainer}>
              <Text style={styles.sessionTitle}>{title}</Text>
              
              {/* Conditionally render the subtitle if it exists */}
              {subtitle && (
                <Text style={styles.sessionSubtitle} numberOfLines={maxLines} ellipsizeMode="tail">
                {subtitle.split(' ').map((word, index) => ((index + 1) % 5 === 0 ? `${word}\n` : word + ' '))}
                </Text>
              )}
            </View>

            <View style={styles.bottomLeft}>
              <View style={styles.detailItem}>
                <Text style={styles.detailText}>{exercises === 1 ? 'תרגיל בודד' : `${exercises} תרגילים`}</Text>
                <MaterialIcons name="fitness-center" size={18} color="#fff" style={{ paddingRight: 5 }} />
              </View>
            </View>

          </LinearGradient>
        </ImageBackground>

        {/* ActivityIndicator for loading state */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default TrainingSessionCard;
