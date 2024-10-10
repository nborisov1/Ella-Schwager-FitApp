import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import TrainingSessionCard from './TrainingSessionCrad/TrainingSessionCard';
import fetchPersonalPlan from '../../backend/users/fetchPersonalPlan';
import { RefreshControl } from 'react-native-gesture-handler';

const PersonalCoachScreen = ({ userData }) => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();  
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPersonalPlan().then(() => setRefreshing(false));
  }, []);

  const loadPersonalPlan = async () => {
    try {
      const sessions = await fetchPersonalPlan(userData.uid);
      setTrainingSessions(sessions);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching personal plan:', error);
    }
  };

  useEffect(() => {
    loadPersonalPlan();
  }, []);

  const handlePress = (session) => {
    navigation.navigate('ExerciseList', {
      title: session.sessionName,
      exercises: session.exerciseList,
      days: session.days,
      isSuperUser: false,
      sessionId: session.id,
      userId: userData.uid
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.headlineContainer, { paddingVertical: height * 0.02, paddingHorizontal: width * 0.05 }]}>
          <Text style={[styles.headlineText, { fontSize: width * 0.06 }]}>My Workouts</Text>
        </View>
        
        <ScrollView 
          contentContainerStyle={styles.sessionList}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
          {trainingSessions.map((session) => (
            <TrainingSessionCard 
              key={session.id}
              title={session.sessionName}
              exercises={session.exercises}
              imageUri={session.downloadURL}
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