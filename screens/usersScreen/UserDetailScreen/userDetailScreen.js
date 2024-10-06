import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, Button, SafeAreaView } from 'react-native';
import TrainingSessionCard from '../../PersonalCoachScreen/TrainingSessionCrad/TrainingSessionCard'; 
import fetchTrainingSessions from '../../../backend/users/fetchTrainingSessions';
import addSessionToUserPersonalPlan from '../../../backend/personalPlan/addSessionToUserPersonalPlan';  
import fetchPersonalPlan from '../../../backend/users/fetchPersonalPlan';  
import styles from './styles';

const UserDetailScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [personalPlan, setPersonalPlan] = useState([]);  // Store the user's personal plan
  const [trainingSessions, setTrainingSessions] = useState([]);  // Store available training sessions
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);  // Loading state for fetching data
  const [personalPlanLoading, setPersonalPlanLoading] = useState(true);  // Loading state for personal plan

  useEffect(() => {
    navigation.setOptions({ title: user.fullName || 'Unnamed User' });
    
    if (user.hasPersonalPlan) {
      loadPersonalPlan();
    } else {
      setPersonalPlanLoading(false);  // If no plan, stop loading
    }
  }, [navigation, user]);

  const loadPersonalPlan = async () => {
    try {
      const fetchedPlan = await fetchPersonalPlan(user.id);  // Fetch the user's personal plan
      setPersonalPlan(fetchedPlan);  // Update state with fetched plan
    } catch (error) {
      console.error('Error loading personal plan:', error);
    } finally {
      setPersonalPlanLoading(false);  // Stop loading after fetching the plan
    }
  };

  const loadTrainingSessions = async () => {
    try {
      const sessions = await fetchTrainingSessions();  // Fetch all available training sessions
      setTrainingSessions(sessions);  // Update state with fetched sessions
    } catch (error) {
      console.error('Error fetching training sessions:', error);
    } finally {
      setLoading(false);  // Stop loading after fetching sessions
    }
  };

  const handleAddSession = async (sessionId) => {
    try {
      const selectedSession = trainingSessions.find(session => session.id === sessionId);
      await addSessionToUserPersonalPlan(user.id, selectedSession);  // Add session to user's personal plan
      loadPersonalPlan();  // Reload personal plan to reflect added session
      setModalVisible(false);  // Close modal after adding the session
    } catch (error) {
      console.error('Error adding session to user personal plan:', error);
    }
  };

  const filteredSessions = trainingSessions.filter(session =>
    session.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const openAddSessionModal = async () => {
    setModalVisible(true);
    await loadTrainingSessions();  // Fetch training sessions when opening the modal
  };

  const renderTrainingSession = ({ item }) => (
    <View style={styles.sessionRow}>
      <Text style={styles.sessionTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.addButtonContainer} onPress={() => handleAddSession(item.id)}>
        <Text style={styles.addButton}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.detail}>Email: {user.email || 'No email provided'}</Text>
      <Text style={styles.detail}>Age: {user.age || 'Age not specified'}</Text>

      {/* Add Session Button */}
      <TouchableOpacity style={styles.addSessionButton} onPress={openAddSessionModal}>
        <Text style={styles.addSessionText}>Add Training Session</Text>
      </TouchableOpacity>

      {/* Modal for displaying and adding sessions */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Sessions"
              value={searchText}
              onChangeText={setSearchText}
            />

            {loading ? (
              <Text style={styles.loadingText}>Loading sessions...</Text>
            ) : (
              <FlatList
                data={filteredSessions}
                keyExtractor={(item) => item.id}
                renderItem={renderTrainingSession}
                contentContainerStyle={styles.trainingSessionList}
              />
            )}

            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Display User's Personal Plan */}
      {personalPlanLoading ? (
        <Text style={styles.loadingText}>Loading personal plan...</Text>
      ) : personalPlan.length > 0 ? (
        <FlatList
          data={personalPlan}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TrainingSessionCard
              key={item.id}
              title={item.title}
              exercises={item.exercises}
              imageUri={item.thumbnailUrl}
              days={item.days}
              onPress={() =>
                navigation.navigate('ExerciseList', {
                  title: item.title,
                  exercises: item.exerciseList,
                  days: item.days,
                  isSuperUser: true,
                  sessionId: item.id,
                  userId: user.id
                })
              }
            />
          )}
          contentContainerStyle={styles.trainingSessionList}
        />
      ) : (
        <Text style={styles.noPlanText}>No personal plan available</Text>
      )}
    </View>
  );
};

export default UserDetailScreen;
