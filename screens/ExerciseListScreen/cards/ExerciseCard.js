import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, LayoutAnimation, StyleSheet, Platform, UIManager } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';  // Updated import
import styles from './styles';
// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExerciseCard = ({ name, sets, reps }) => {
  const [difficulty, setDifficulty] = useState(1);  // Difficulty scale (1-5)
  const [comment, setComment] = useState('');  // User comment
  const [isCommentOpen, setIsCommentOpen] = useState(false);  // Toggle for comment box

  // Toggle comment section visibility with smooth animation
  const toggleCommentSection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);  // Smooth animation
    setIsCommentOpen(!isCommentOpen);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.details}>Sets: {sets} | Reps: {reps}</Text>

      {/* Difficulty Scale */}
      <View style={styles.difficultyContainer}>
        <Text style={styles.label}>Difficulty: {difficulty}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={difficulty}
          onValueChange={(value) => setDifficulty(value)}
          minimumTrackTintColor="#1EB1FC"
          maximumTrackTintColor="#8E8E93"
          thumbTintColor="#1EB1FC"
        />
        <View style={styles.difficultyLabels}>
          <Text style={styles.difficultyText}>Easy</Text>
          <Text style={styles.difficultyText}>Hard</Text>
        </View>
      </View>

      {/* Comment Section with Toggle */}
      <TouchableOpacity style={styles.commentToggle} onPress={toggleCommentSection}>
        <Text style={styles.label}>Leave a comment</Text>
        <FontAwesome
          name={isCommentOpen ? 'angle-up' : 'angle-down'}  // Toggle arrow icon
          size={20}
          color="black"
        />
      </TouchableOpacity>

      {/* Comment Box (visible only when expanded) */}
      {isCommentOpen && (
        <View style={styles.commentContainer}>
          <TextInput
            style={styles.commentBox}
            placeholder="Add your feedback"
            multiline={true}
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
        </View>
      )}
    </View>
  );
};

export default ExerciseCard;
