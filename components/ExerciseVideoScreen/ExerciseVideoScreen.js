import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert, RefreshControl} from 'react-native';
import Header from './Header';
import StartButton from './StartButton';
import ExerciseItem from './ExerciseItem';
import { fetchExerciseVideos } from '../../backend/trainingSession/fetchExerciseVideos';

const ExerciseVideoScreen = ({ route }) => {
  const { thumbnail, title, sessionId, exerciseId } = route.params;
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
            />
          </View>
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={styles.addButton.backgroundColor}/>}
        keyExtractor={item => item.id}
      />
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
  input: {
    backgroundColor: '#f0f0f0',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
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
