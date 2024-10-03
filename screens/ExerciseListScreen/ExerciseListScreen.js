import React, { useState } from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity, Alert, Modal, TextInput, SafeAreaView } from 'react-native';
import ExerciseCard from './cards/ExerciseCard';
import styles from './styles';
import updateTrainingSession from '../../backend/personalPlan/updateTrainingSession';
import deleteExerciseFromSession from '../../backend/personalPlan/deleteExerciseFromSession';
import updateExerciseInSession from '../../backend/personalPlan/updateExerciseInSession';
import fetchAvailableExercises from '../../backend/users/fetchAvailableExercises';
import ExerciseCustomizationModal from './ExerciseCustomizationModal'

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ExerciseListScreen = ({ route }) => {
  const { title, exercises, days, isSuperUser, sessionId, userId } = route.params;
  const [updatedDays, setUpdatedDays] = useState([...days]);  
  const [previousDays, setPreviousDays] = useState([...days]);
  const [customFields, setCustomFields] = useState({});
  const [editableExercises, setEditableExercises] = useState(exercises.map(exercise => ({
    ...exercise,
    originalSets: exercise.sets,  
    originalReps: exercise.reps,  
  })));
  const [editMode, setEditMode] = useState(false);  
  const [originalExercises, setOriginalExercises] = useState(editableExercises);  
  const [availableExercises, setAvailableExercises] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCustomizingExercise, setIsCustomizingExercise] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [customReps, setCustomReps] = useState('');
  const [customSets, setCustomSets] = useState('');

  const toggleDay = (day) => {
    if (updatedDays.includes(day)) {
      setUpdatedDays(updatedDays.filter((d) => d !== day));
    } else {
      setUpdatedDays([...updatedDays, day]);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateTrainingSession(userId, sessionId, { days: updatedDays });
      setPreviousDays(updatedDays);  
      setOriginalExercises(editableExercises);
      setEditableExercises(editableExercises.map(exercise => ({
        ...exercise,
        originalSets: exercise.sets,  
        originalReps: exercise.reps,  
      })));
      setEditMode(false);
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  const handleCancelChanges = () => {
    setUpdatedDays([...previousDays]);  
    setEditableExercises(originalExercises)
    setEditableExercises(editableExercises.map(exercise => ({
      ...exercise,
      sets: exercise.originalSets,  
      reps: exercise.originalReps,  
    })));
    setEditMode(false);
  };

  const handleSaveExercise = async (name, exerciseId, updatedData) => {
    await updateExerciseInSession(userId, sessionId, exerciseId, name, updatedData);
    const updatedExercises = editableExercises.map(exercise =>
      exercise.name === name ? { ...exercise, sets: newSets, reps: newReps } : exercise
    );
    setEditableExercises(updatedExercises);
    setEditMode(false);
  };

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
              await deleteExerciseFromSession(userId, sessionId, exerciseId, name);
              const updatedExercises = editableExercises.filter(exercise => exercise.name !== name);
              setEditableExercises(updatedExercises);
              setOriginalExercises(updatedExercises);
              setEditMode(false);
            } catch (error) {
              console.error('Error deleting exercise:', error);
              Alert.alert('Error', 'Failed to delete exercise. Please try again.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const openAddExerciseModal = async () => {
    setModalVisible(true);
    try {
      const exercises = await fetchAvailableExercises(sessionId);
      setAvailableExercises(exercises);
    } catch (error) {
      console.error('Error fetching available exercises:', error);
    }
  };

  const handleAddExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsCustomizingExercise(true);
  };
  const handleSaveCustomExercise = async () => {
    console.log("selectedExercise", selectedExercise);
    try {
      const newExercise = {
        ...selectedExercise,
        sets: customSets || 3,
        reps: customReps || 10,
      };
      const updatedExercises = [...editableExercises, newExercise];
      console.log('selectedExercise.exerciseId',selectedExercise.exerciseId);
      console.log('selectedExercise.name',selectedExercise.name);
      await updateExerciseInSession(userId, sessionId, selectedExercise.exerciseId, selectedExercise.name, { reps: newExercise.reps, sets: newExercise.sets });
      setEditableExercises(updatedExercises);
      setOriginalExercises(updatedExercises);
      setModalVisible(false);
      setIsCustomizingExercise(false);
    } catch (error) {
      console.error('Error saving custom exercise:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

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

      {isSuperUser && (
        <View style={styles.superUserOptions}>
          {editMode ? (
            <>
              <Button title="Save Changes" onPress={handleSaveChanges} />
              <Button title="Cancel" onPress={handleCancelChanges} />
            </>
          ) : (
            <>
              <Button title="Edit Mode" onPress={() => setEditMode(true)} />
              <Button title="Add Exercise" onPress={openAddExerciseModal} />
            </>
          )}
        </View>
      )}

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
              <View style={styles.deleteButtonContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteExercise(exercise.name, exercise.exerciseId)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Modal for Adding Exercise */}
      <Modal visible={isModalVisible} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
        {isCustomizingExercise ? <ExerciseCustomizationModal
              isVisible={isModalVisible}
              exercise={selectedExercise}
              customSets={customSets}
              setCustomSets={setCustomSets}
              customReps={customReps}
              setCustomReps={setCustomReps}
              customFields={customFields}
              handleCustomFieldChange={(field, value) => setCustomFields({ ...customFields, [field]: value })}
              addCustomField={() =>
                setCustomFields({ ...customFields, [`customField${Object.keys(customFields).length + 1}`]: '' })
              }
              onSave={handleSaveCustomExercise}
              onClose={() => {setIsCustomizingExercise(false); setModalVisible(false);}}
          />: (
            <ScrollView>
              <Text style={styles.sectionTitle}>Select an Exercise</Text>
              {availableExercises.map((exercise) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={styles.exerciseItem}
                  onPress={() => handleAddExercise(exercise)}
                >
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                </TouchableOpacity>
              ))}
              <Button title="Close" onPress={() => setModalVisible(false)} />
            </ScrollView>
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default ExerciseListScreen;
