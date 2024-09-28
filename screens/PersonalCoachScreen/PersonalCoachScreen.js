import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import styles from './styles';
import TrainingSessionCard from './TrainingSessionCrad/TrainingSessionCard';
import fetchPersonalPlan from '../../backend/users/fetchPersonalPlan';
import createTrainingSession from '../../backend/personalPlan/createTrainingSession';
import { RefreshControl } from 'react-native-gesture-handler';

const PersonalCoachScreen = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();  
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const sessionData = {
    title: 'Leg Day',
    days: ['Monday', 'Thursday'],
    exercises: [
      {
        exerciseId: 'exercise001',
        name: 'Squats',
        sets: 3,
        reps: 12,
        weight: 100
      },
      {
        exerciseId: 'exercise002',
        name: 'Leg Press',
        sets: 4,
        reps: 8,
        weight: 150
      }
    ],
    thumbnail: 'https://images.pexels.com/photos/4775202/pexels-photo-4775202.jpeg?auto=compress&cs=tinysrgb&w=600' // Assuming imageFile is the file selected by the user
  };
  
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPersonalPlan().then(() => setRefreshing(false));
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  const loadPersonalPlan = async () => {
    try {
      //await createTrainingSession('5tKW9r0Et0WiFIWRINs4rcmqj4d2', sessionData);
      const sessions = await fetchPersonalPlan('5tKW9r0Et0WiFIWRINs4rcmqj4d2');
      setTrainingSessions(sessions);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching personal plan:', error);
    }
  };

  useEffect(() => {
    loadPersonalPlan();
  }, []);

  const handlePress = (session) => {
    navigation.navigate('ExerciseList', {
      title: session.title,
      exercises: session.exerciseList
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container} >
        {/* Headline Section */}
        <View style={[styles.headlineContainer, { paddingVertical: height * 0.02, paddingHorizontal: width * 0.05 }]}>
          <Text style={[styles.headlineText, { fontSize: width * 0.06 }]}>My Workouts</Text>
        </View>
        
        {/* Training Sessions List */}
        <ScrollView contentContainerStyle={styles.sessionList} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
          {trainingSessions.map((session) => (
            <TrainingSessionCard 
              key={session.id}
              title={session.title}
              exercises={session.exercises}
              imageUri={session.thumbnailUrl}
              days={session.days}
              onPress={() => handlePress(session)}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalCoachScreen;
