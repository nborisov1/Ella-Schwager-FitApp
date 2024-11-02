import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, FlatList, ActivityIndicator, RefreshControl, TextInput } from 'react-native';
import WorkoutPlanCard from './cards/WorkoutPlanCard';
import styles from '../cards/styles';
import { fetchGeneralWorkouts, fetchUserUnlockedWorkouts } from '../../backend/generalWorkouts/generalWorkoutController';
import { formatDuration } from '../../utils/utils';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SmallWorkoutCard from './cards/SmallWorkoutCard';
const WorkoutsScreen = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [unlockedWorkoutIds, setUnlockedWorkoutIds] = useState([]);
  const [unlockAll, setUnlockAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

    // Filter workouts based on search query
    const filteredWorkouts = workouts.filter(workout =>
      workout.workoutName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
  // Fetch general workouts from Firestore
  const loadWorkouts = async () => {
    try {
      const fetchedWorkouts = await fetchGeneralWorkouts();
      setWorkouts(fetchedWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserUnlockedWorkouts();
    loadWorkouts();
  }, []);

  // Refresh Control Handler
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserUnlockedWorkouts();
    loadWorkouts().then(() => setRefreshing(false));
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
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🔥 אימון כללי</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FontAwesome name="sliders" size={20} color="#888" style={styles.filterIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="חיפוש אימון"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome name="search" size={18} color="#888" style={styles.searchIcon} />
      </View>

      {/* Workouts List */}
      {/* Popular Workouts Section */}
      <Text style={styles.sectionTitle}>אימונים פופולריים</Text>
      <ScrollView
        style={styles.workoutList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {filteredWorkouts.map((workout, index) => {
          const isUnlocked = unlockAll || unlockedWorkoutIds.includes(workout.id);
          return (
            <WorkoutPlanCard
              key={index}
              workout={{
                title: workout.workoutName,
                subtitle: workout.subtitle,
                videos: workout.videos ? workout.videos.length : 0,
                totalTime: formatDuration(workout.totalDuration || 0),
                isUnlocked: isUnlocked,
                image: workout.thumbnailURL,
                id: workout.id,
                place: workout.place,
                level: workout.level,
              }}
            />
          );
        })}
        {/* Horizontal Workout List */}
        <Text style={styles.sectionTitle}>כל האימונים הזמינים</Text>
        <FlatList
          horizontal
          data={filteredWorkouts}
          renderItem={({ item }) => (
            <SmallWorkoutCard
              workout={{
                title: item.workoutShortName,
                image: item.thumbnailURL,
                label: item.label, // Assuming each workout has a label
              }}
              onPress={() => console.log(`Navigate to ${item.title}`)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutsScreen;
