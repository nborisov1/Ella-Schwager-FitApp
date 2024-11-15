import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, TextInput } from 'react-native';
import styles from './styles';  // Update this to match the new styles
import fetchPersonalPlan from '../../backend/users/fetchPersonalPlan';
import { RefreshControl } from 'react-native-gesture-handler';
import { translateDayToHebrew } from '../../utils/utils';
import { fetchPlans } from '../../backend/generalWorkouts/generalWorkoutController';
import SubscriptionScreen from '../PaymentScreen/SubscriptionScreen';
import WorkoutPlanCard from '../WorkoutsScreen/cards/WorkoutPlanCard';
import { fetchGeneralWorkouts } from '../../backend/generalWorkouts/generalWorkoutController';
import { useNavigation } from '@react-navigation/native';
import NoLikedWorkoutsCard from '../WorkoutsScreen/cards/NoLikeWorkoutsCard';

const PersonalCoachScreen = ({ userData }) => {
  const { width, height } = Dimensions.get('window');
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');  // State to manage the search input
  const [subscriptionData, setSubscriptionData] = useState(null); // State for subscription data
  const [generalWorkouts, setGeneralWorkouts] = useState([]);
  const navigation = useNavigation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPersonalPlan().then(() => setRefreshing(false));
  }, []);

  const loadPersonalPlan = async () => {
    try {
      console.log('state = ', userData.state);
      if (userData.state === 'beginner' || !userData.state) {
        const subscriptionResult = await fetchPlans('personalPlan');
        setSubscriptionData(subscriptionResult);
        setTrainingSessions(null);
        setFilteredSessions(null); // Initially set filtered sessions to all sessions
      } else if (userData.state === 'personalCoach') {
        const sessions = await fetchPersonalPlan(userData.uid);
        if (sessions && sessions.length > 0) {
          // Personal plan exists
          setTrainingSessions(sessions);
          setFilteredSessions(sessions); // Initially set filtered sessions to all sessions
          setSubscriptionData(null);
        } else {
          // No personal plan, fetch general workouts
          const generalWorkoutResults = await fetchGeneralWorkouts();
          setGeneralWorkouts(generalWorkoutResults.slice(0, 7)); // Limit to 3 general workouts
          setSubscriptionData(null);
        }
      } else if (userData.state === 'personalCoachBuilding') {
        const generalWorkoutResults = await fetchGeneralWorkouts();
        setGeneralWorkouts(generalWorkoutResults.slice(0, 7)); // Limit to 3 general workouts
        setTrainingSessions(null);
        setFilteredSessions(null); // Initially set filtered sessions to all sessions
        setSubscriptionData(null);
      } else {
        const subscriptionResult = await fetchPlans('personalPlan');
        setSubscriptionData(subscriptionResult);
        setTrainingSessions(null);
        setFilteredSessions(null); // Initially set filtered sessions to all sessions
      }
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
      exercises: session.exerciseList || session.videos,
      days: session.days,
      sessionId: session.id,
      userId: userData.uid,
      comment: session.comment,
      thumbnail: session.downloadURL || session.thumbnailURL,
      description: session.description,
      totalDuration: session.totalDuration,
      isGeneralWorkout: false,
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  // If the user is a beginner, show the subscription screen instead of personal plan screen
  if (subscriptionData) {
    console.log(subscriptionData);
    return (
      <SafeAreaView style={styles.safeArea}>
        <SubscriptionScreen
          route={{
            params: {
              plans: subscriptionData.plans,
              headerTitle: subscriptionData.headerTitle,
              headerDescription: subscriptionData.headerDescription,
              coupons: subscriptionData.coupons,
            }
          }}
        />
      </SafeAreaView>
    );
  }

  if (userData.state === 'personalCoachBuilding' && generalWorkouts.length > 0) {
    // Render the screen for personalCoachBuilding with a header and all general workouts
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={[styles.headlineContainer, { paddingVertical: height * 0.01 }]}>
            <Text style={[styles.headlineText, { fontSize: width * 0.06 }]}>התוכנית שלי</Text>
          </View>

          <Text style={styles.premiumText}>
            אתה כעת חבר פרימיום
          </Text>
          <Text style={styles.subPremiumText}>
          נסה את האימונים הכלליים שלנו עד שאנחנו מכינים תוכנית אימונים בדיוק בשבילך!
          </Text>
          
          <Text style={[styles.subheaderText, { fontSize: width * 0.05, fontWeight: 'bold' }]}>אימונים כללים</Text>
          <ScrollView contentContainerStyle={styles.generalWorkoutsList}>
            {generalWorkouts.map((workout, index) => (
              <WorkoutPlanCard
                key={index}
                workout={{
                  title: workout.workoutName,
                  subtitle: workout.subtitle,
                  videos: workout.videos,
                  totalTime: workout.totalDuration || null,
                  isUnlocked: true,
                  image: workout.thumbnailURL,
                  id: workout.id,
                  place: workout.place,
                  level: workout.level,
                  liked: workout.liked ? true : false,
                }}
                onPress={() => handlePress(workout)}
              />
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={[styles.headlineContainer, { paddingVertical: height * 0.02, paddingHorizontal: width * 0.01 }]}>
          <Text style={[styles.headlineText, { fontSize: width * 0.06 }]}>התוכנית שלי 🔥</Text>
        </View>

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
        >
          {filteredSessions.map((session, index) => (
            <WorkoutPlanCard
              key={index}
              workout={{
                title: session.sessionName,
                subtitle: session.subtitle,
                totalTime: session.totalDuration ? session.totalDuration : '',
                image: session.downloadURL,
                id: session.id,
                isUnlocked: true,
                videos: session.exerciseList,
                days: session.days,
              }}
              onPress={() => handlePress(session)}
            />  
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalCoachScreen;
