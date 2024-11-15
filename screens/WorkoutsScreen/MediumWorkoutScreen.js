import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView, TextInput } from 'react-native';
import MediumWorkoutCard from './cards/MediumWorkoutCard';
import styles from './cards/styles';
import { useNavigation } from '@react-navigation/native';
import { getUserLikedSessions, toggleLikeSession } from '../../backend/userController';

const MediumWorkoutScreen = ({ route }) => {
  const { workouts: initialWorkouts, title, user, onPaymentPress } = route.params; // Retrieve workouts passed from ParentComponent
  const [workouts, setWorkouts] = useState(initialWorkouts); // Local copy of workouts to handle liked status
  const [likedSessionIds, setLikedSessionIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  console.log(workouts);
  useEffect(() => {
    const loadUserLikedSessions = async () => {
      if (user) {
        try {
          const likedIds = await getUserLikedSessions(user.uid);
          setLikedSessionIds(likedIds);
        } catch (error) {
          console.error('Error fetching liked sessions:', error);
        }
      }
    };
    loadUserLikedSessions();
  }, [user]);

  useEffect(() => {
    // Update workouts with liked status based on likedSessionIds
    const updatedWorkouts = initialWorkouts.map((workout) => ({
      ...workout,
      liked: likedSessionIds.includes(workout.id),
    }));
    setWorkouts(updatedWorkouts);
  }, [likedSessionIds, initialWorkouts]);

  const handleToggleLike = async (sessionId) => {
    try {
      console.log(sessionId);
      console.log(user.uid);
      const updatedLikedSessions = await toggleLikeSession(user.uid, sessionId, likedSessionIds);
      setLikedSessionIds(updatedLikedSessions); // Update likedSessionIds to trigger re-render with new liked status
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  // Filter workouts based on the search query
  const filteredWorkouts = workouts.filter((workout) =>
    workout.workoutName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePress = (workout) => {
    navigation.navigate('ExerciseList', {
      title: workout.title,
      exercises: workout.videos,
      sessionId: workout.id,
      thumbnail: workout.thumbnailURL,
      description: workout.subtitle,
      totalDuration: workout.totalTime,
      isGeneralWorkout: true,
    });
  };

  if (!workouts || workouts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No Workouts Available</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{title ? title : 'האימונים שלנו'}</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="חפש אימון"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Workout List */}
      <FlatList
        data={filteredWorkouts}
        renderItem={({ item }) => (
          <MediumWorkoutCard
            workout={{
              title: item.workoutMediumName,
              image: item.thumbnailURL,
              place: item.place,
              level: item.level,
              description: item.subtitle,
              totalTime: item.totalDuration,
              videos: item.videos ? item.videos.length : 0,
              liked: item.liked || false,
              isUnlocked: user.unlockAll ? user.unlockAll : item.isUnlocked,
            }}
            onPress={() => handlePress(item)}
            onToggleLike={() => handleToggleLike(item.id)} // Pass toggle like function
            onPaymentPress={() => onPaymentPress()}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 20 }}
      />
    </SafeAreaView>
  );
};

export default MediumWorkoutScreen;
