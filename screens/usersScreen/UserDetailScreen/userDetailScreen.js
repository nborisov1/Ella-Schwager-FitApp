import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import TrainingSessionCard from '../../PersonalCoachScreen/TrainingSessionCrad/TrainingSessionCard'; // Import the TrainingSessionCard component
import fetchPersonalPlan from '../../../backend/users/fetchPersonalPlan'; // Import your existing fetchPersonalPlan function
import styles from './styles';

const UserDetailScreen = ({ route, navigation }) => {
  const { user } = route.params; // Get user data passed through navigation
  const [personalPlan, setPersonalPlan] = useState([]);

  const handlePress = (session) => {
    navigation.navigate('ExerciseList', {
      title: session.title,
      exercises: session.exerciseList
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
        />
      ) : user.hasPersonalPlan ? (
        <Text style={styles.loadingText}>Loading personal plan...</Text>
      ) : null}
    </View>
  );
};

export default UserDetailScreen;
