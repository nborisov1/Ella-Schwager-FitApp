import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addExerciseToGeneralSession, fetchExercisesForSession } from './backend';
import * as ImagePicker from 'expo-image-picker';
import styles from './addExerciseStyle';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import UploadProgressModal from '../components/UploadProgressModal';  // Import your new reusable component

const AddExerciseScreen = ({ route }) => {
  const { sessionId, title, userData } = route.params;
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');  // State to hold thumbnail URI
  const [uploadProgress, setUploadProgress] = useState(0); // Track upload progress
  const [isUploading, setIsUploading] = useState(false); // Control modal visibility
  const navigation = useNavigation();

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
    if (!newExerciseName || !thumbnailUri) {
      return Alert.alert('Invalid Input', 'Please enter an exercise name and select a thumbnail.');
    }

    try {
      setIsUploading(true); // Show the modal when uploading starts
      // Pass both the name and thumbnail to the backend
      await addExerciseToGeneralSession(sessionId, { name: newExerciseName, thumbnail: thumbnailUri }, 
        (progress) => {
          setUploadProgress(progress); // Update the progress in the state to reflect in the modal
        }, 
        async (error, downloadURL) => {
          if (error) {
            console.error("Upload failed", error);
          } else {
            const exercise = { name: newExerciseName, thumbnail: downloadURL }
            const exerciseRef = doc(collection(db, `trainingSessions/${sessionId}/exercises`));
            await setDoc(exerciseRef, exercise);
            setNewExerciseName('');  // Reset input fields
            setThumbnailUri('');  // Reset the thumbnail
            setIsUploading(false); // Hide the modal when upload is complete
            loadExercises();  // Reload the updated exercises
          }
      });
    } catch (error) {
      console.error('Error adding exercise:', error);
      setIsUploading(false); // Hide the modal on error
    }
  };

  const handleExercisePress = (exercise) => {
    console.log("exercise",exercise);
    navigation.navigate('ExerciseVideoScreen', {
      title: exercise.name,
      thumbnail: exercise.thumbnail,
      exerciseId: exercise.id,
      sessionId: sessionId,
      isSuperUser: userData.role == 'Admin'
    });
  };

  // Open the image picker to select a thumbnail
  const handleChooseThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,   // Allows user to crop image
      aspect: [4, 3],        // Aspect ratio of the image
      quality: 1,            // Image quality (1 = max)
    });
    if (!result.cancelled) {
      setThumbnailUri(result.assets[0].uri);  // Set the selected image URI
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{title} Exercises</Text>

      {/* Exercise List */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleExercisePress(item)} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            {item.thumbnail && <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />}
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

        {/* Button to pick a thumbnail */}
        <TouchableOpacity style={styles.thumbnailButton} onPress={handleChooseThumbnail}>
          <Text style={styles.thumbnailButtonText}>Choose Thumbnail</Text>
        </TouchableOpacity>

        {/* Show the selected thumbnail */}
        <View style={styles.selectedThumbnail}>
          {thumbnailUri ? (
            <Image source={{ uri: thumbnailUri }} style={styles.selectedThumbnail} />
          ) : (
            <Text style={styles.noThumbnailText}>No thumbnail selected</Text>
          )}
        </View>

        {/* Add Exercise Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>

      {/* Reusable Modal for upload progress */}
      <UploadProgressModal
        isVisible={isUploading}
        progress={uploadProgress}
      />

    </SafeAreaView>
  );
};

export default AddExerciseScreen;
