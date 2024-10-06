import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Button, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import TrainingSessionCard from '../screens/PersonalCoachScreen/TrainingSessionCrad/TrainingSessionCard';
import { fetchTrainingSessions, createTrainingSessionInSessionCollection } from './backend';
import styles from './styles'; // Import styles

const AddTrainingSessionScreen = () => {
  const [sessionName, setSessionName] = useState(''); // State for the new session name
  const [thumbnailUri, setThumbnailUri] = useState(''); // State for the new session thumbnail URI
  const [trainingSessions, setTrainingSessions] = useState([]); // State to hold the fetched training sessions
  const [loading, setLoading] = useState(true); // Loading state for fetching sessions
  const navigation = useNavigation(); // Initialize navigation

  // Load the existing training sessions from Firebase when the component mounts
  useEffect(() => {
    loadTrainingSessions();
  }, []);

  const loadTrainingSessions = async () => {
    try {
      const sessions = await fetchTrainingSessions(); // Fetch the sessions from Firebase
      setTrainingSessions(sessions);
    } catch (error) {
      console.error('Error fetching training sessions:', error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  // Function to handle creating a new training session
  const handleCreateSession = async () => {
    if (!sessionName) {
      alert('Please provide a name and a thumbnail for the training session.');
      return;
    }

    try {
      await createTrainingSessionInSessionCollection(sessionName, thumbnailUri); // Function to create a session in Firebase
      setSessionName(''); // Reset session name
      setThumbnailUri(''); // Reset thumbnail URI
      loadTrainingSessions(); // Reload sessions to reflect the newly created one
    } catch (error) {
      console.error('Error creating training session:', error);
      alert('Failed to create training session. Please try again.');
    }
  };

  // Render each training session as a card
  const renderTrainingSession = ({ item }) => (
      <TrainingSessionCard 
        key={item.id}
        title={item.title}
        exercises={item.exercises.length}
        imageUri={item.thumbnailUrl}
        onPress={() => navigation.navigate('AddExerciseScreen', { sessionId: item.id, title: item.title })}
      />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Create New Training Session Section */}
      <Text style={styles.heading}>Create New Training Session</Text>
      <TextInput
        placeholder="Training Session Name"
        value={sessionName}
        onChangeText={setSessionName}
        style={styles.input}
      />
      <TouchableOpacity>
        <View style={styles.thumbnailContainer}>
          {thumbnailUri ? (
            <Image source={{ uri: thumbnailUri }} style={styles.thumbnail} />
          ) : (
            <Text style={styles.thumbnailPlaceholder}>Pick a Thumbnail</Text>
          )}
        </View>
      </TouchableOpacity>
      <Button title="Create Training Session" onPress={handleCreateSession} />

      {/* Existing Training Sessions List */}
      <Text style={styles.subHeading}>Existing Training Sessions</Text>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={trainingSessions}
          keyExtractor={(item) => item.id}
          renderItem={renderTrainingSession}
          contentContainerStyle={styles.trainingSessionList}
        />
      )}
    </SafeAreaView>
  );
};

export default AddTrainingSessionScreen;
