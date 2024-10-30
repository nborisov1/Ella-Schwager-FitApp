import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import WorkoutCard from '../cards/WorkoutCard';
import styles from '../cards/styles';
import { fetchWorkoutVideos } from '../../backend/generalWorkouts/generalWorkoutController';
import { formatDuration } from '../../utils/utils';

const WorkoutDetailScreen = ({ route }) => {
  const { workout } = route.params;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
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

  if (loading) {
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
    </ScrollView>
  );
};

export default WorkoutDetailScreen;
