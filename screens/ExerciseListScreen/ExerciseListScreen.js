import React, { useState } from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import ExerciseCard from './cards/ExerciseCard';
import styles from './styles';
import updateTrainingSession from '../../backend/personalPlan/updateTrainingSession';
import deleteExerciseFromSession from '../../backend/personalPlan/deleteExerciseFromSession';
import updateExerciseInSession from '../../backend/personalPlan/updateExerciseInSession'

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ExerciseListScreen = ({ route }) => {
  const { title, exercises, days, isSuperUser, sessionId, userId } = route.params;

  const [updatedDays, setUpdatedDays] = useState([...days]);  // Current days selection
  const [previousDays, setPreviousDays] = useState([...days]);  // Preserve original days selection
  const [editableExercises, setEditableExercises] = useState(exercises.map(exercise => ({
    ...exercise,
    originalSets: exercise.sets,  // Preserve original sets
    originalReps: exercise.reps,  // Preserve original reps
  })));
  const [editMode, setEditMode] = useState(false);  // Control edit mode
  const [originalExercises, setOriginalExercises] = useState(editableExercises);  // Backup the original exercises

  const toggleDay = (day) => {
    if (updatedDays.includes(day)) {
      setUpdatedDays(updatedDays.filter((d) => d !== day));
    } else {
      setUpdatedDays([...updatedDays, day]);
    }
  };

  // Save updated days and exercises to Firestore
  const handleSaveChanges = async () => {
    try {
      await updateTrainingSession(userId, sessionId, { days: updatedDays });
      setPreviousDays(updatedDays);  // Save days
      setOriginalExercises(editableExercises);
      setEditableExercises(editableExercises.map(exercise => ({
        ...exercise,
        originalSets: exercise.sets,  // Save new sets as original
        originalReps: exercise.reps,  // Save new reps as original
      })));
      setEditMode(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  // Cancel changes and revert to original state
  const handleCancelChanges = () => {
    setUpdatedDays([...previousDays]);  // Revert to original days
    setEditableExercises(originalExercises)
    setEditableExercises(editableExercises.map(exercise => ({
      ...exercise,
      sets: exercise.originalSets,  // Revert sets
      reps: exercise.originalReps,  // Revert reps
    })));
    setEditMode(false);
  };

  // Handle updating exercise details locally (not saved until Save button is pressed)
  const handleSaveExercise = async (name, exerciseId, newSets, newReps) => {
    await updateExerciseInSession(userId, sessionId, exerciseId, name, {reps: newReps, sets: newSets})
    const updatedExercises = editableExercises.map(exercise =>
      exercise.name === name ? { ...exercise, sets: newSets, reps: newReps } : exercise
    );
    setEditableExercises(updatedExercises);
    setEditMode(false);
  };

  // Handle deleting exercise with confirmation
  const handleDeleteExercise = (name, exerciseId) => {
    Alert.alert(
      'Delete Exercise',
      `Are you sure you want to delete ${name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Call the async function to delete the exercise from Firestore or any backend
              await deleteExerciseFromSession(userId, sessionId, exerciseId, name);
  
              // After successful deletion, update the local state
              const updatedExercises = editableExercises.filter(exercise => exercise.name !== name);
              setEditableExercises(updatedExercises);
              setOriginalExercises(updatedExercises);
              setEditMode(false);
            } catch (error) {
              console.error('Error deleting exercise:', error);
              // Optionally, show an error message to the user
              Alert.alert('Error', 'Failed to delete exercise. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Render the days below the title */}
      <View style={styles.daysContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysList}>
          {editMode && isSuperUser ? (
            daysOfWeek.map((day, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleDay(day)}
                style={[
                  styles.dayWrapper,
                  { backgroundColor: updatedDays.includes(day) ? '#4CAF50' : '#f0f0f0' },
                ]}
              >
                <Text style={styles.dayText}>{day}</Text>
              </TouchableOpacity>
            ))
          ) : (
            updatedDays.map((day, index) => (
              <View key={index} style={styles.dayWrapper}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      {/* Edit Mode Button */}
      {isSuperUser && (
        <View style={styles.superUserOptions}>
          {editMode ? (
            <>
              <Button title="Save Changes" onPress={handleSaveChanges} />
              <Button title="Cancel" onPress={handleCancelChanges} />
            </>
          ) : (
            <Button title="Edit Mode" onPress={() => setEditMode(true)} />
          )}
        </View>
      )}

      {/* Render Exercise Cards */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {editableExercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <ExerciseCard
              name={exercise.name}
              sets={exercise.sets}
              reps={exercise.reps}
              exerciseId={exercise.exerciseId}
              isSuperUser={isSuperUser}
              onSave={handleSaveExercise}
            />
            {isSuperUser && editMode && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteExercise(exercise.name, exercise.exerciseId)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ExerciseListScreen;
