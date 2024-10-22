import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Using react-native-image-picker for simplicity
import styles from './styles';
import { pickThumbnail } from '../../media/mediaPicker';
import { createGeneralWorkout } from '../../backend/generalWorkouts/generalWorkoutController';

const AddWorkoutScreen = ({ navigation }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  // Function to pick an image for the thumbnail
  const handlePickThumbnail = async () => {
    const result = await pickThumbnail();  // Call the utility function
    if (result.success) {
      setThumbnail(result.uri);  // Set the selected thumbnail URI
    } else {
      console.log('No thumbnail was selected or an error occurred');
    }
  };

  // Simulate workout save
  const handleAddWorkout = async () => {
    if (workoutName && thumbnail) {
      await createGeneralWorkout(workoutName, thumbnail);
      navigation.goBack();
    } else {
      Alert.alert('Invalid Input','Please fill out all fields');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Workout</Text>

      {/* Workout Package Name */}
      <Text style={styles.label}>Workout Package Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter workout name"
        placeholderTextColor="#aaa"
        value={workoutName}
        onChangeText={setWorkoutName}
      />

      {/* Add Thumbnail */}
      <Text style={styles.label}>Thumbnail</Text>
      <TouchableOpacity style={styles.button} onPress={handlePickThumbnail}>
        <Text style={styles.buttonText}>Select Thumbnail</Text>
      </TouchableOpacity>
      {thumbnail && <Image source={{ uri: thumbnail }} style={styles.thumbnailPreview} />}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleAddWorkout}>
        <Text style={styles.submitButtonText}>Add Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddWorkoutScreen;
