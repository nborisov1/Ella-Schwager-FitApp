import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addExerciseToGeneralSession, fetchExercisesForSession } from './backend';
import * as ImagePicker from 'expo-image-picker';
import styles from './addExerciseStyle';

const AddExerciseScreen = ({ route }) => {
  const { sessionId, title } = route.params;
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');  // State to hold thumbnail URI
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
      // Pass both the name and thumbnail to the backend
      console.log(thumbnailUri);
      await addExerciseToGeneralSession(sessionId, { name: newExerciseName, thumbnail: thumbnailUri });
      loadExercises();  // Reload the updated exercises
      setNewExerciseName('');  // Reset input fields
      setThumbnailUri('');  // Reset the thumbnail
    } catch (error) {
      console.error('Error adding exercise:', error);
    }
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseVideoScreen', { exercise });
  };

  // Open the image picker to select a thumbnail
  const handleChooseThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,   // Allows user to crop image
      aspect: [4, 3],        // Aspect ratio of the image
      quality: 1,            // Image quality (1 = max)
    });
    console.log("res = ",result.assets[0].uri);
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
    </SafeAreaView>
  );
};

export default AddExerciseScreen;
