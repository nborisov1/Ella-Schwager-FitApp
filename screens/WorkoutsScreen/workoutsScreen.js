import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, FlatList, ActivityIndicator, RefreshControl, TextInput, TouchableOpacity } from 'react-native';
import WorkoutPlanCard from './cards/WorkoutPlanCard';
import styles from '../cards/styles';
import { fetchGeneralWorkouts, fetchUserUnlockedWorkouts } from '../../backend/generalWorkouts/generalWorkoutController';
import { formatDuration } from '../../utils/utils';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SmallWorkoutCard from './cards/SmallWorkoutCard';
import { useNavigation } from '@react-navigation/native';

const WorkoutsScreen = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [unlockedWorkoutIds, setUnlockedWorkoutIds] = useState([]);
  const [unlockAll, setUnlockAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();


  const handleShowAllWorkouts = (allRelevantWorkouts, title) => {
    navigation.navigate('AllWorkouts', { workouts: allRelevantWorkouts, title: title });
  }
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

  const filteredWorkouts = workouts.filter(workout =>
    workout.workoutName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserUnlockedWorkouts();
    loadWorkouts().then(() => setRefreshing(false));
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>האימונים שלנו 🔥</Text>
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
      <ScrollView
        style={styles.workoutList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 60 }} // Add padding to the bottom
      >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>אימונים שאהבתי</Text>
        <TouchableOpacity onPress={() => handleShowAllWorkouts(filteredWorkouts, 'אימונים שאהבתי')}>
          <Text style={styles.viewAllButton}>להציג את הכל</Text>
        </TouchableOpacity>
      </View>
        {filteredWorkouts.slice(0, 3).map((workout, index) => {
          const isUnlocked = unlockAll || unlockedWorkoutIds.includes(workout.id);
          return (
            <WorkoutPlanCard
              key={index}
              workout={{
                title: workout.workoutName,
                subtitle: workout.subtitle,
                videos: workout.videos,
                totalTime: workout.totalDuration || '',
                isUnlocked: isUnlocked,
                image: workout.thumbnailURL,
                id: workout.id,
                place: workout.place,
                level: workout.level,
              }}
            />
          );
        })}

        {/* All Available Workouts Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>כל האימונים הזמינים</Text>
          <TouchableOpacity onPress={() => handleShowAllWorkouts(filteredWorkouts)}>
            <Text style={styles.viewAllButton}>להציג את הכל</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={filteredWorkouts}
          renderItem={({ item }) => (
            <SmallWorkoutCard
              workout={{
                title: item.workoutShortName,
                image: item.thumbnailURL,
                label: item.label,
              }}
              onPress={() => console.log(`Navigate to ${item.title}`)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalList}
        />
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>אימונים פופולריים</Text>
          <TouchableOpacity onPress={() => handleShowAllWorkouts(filteredWorkouts, 'אימונים פופולריים')}>
            <Text style={styles.viewAllButton}>להציג את הכל</Text>
          </TouchableOpacity>
      </View>
      {filteredWorkouts.slice(0, 3).map((workout, index) => {
        const isUnlocked = unlockAll || unlockedWorkoutIds.includes(workout.id);
        return (
          <WorkoutPlanCard
            key={index}
            workout={{
              title: workout.workoutName,
              subtitle: workout.subtitle,
              videos: workout.videos,
              totalTime: workout.totalDuration || '',
              isUnlocked: isUnlocked,
              image: workout.thumbnailURL,
              id: workout.id,
              place: workout.place,
              level: workout.level,
            }}
          />
        );
      })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutsScreen;
