import React, { useState, useEffect, useCallback } from 'react';
import { View, SafeAreaView, RefreshControl, TextInput, Button, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import TrainingSessionCard from '../screens/PersonalCoachScreen/TrainingSessionCrad/TrainingSessionCard';
import { fetchTrainingSessions, createTrainingSessionInSessionCollection } from './backend';
import styles from './styles'; // Import styles
import * as ImagePicker from 'expo-image-picker';
import UploadProgressModal from '../components/UploadProgressModal'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../config/firebase';

const AddTrainingSessionScreen = ({userData}) => {
  const [sessionName, setSessionName] = useState(''); // State for the new session name
  const [thumbnailUri, setThumbnailUri] = useState(''); // State for the new session thumbnail URI
  const [trainingSessions, setTrainingSessions] = useState([]); // State to hold the fetched training sessions
  const [loading, setLoading] = useState(true); // Loading state for fetching sessions
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigation = useNavigation(); // Initialize navigation
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadTrainingSessions().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    loadTrainingSessions();
  }, []);

  const loadTrainingSessions = async () => {
    try {
      const sessions = await fetchTrainingSessions(); // Fetch the sessions from Firebase
      setTrainingSessions(sessions);
    } catch (error) {
      console.error('Error fetching training sessions:', error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Function to handle creating a new training session
  const handleCreateSession = async () => {
    if (!sessionName || !thumbnailUri) {
      alert('Please provide a name and a thumbnail for the training session.');
      return;
    }

    try {
      setIsUploading(true); // Show the modal when uploading starts
      await createTrainingSessionInSessionCollection(thumbnailUri, 
        (progress) => {
          setUploadProgress(progress); // Update the progress in the state to reflect in the modal
        }, 
        async (error, downloadURL) => {
          if (error) {
            console.error("Upload failed", error);
          } else {
            console.log("Upload completed. File available at:", downloadURL);
            await addDoc(collection(db, `trainingSessions/`), {
              sessionName,
              downloadURL,
              exercises: [], // Initialize with empty exercises array
            });        
            setSessionName(''); // Reset session name
            setThumbnailUri(''); // Reset thumbnail URI
            setIsUploading(false); // Hide the modal when upload is complete
            loadTrainingSessions(); // Reload sessions to reflect the newly created one
          }
      });
    } catch (error) {
      console.error('Error creating training session:', error);
      alert('Failed to create training session. Please try again.');
      setIsUploading(false);
    }
  };

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

  // Render each training session as a card
  const renderTrainingSession = ({ item }) => (
      <TrainingSessionCard 
        key={item.id}
        title={item.sessionName}
        exercises={item.exercises.length}
        imageUri={item.downloadURL}
        onPress={() => navigation.navigate('AddExerciseScreen', { sessionId: item.id, title: item.sessionName, userData: userData })}
      />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Reusable Modal for upload progress */}
      <UploadProgressModal
        isVisible={isUploading}
        progress={uploadProgress}
      />
      {/* Create New Training Session Section */}
      <Text style={styles.heading}>Create New Training Session</Text>
      <TextInput
        placeholder="Training Session Name"
        value={sessionName}
        onChangeText={setSessionName}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleChooseThumbnail}>
        <View style={styles.thumbnailContainer}>
          {thumbnailUri ? (
            <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
          ) : (
            <Text style={styles.thumbnailPlaceholder}>Pick a Thumbnail</Text>
          )}
        </View>
      </TouchableOpacity>
      <Button title="Create Training Session" onPress={handleCreateSession} />

      {/* Existing Training Sessions List */}
      <Text style={styles.subHeading}>Existing Training Sessions</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={trainingSessions}
          keyExtractor={(item) => item.id}
          renderItem={renderTrainingSession}
          contentContainerStyle={styles.trainingSessionList}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>    
  );
};

export default AddTrainingSessionScreen;
