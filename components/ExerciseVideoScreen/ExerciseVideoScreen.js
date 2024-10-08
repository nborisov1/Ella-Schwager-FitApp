import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import Header from './Header';
import StartButton from './StartButton';
import ExerciseItem from './ExerciseItem';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore'; 
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../config/firebase';
import { uploadVideo } from '../../backend/upload/thumbnials';
import { fetchExerciseVideos } from '../../backend/trainingSession/fetchExerciseVideos';
import { useEffect } from 'react';

function formatDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000); // Convert milliseconds to seconds
  const minutes = Math.floor(totalSeconds / 60); // Get total minutes
  const seconds = totalSeconds % 60; // Get remaining seconds
  
  // Format minutes and seconds into '1:35 min' format
  const formattedDuration = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} min`;
  
  return formattedDuration;
}

const ExerciseVideoScreen = ({ route }) => {
  const { thumbnail, title, isSuperUser, sessionId, exerciseId } = route.params;
  console.log("thumbnail",thumbnail);
  const [uploading, setUploading] = useState(false);
  const [videoName, setVideoName] = useState('');  // State for video name
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility for video name
  const [selectedVideoResult, setSelectedVideoResult] = useState(null);  // State for selected video URI
  const [uploadProgress, setUploadProgress] = useState(0);
  const [exercises, setExercises] = useState([]);
  // Example data
  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const exercisesVideos = await fetchExerciseVideos(sessionId, exerciseId); // Fetch the sessions from Firebase
      setExercises(exercisesVideos);
    } catch (error) {
      console.error('Error fetching training sessions:', error);
    } finally {
      //setLoading(false); // End loading state
    }
  };

  // Pick a video from the library
  const pickVideo = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        setSelectedVideoResult(result);
        setModalVisible(true); // Open modal to enter video name
      }
    } catch (error) {
      console.log('Error picking a video: ', error);
    }
  };

  const resetUploadingState = () => {
    setUploading(false); // Hide the modal when upload is complete
    setModalVisible(false); // Close modal after upload
    setVideoName('');
    setSelectedVideoResult(null);
    setUploadProgress(0);
  }

  const handleUpload = async () => {
    setUploading(true);
    await uploadVideo(selectedVideoResult.assets[0].uri,
      (progress) => {
        setUploadProgress(progress);
      }, 
      async (error, downloadURL, thumbnailUrl) => {
        if (error) {
          console.error("Upload failed", error);
          resetUploadingState();
        } else {
          const exerciseDocRef = doc(db, `trainingSessions/${sessionId}/exercises`, exerciseId);
          // Update only the videoURL field without overriding other data
          await updateDoc(exerciseDocRef, {
            videos: arrayUnion({
              name: videoName,
              videoURL: downloadURL,
              thumbnailURL: thumbnailUrl,
              duration: formatDuration(selectedVideoResult.assets[0].duration)
            })
          });
          resetUploadingState();
          loadExercises();
        }
    });
  }
  // Save video URL to Firestore

  return (
    <View style={styles.container}>
      {/* Header with image, title, and details */}
      <Header 
        imageSource={thumbnail}
        title={title}
      />
      
      {/* Start Workout Button */}
      <StartButton title="Start Workout" onPress={() => console.log('Workout Started')} />

      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseItem 
            title={item.name} 
            duration={item.duration} 
            image={item.thumbnailURL}
            videoUri={item.videoURL}
          />
        )}
        keyExtractor={item => item.id}
      />

      {/* Super User Add Video Button */}
      {isSuperUser && (
        <TouchableOpacity style={styles.addButton} onPress={pickVideo}>
          <Text style={styles.addButtonText}>{uploading ? 'Uploading...' : 'Add Video to Exercise'}</Text>
        </TouchableOpacity>
      )}

      {/* Modal for Entering Video Name */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(false), setVideoName(''),setSelectedVideoResult(null);}} 
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Video Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter video name"
              value={videoName}
              onChangeText={setVideoName}  // Update the video name
            />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleUpload}
              disabled={uploading}
            >
          <Text style={styles.uploadButtonText}>
            {uploading ? `Uploading: ${uploadProgress.toFixed(0)}%` : 'Upload Video'}
          </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton} onPress={() =>  {setModalVisible(false), setVideoName(''),setSelectedVideoResult(''),setUploading(false),setUploadProgress(0);}}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  roundText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
  },
  addButton: {
    backgroundColor: '#ff0',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    margin: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: '#ff0',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#f00',
    fontWeight: 'bold',
  },
});
export default ExerciseVideoScreen;
