import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import TrainingSessionCard from '../../PersonalCoachScreen/TrainingSessionCrad/TrainingSessionCard'; // Import the TrainingSessionCard component
import fetchPersonalPlan from '../../../backend/users/fetchPersonalPlan'; // Import your existing fetchPersonalPlan function
import styles from './styles';

const UserDetailScreen = ({ route, navigation }) => {
  const { user } = route.params; // Get user data passed through navigation
  const [personalPlan, setPersonalPlan] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // Add refreshing state

  const handlePress = (session) => {
    navigation.navigate('ExerciseList', {
      title: session.title,
      exercises: session.exerciseList,
      days: session.days,
      isSuperUser: true,
      sessionId: session.id,
      userId: user.id
    });
  };

  useEffect(() => {
    navigation.setOptions({ title: user.fullName || 'Unnamed User' });

    if (user.hasPersonalPlan) {
      loadPersonalPlan();
    }
  }, [navigation, user.name, user.hasPersonalPlan]);

  const loadPersonalPlan = async () => {
    try {
      const fetchedPlan = await fetchPersonalPlan(user.id);
      setPersonalPlan(fetchedPlan);
    } catch (error) {
      console.error('Error fetching personal plan:', error);
    }
  };

  // Handle the pull-down-to-refresh action
  const onRefresh = async () => {
    if (!user.hasPersonalPlan) return;
    
    setRefreshing(true);
    await loadPersonalPlan();
    setRefreshing(false);
  };

  const renderTrainingSession = ({ item }) => (
    <TrainingSessionCard 
      key={item.id}
      title={item.title}
      exercises={item.exercises}
      imageUri={item.thumbnailUrl}
      days={item.days}
      onPress={() => handlePress(item)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.detail}>Email: {user.email || 'No email provided'}</Text>
      <Text style={styles.detail}>Age: {user.age || 'Age not specified'}</Text>

      {user.hasPersonalPlan && personalPlan.length > 0 ? (
        <FlatList
          data={personalPlan}
          keyExtractor={(item) => item.id}
          renderItem={renderTrainingSession}
          contentContainerStyle={styles.trainingSessionList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4CAF50']}  // Color for Android
              tintColor="#4CAF50"   // Color for iOS
            />
          }
        />
      ) : user.hasPersonalPlan ? (
        <Text style={styles.loadingText}>Loading personal plan...</Text>
      ) : null}
    </View>
  );
};

export default UserDetailScreen;
