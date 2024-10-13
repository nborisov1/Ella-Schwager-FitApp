import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import WorkoutCard from '../cards/WorkoutCard';
import styles from '../cards/styles';
import { fetchWorkoutVideos, addVideoToGeneralWorkout } from '../../backend/generalWorkouts/generalWorkoutController';
import { pickVideo } from '../../media/mediaPicker';  // Assuming these functions exist
import { formatDuration } from '../../utils/utils';

const WorkoutDetailScreen = ({ route }) => {
  const { workout } = route.params;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [refreshing, setRefreshing] = useState(false);  // New state for refreshing

  // Fetch workout videos when component mounts
  const loadWorkoutVideos = async () => {
    try {
      const fetchedVideos = await fetchWorkoutVideos(workout.id);
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Error fetching workout videos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkoutVideos();
  }, [workout.id]);

  // Refresh control handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadWorkoutVideos().then(() => setRefreshing(false));  // Stop refreshing after loading
  }, []);

  const handleAddVideo = async () => {
    try {
      // Pick a video
      const videoResult = await pickVideo();
      if (!videoResult.success) {
        Alert.alert('Error', 'Failed to pick video');
        return;
      }
      const videoData = {
        videoURI: videoResult.result.assets[0].uri,
        name: 'New Workout Video',
        duration: videoResult.result.assets[0].duration,
      };

      setUploading(true);

      // Upload the video and update Firestore
      await addVideoToGeneralWorkout(workout.id, videoData);

      // Refetch videos after adding the new one
      const updatedVideos = await fetchWorkoutVideos(workout.id);
      setVideos(updatedVideos);

      setUploading(false);
      Alert.alert('Success', 'Video added successfully');
    } catch (error) {
      console.error('Error adding video:', error);
      setUploading(false);
      Alert.alert('Error', 'Failed to add video');
    }
  };

  if (loading && !uploading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading workout videos...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {videos.map((video, index) => (
        <WorkoutCard
          key={index}
          workout={{
            name: video.name,
            duration: formatDuration(video.duration),
            type: video.type || 'Video',
            watched: video.watched || 0,
            total: formatDuration(video.duration),
            image: video.thumbnailURL,
          }}
        />
      ))}

      {/* Conditionally render "Add Video" button for super users */}
      {workout.isSuperUser && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddVideo}>
          <Text style={styles.addButtonText}>{uploading ? `Uploading: ${uploadProgress}%` : 'Add Video'}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default WorkoutDetailScreen;
