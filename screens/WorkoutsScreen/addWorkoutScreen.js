import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker'; // Using react-native-image-picker for simplicity
import styles from './styles';

const AddWorkoutScreen = ({ navigation }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  // Function to pick an image for the thumbnail
  const pickThumbnail = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel || response.errorCode) {
        console.log('User canceled or an error occurred');
      } else {
        setThumbnail(response.assets[0].uri); // Handle the selected image
      }
    });
  };

  // Function to pick a video
  const pickVideo = () => {
    launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (response.didCancel || response.errorCode) {
        console.log('User canceled or an error occurred');
      } else {
        setVideo(response.assets[0].uri); // Handle the selected video
      }
    });
  };

  // Simulate workout save
  const handleAddWorkout = () => {
    if (workoutName && thumbnail && video) {
      alert('Workout Added!');
      // Here you would handle the workout addition logic
      navigation.goBack();
    } else {
      alert('Please fill out all fields');
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
      <TouchableOpacity style={styles.button} onPress={pickThumbnail}>
        <Text style={styles.buttonText}>Select Thumbnail</Text>
      </TouchableOpacity>
      {thumbnail && <Image source={{ uri: thumbnail }} style={styles.thumbnailPreview} />}

      {/* Add Video */}
      <Text style={styles.label}>Video</Text>
      <TouchableOpacity style={styles.button} onPress={pickVideo}>
        <Text style={styles.buttonText}>Select Video</Text>
      </TouchableOpacity>
      {video && <Text style={styles.videoPreview}>Video added: {video.split('/').pop()}</Text>}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleAddWorkout}>
        <Text style={styles.submitButtonText}>Add Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddWorkoutScreen;
