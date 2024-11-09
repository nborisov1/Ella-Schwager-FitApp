import React, { useState } from 'react';
import { View, FlatList, Text, SafeAreaView, TextInput } from 'react-native';
import MediumWorkoutCard from './cards/MediumWorkoutCard';
import styles from './cards/styles';

const MediumWorkoutScreen = ({ route }) => {
  const { workouts, title } = route.params; // Retrieve workouts passed from ParentComponent
  const [searchQuery, setSearchQuery] = useState('');

  // Filter workouts based on the search query
  const filteredWorkouts = workouts.filter((workout) =>
    workout.workoutName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            }}
            onPress={() => console.log(`Navigate to ${item.workoutName}`)}
            onToggleLike={() => console.log(`Toggle like for ${item.workoutName}`)}
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
