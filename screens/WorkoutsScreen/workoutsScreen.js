import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import WorkoutPlanCard from './cards/WorkoutPlanCard';
import styles from '../cards/styles';
import { useNavigation } from '@react-navigation/native';
import { fetchGeneralWorkouts, fetchUserUnlockedWorkouts } from '../../backend/generalWorkouts/generalWorkoutController';
import { formatDuration } from '../../utils/utils';

const WorkoutsScreen = ({ isSuperUser, user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);  // Track refresh state
  const [unlockedWorkoutIds, setUnlockedWorkoutIds] = useState([]);
  const [unlockAll, setUnlockAll] = useState(false);  // Track if all workouts are unlocked
  const navigation = useNavigation();

  // Fetch user unlocked workouts from Firestore
  const loadUserUnlockedWorkouts = async () => {
    if (user) {
      try {
        const { unlockedWorkoutIds, unlockAll } = await fetchUserUnlockedWorkouts(user.uid);
        setUnlockedWorkoutIds(unlockedWorkoutIds);
        setUnlockAll(unlockAll);
      } catch (error) {
        console.error('Error fetching user unlocked workouts:', error);
      }
    }
  };

  // Fetch general workouts from Firestore
  const loadWorkouts = async () => {
    try {
      const fetchedWorkouts = await fetchGeneralWorkouts();
      setWorkouts(fetchedWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);  // Stop loading after fetch completes
    }
  };

  useEffect(() => {
    loadUserUnlockedWorkouts();
    loadWorkouts();
  }, []);

  // Refresh Control Handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);  // Start refreshing
    loadUserUnlockedWorkouts();  // Refresh user data
    loadWorkouts().then(() => setRefreshing(false));  // Refetch and stop refreshing
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading Workouts...</Text>
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
      {workouts.map((workout, index) => {
        const isUnlocked = isSuperUser || unlockAll || unlockedWorkoutIds.includes(workout.id);  // Determine if workout is unlocked
        console.log(workout.id);
        return (
          <WorkoutPlanCard
            key={index}
            workout={{
              title: workout.workoutName,
              videos: workout.videos ? workout.videos.length : 0,  // Number of videos if available
              totalTime: formatDuration(workout.totalDuration || 0),  // Assuming totalTime is stored
              isUnlocked: isUnlocked,  // Set based on user's unlocked workouts
              image: workout.thumbnailURL,  // Use the fetched thumbnail URL
              id: workout.id,
              isSuperUser: isSuperUser
            }}
          />
        );
      })}

      {/* Conditionally render "Add Workout" button for super users */}
      {isSuperUser && (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddWorkout')}
        >
          <Text style={styles.addButtonText}>Add Workout</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default WorkoutsScreen;
