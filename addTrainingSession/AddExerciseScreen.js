import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addExerciseToGeneralSession, fetchExercisesForSession } from './backend'; // Assuming these are in your backend
import styles from './addExerciseStyle';

const AddExerciseScreen = ({ route }) => {
  const { sessionId } = route.params; // Get sessionId from navigation params
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const navigation = useNavigation(); // Use navigation for routing to ExerciseVideoScreen

  useEffect(() => {
    loadExercises();
  }, [sessionId]);

  const loadExercises = async () => {
    try {
      const sessionExercises = await fetchExercisesForSession(sessionId);
      setExercises(sessionExercises);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    }
  };

  const handleAddExercise = async () => {
    if (!newExerciseName || !sets || !reps) {
      return Alert.alert('Invalid Input', 'Please enter all fields for exercise name, sets, and reps.');
    }

    try {
      await addExerciseToGeneralSession(sessionId, { name: newExerciseName, sets: parseInt(sets), reps: parseInt(reps) });
      loadExercises(); // Reload the updated exercises
      setNewExerciseName(''); // Reset input fields
      setSets('');
      setReps('');
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const handleExercisePress = (exercise) => {
    // Navigate to the ExerciseVideoScreen and pass the exercise data
    navigation.navigate('ExerciseVideoScreen', { exercise });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Exercises in this session</Text>

      {/* Exercise List */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleExercisePress(item)} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseInfo}>Sets: {item.sets} | Reps: {item.reps}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => <Text style={styles.noExercisesText}>No exercises added yet.</Text>}
      />

      {/* Add New Exercise Section */}
      <View style={styles.addExerciseContainer}>
        <TextInput
          style={styles.input}
          placeholder="Exercise Name"
          value={newExerciseName}
          onChangeText={setNewExerciseName}
        />

        <View style={styles.row}>
          <TextInput
            style={styles.smallInput}
            placeholder="Sets"
            keyboardType="numeric"
            value={sets}
            onChangeText={setSets}
          />
          <TextInput
            style={styles.smallInput}
            placeholder="Reps"
            keyboardType="numeric"
            value={reps}
            onChangeText={setReps}
          />
        </View>

        {/* Add Exercise Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddExerciseScreen;
