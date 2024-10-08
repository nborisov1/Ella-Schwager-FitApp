import React, { useState } from 'react';
import { ScrollView, Text, View, Button, TouchableOpacity, Alert, Modal, TextInput, SafeAreaView } from 'react-native';
import ExerciseCard from './cards/ExerciseCard';
import styles from './styles';
import updateTrainingSession from '../../backend/personalPlan/updateTrainingSession';
import deleteExerciseFromSession from '../../backend/personalPlan/deleteExerciseFromSession';
import updateExerciseInSession from '../../backend/personalPlan/updateExerciseInSession';
import fetchAvailableExercises from '../../backend/users/fetchAvailableExercises';
import ExerciseCustomizationModal from './ExerciseCustomizationModal'
import { useNavigation } from '@react-navigation/native';


const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const ExerciseListScreen = ({ route }) => {
  const navigation = useNavigation();
  const { title, exercises, days, isSuperUser, sessionId, userId } = route.params;
  const [updatedDays, setUpdatedDays] = useState([...days]);  
  const [previousDays, setPreviousDays] = useState([...days]);
  const [customFields, setCustomFields] = useState({});
  const [editableExercises, setEditableExercises] = useState(exercises.map(exercise => ({
    ...exercise,
    originalSets: exercise.sets || 0,  
    originalReps: exercise.reps || 0,  
  })));
  const [editMode, setEditMode] = useState(false);  
  const [originalExercises, setOriginalExercises] = useState(editableExercises);  
  const [availableExercises, setAvailableExercises] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isCustomizingExercise, setIsCustomizingExercise] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [customReps, setCustomReps] = useState('');
  const [customSets, setCustomSets] = useState('');
  //TODO: refresh, and reload exercises after saving
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
        originalSets: exercise.sets || 0,  
        originalReps: exercise.reps || 0,  
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

  const handleSaveExercise = async (name, exerciseId, thumbnail, updatedData) => {
    await updateExerciseInSession(userId, sessionId, exerciseId, name, thumbnail, updatedData);
    const updatedExercises = editableExercises.map(exercise =>
      exercise.name === name ? { ...exercise } : exercise
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
  
  const handleNavigateToExerciseVideoScreen = (exercise) => {
    console.log('NATAN ex',exercise);
    navigation.navigate('ExerciseVideoScreen', {
      title: exercise.name,
      videoUri: exercise.videoUri,
      thumbnail: exercise.thumbnail,
      exerciseId: exercise.id,
      sessionId: sessionId,
      isSuperUser: isSuperUser
    });
  };

  const handleAddExercise = (exercise) => {
    console.log("add",exercise);
    setSelectedExercise(exercise);
    setIsCustomizingExercise(true);
  };
  const handleSaveCustomExercise = async (customField) => {
    let reps = 0;
    let sets = 0;
    try {
      const filteredData = Object.entries(customField).reduce((acc, [key, value]) => {
        if (key == 'sets') {
          sets = value;
        } else if (key == 'reps') {
          reps = value;
        } else {
          acc[key] = value;  // Add the key-value pair if key is not 'sets'
        }
        return acc;
      }, {});      
      const newExercise = {
        reps: reps,
        sets: sets,
        customField: {...filteredData},
      };
      const updatedExercises = [...editableExercises, newExercise];
      await updateExerciseInSession(userId, sessionId, selectedExercise.id, selectedExercise.name, selectedExercise.thumbnail, newExercise);
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
            <TouchableOpacity
              onPress={() => handleNavigateToExerciseVideoScreen(exercise)}  // Make the card clickable
            >
            <ExerciseCard
              name={exercise.name}
              sets={exercise.sets}
              reps={exercise.reps}
              exerciseId={exercise.exerciseId}
              isSuperUser={isSuperUser}
              onSave={handleSaveExercise}
              additionalFields={exercise.customField || {}}
              thumbnail={exercise.thumbnail}
            />
            </TouchableOpacity>
            {isSuperUser && editMode && (
              <View style={styles.deleteButtonContainer}>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteExercise(exercise.name, exercise.id)}
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
              exerciseName={selectedExercise.name}
              handleCustomFieldChange={(field, value) => setCustomFields({ ...customFields, [field]: value })}
              onSave={handleSaveCustomExercise}
              onClose={() => {setIsCustomizingExercise(false); setModalVisible(false);}}
          />: (
            <ScrollView>
              <Text style={styles.sectionTitle}>Select an Exercise</Text>
              {availableExercises.map((exercise) => (
                console.log("NATAN exercise.id",exercise.id),
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
