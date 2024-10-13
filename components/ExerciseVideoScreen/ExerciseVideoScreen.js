import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Alert, RefreshControl} from 'react-native';
import Header from './Header';
import StartButton from './StartButton';
import ExerciseItem from './ExerciseItem';
import * as ImagePicker from 'expo-image-picker';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'; 
import { db } from '../../config/firebase';
import { uploadVideo } from '../../backend/upload/thumbnials';
import { fetchExerciseVideos } from '../../backend/trainingSession/fetchExerciseVideos';
import { deleteVideo } from '../../backend/upload/thumbnials';
import { pickVideo } from '../../media/mediaPicker';

function formatDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000); 
  const minutes = Math.floor(totalSeconds / 60); 
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} min`;
}

const ExerciseVideoScreen = ({ route }) => {
  const { thumbnail, title, isSuperUser, sessionId, exerciseId } = route.params;
  const [uploading, setUploading] = useState(false);
  const [videoName, setVideoName] = useState('');  // State for video name
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility for video name
  const [selectedVideoResult, setSelectedVideoResult] = useState(null);  // State for selected video URI
  const [uploadProgress, setUploadProgress] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadExercises().then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = async () => {
    try {
      const exercisesVideos = await fetchExerciseVideos(sessionId, exerciseId);
      setExercises(exercisesVideos);
    } catch (error) {
      console.error('Error fetching training sessions:', error);
    }
  };

  const handlePickVideo = async () => {
    const result = await pickVideo();
    if (result.success) {
      setSelectedVideoResult(result.result);  // Set the selected video URI
    } else {
      console.log('No video was selected or an error occurred');
    }
  };

  const resetUploadingState = () => {
    setUploading(false);
    setModalVisible(false);
    setVideoName('');
    setSelectedVideoResult(null);
    setUploadProgress(0);
  };

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
  };

  const handleDeleteVide = async (video) => {
    try {
      await deleteVideo(video);
      loadExercises();
    } catch (error) {
      console.error('Error deleting video:', error);
      Alert.alert('Error', 'Failed to delete the video. Please try again.');
    }
  }

  const handleDeleteVideo = (video) => {
    Alert.alert(
      'Delete Video',
      `Are you sure you want to delete ${video.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => handleDeleteVide(video),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Header imageSource={thumbnail} title={title} />
      
      <StartButton title="Start Workout" onPress={() => console.log('Workout Started')} />

      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ExerciseItem 
              item={item}
              handleDelete={handleDeleteVideo}
              isSuperUser={isSuperUser}
            />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={styles.addButton.backgroundColor}/>}
        keyExtractor={item => item.id}
      />

      {isSuperUser && (
        <TouchableOpacity style={styles.addButton} onPress={handlePickVideo}>
          <Text style={styles.addButtonText}>{uploading ? 'Uploading...' : 'Add Video to Exercise'}</Text>
        </TouchableOpacity>
      )}

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
              onChangeText={setVideoName}  
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
              style={styles.cancelButton} 
              onPress={() =>  {setModalVisible(false), setVideoName(''),setSelectedVideoResult(null), setUploading(false), setUploadProgress(0);}}>
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
  cardContainer: {
    position: 'relative',
    marginBottom: 15,
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
