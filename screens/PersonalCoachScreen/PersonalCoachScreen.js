import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';  // Update this to match the new styles
import TrainingSessionCard from './TrainingSessionCrad/TrainingSessionCard';
import fetchPersonalPlan from '../../backend/users/fetchPersonalPlan';
import { RefreshControl } from 'react-native-gesture-handler';

const PersonalCoachScreen = ({ userData }) => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();  
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);  // State for filtered sessions
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');  // State to manage the search input

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPersonalPlan().then(() => setRefreshing(false));
  }, []);

  const loadPersonalPlan = async () => {
    try {
      const sessions = await fetchPersonalPlan(userData.uid);
      setTrainingSessions(sessions);
      setFilteredSessions(sessions);  // Initially set filtered sessions to all sessions
      setLoading(false);
    } catch (error) {
      console.error('Error fetching personal plan:', error);
    }
  };

  useEffect(() => {
    loadPersonalPlan();
  }, []);

  // Handle the search input and filter sessions
  const handleSearch = (text) => {
    setSearchText(text);
    
    // Filter sessions based on session name or days
    const filtered = trainingSessions.filter(session => {
      const sessionNameMatch = session.sessionName.toLowerCase().includes(text.toLowerCase());
      const daysMatch = session.days.some(day => translateDayToHebrew(day).includes(text));
      return sessionNameMatch || daysMatch;
    });

    setFilteredSessions(filtered);
  };

  const handlePress = (session) => {
    navigation.navigate('ExerciseList', {
      title: session.sessionName,
      exercises: session.exerciseList,
      days: session.days,
      isSuperUser: false,
      sessionId: session.id,
      userId: userData.uid,
      commnet: session.commnet,
      thumbnail: session.downloadURL,
      description: session.description
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
        <View style={[styles.headlineContainer, { paddingVertical: height * 0.02, paddingHorizontal: width * 0.01 }]}>
          <Text style={[styles.headlineText, { fontSize: width * 0.06 }]}>התוכנית שלי</Text>
        </View>

        {/* Search Box */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="חפש לפי יום או שם אימון"
            placeholderTextColor="#999"
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        <ScrollView 
          contentContainerStyle={styles.sessionList}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          style={{ direction: 'rtl' }}  // Ensure content direction is RTL
          >
          {/* Display filtered sessions */}
          {filteredSessions.map((session) => (
            <TrainingSessionCard 
              key={session.id}
              title={session.sessionName}
              exercises={session.exercises}
              imageUri={session.downloadURL}
              days={session.days}
              onPress={() => handlePress(session)}
              subtitle={session.subtitle}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalCoachScreen;
