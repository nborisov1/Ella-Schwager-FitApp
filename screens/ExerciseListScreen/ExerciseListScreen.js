import React, { useState } from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import ExerciseCard from './cards/ExerciseCard';
import styles from './styles';
import { db } from '../../config/firebase'
import updateTrainingSession from '../../backend/personalPlan/updateTrainingSession'

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ExerciseListScreen = ({ route }) => {
  const { title, exercises, days, isSuperUser, sessionId, userId } = route.params;  // Get title, exercises, days, and super user status passed from navigation

  const [updatedDays, setUpdatedDays] = useState(days);  // Manage updated days state
  const [previousDays, setPreviousDays] = useState(days);  // Manage updated days state

  const [editMode, setEditMode] = useState(false);  // Control edit mode

  const toggleDay = (day) => {
    if (updatedDays.includes(day)) {
      setUpdatedDays(updatedDays.filter((d) => d !== day));  // Remove day if it's already selected
    } else {
      setUpdatedDays([...updatedDays, day]);  // Add day if it's not selected
    }
  };

  // Save updated days to Firestore
  const handleSaveDays = async () => {
    try {
      updateTrainingSession(userId, sessionId, {days : updatedDays})
      setPreviousDays(updatedDays)
      setEditMode(false)
    } catch (error) {
      console.error('Error updating days:', error);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setUpdatedDays(previousDays)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {/* Render the days below the title */}
      <View style={styles.daysContainer}>
        <View style={styles.daysListContainer}>
          {isSuperUser && editMode ? (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysList}>
            {daysOfWeek.map((day, index) => (
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
            ))}
          </ScrollView>
        ) : (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.daysList}>
              {updatedDays.map((day, index) => (
                <View key={index} style={styles.dayWrapper}>
                  <Text style={styles.dayText}>{day}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      {isSuperUser && (
        <View style={styles.superUserOptions}>
          {editMode ? (
            <>
              <Button title="Save Days" onPress={handleSaveDays} />
              <Button title="Cancel" onPress={handleCancel} />
            </>
          ) : (
            <Button title="Edit Days" onPress={() => setEditMode(true)} />
          )}
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {exercises.map((exercise, index) => (
          <ExerciseCard
            key={index}
            name={exercise.name}
            sets={exercise.sets}
            reps={exercise.reps}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ExerciseListScreen;
