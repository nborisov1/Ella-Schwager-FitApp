import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import styles from './styles';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExerciseCard = ({ name, sets, reps, isSuperUser, onSave, exerciseId }) => {
  const [editableSets, setEditableSets] = useState(sets);
  const [editableReps, setEditableReps] = useState(reps);
  const [originalSets, setOriginalSets] = useState(sets);
  const [originalReps, setOriginalReps] = useState(reps);
  const [isEditing, setIsEditing] = useState(false);
  const [difficulty, setDifficulty] = useState(3);  // Default difficulty
  const [comment, setComment] = useState('');
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const toggleCommentSection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCommentOpen(!isCommentOpen);
  };

  const handleSave = () => {
    setIsEditing(false);
    onSave(name, exerciseId, editableSets, editableReps);  // Save the updated sets and reps
    setOriginalReps(editableReps)
    setOriginalSets(editableSets)
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditableReps(originalReps)
    setEditableSets(originalSets)
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>

      {isSuperUser && isEditing ? (
        <>
          <View style={styles.horizontalContainer}>
            {/* Editable Sets */}
            <View style={styles.editableFieldContainer}>
              <TextInput
                style={styles.input}
                value={String(editableSets)}
                keyboardType="numeric"
                onChangeText={text => setEditableSets(text)}
                placeholder="Sets"
              />
              <Text style={styles.label}>Sets</Text>
            </View>

            {/* Editable Reps */}
            <View style={styles.editableFieldContainer}>
              <TextInput
                style={styles.input}
                value={String(editableReps)}
                keyboardType="numeric"
                onChangeText={text => setEditableReps(text)}
                placeholder="Reps"
              />
              <Text style={styles.label}>Reps</Text>
            </View>
          </View>

          {/* Save and Cancel Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.centeredContainer}>
          <Text style={styles.details}>Sets: {editableSets} | Reps: {editableReps}</Text>
        </View>
      )}

      {/* Difficulty Scale */}
      <View style={styles.difficultyContainer}>
        <Text style={styles.leftLabel}>Difficulty: {difficulty}</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={5}
          step={1}
          value={difficulty}
          onValueChange={(value) => setDifficulty(value)}
          minimumTrackTintColor="#4CAF50"
          maximumTrackTintColor="#C8C8C8"
          thumbTintColor="#4CAF50"
        />
        <View style={styles.difficultyLabels}>
          <Text style={styles.difficultyText}>Easy</Text>
          <Text style={styles.difficultyText}>Hard</Text>
        </View>
      </View>

      {/* Comment Section */}
      <TouchableOpacity style={styles.commentToggle} onPress={toggleCommentSection}>
        <Text style={styles.leftLabel}>Leave a comment</Text>
        <FontAwesome
          name={isCommentOpen ? 'angle-up' : 'angle-down'}
          size={20}
          color="black"
        />
      </TouchableOpacity>

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

      {/* Edit Button for Super Users */}
      {isSuperUser && !isEditing && (
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ExerciseCard;
