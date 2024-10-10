import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, SafeAreaView, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addExerciseToGeneralSession, fetchExercisesForSession } from './backend';
import * as ImagePicker from 'expo-image-picker';
import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import UploadProgressModal from '../components/UploadProgressModal';  
import styles from './addExerciseStyle';

const AddExerciseScreen = ({ route }) => {
  const { sessionId, title, userData } = route.params;
  const [exercises, setExercises] = useState([]);
  const [newExerciseName, setNewExerciseName] = useState('');
  const [thumbnailUri, setThumbnailUri] = useState('');  
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [isUploading, setIsUploading] = useState(false); 
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
      setIsUploading(true); 
      await addExerciseToGeneralSession(sessionId, { name: newExerciseName, thumbnail: thumbnailUri }, 
        (progress) => {
          setUploadProgress(progress); 
        }, 
        async (error, downloadURL) => {
          if (error) {
            console.error("Upload failed", error);
          } else {
            const exercise = { name: newExerciseName, thumbnail: downloadURL }
            const exerciseRef = doc(collection(db, `trainingSessions/${sessionId}/exercises`));
            await setDoc(exerciseRef, exercise);
            setNewExerciseName('');  
            setThumbnailUri('');  
            setIsUploading(false); 
            loadExercises();  
          }
      });
    } catch (error) {
      console.error('Error adding exercise:', error);
      setIsUploading(false); 
    }
  };

  const handleExercisePress = (exercise) => {
    navigation.navigate('ExerciseVideoScreen', {
      title: exercise.name,
      thumbnail: exercise.thumbnail,
      exerciseId: exercise.id,
      sessionId: sessionId,
      isSuperUser: userData.role == 'Admin'
    });
  };

  const handleChooseThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,  
      aspect: [4, 3],        
      quality: 1,            
    });
    if (!result.cancelled) {
      setThumbnailUri(result.assets[0].uri);  
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>{title} Exercises</Text>

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

      <View style={styles.addExerciseContainer}>
        <TextInput
          style={styles.input}
          placeholder="Exercise Name"
          value={newExerciseName}
          onChangeText={setNewExerciseName}
          placeholderTextColor="#888"
        />

        <TouchableOpacity style={styles.thumbnailButton} onPress={handleChooseThumbnail}>
          <Text style={styles.thumbnailButtonText}>Choose Thumbnail</Text>
        </TouchableOpacity>

        <View style={styles.selectedThumbnail}>
          {thumbnailUri ? (
            <Image source={{ uri: thumbnailUri }} style={styles.selectedThumbnail} />
          ) : (
            <Text style={styles.noThumbnailText}>No thumbnail selected</Text>
          )}
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>

      <UploadProgressModal
        isVisible={isUploading}
        progress={uploadProgress}
      />

    </SafeAreaView>
  );
};

export default AddExerciseScreen;
