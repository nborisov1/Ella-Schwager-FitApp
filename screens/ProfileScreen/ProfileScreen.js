import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import WeekDays from './WeekDays';
import StatsCard from './StatsCard';
import TrainingSessionCard from '../PersonalCoachScreen/TrainingSessionCrad/TrainingSessionCard'; // Import the TrainingSessionCard
import fetchPersonalPlan from '../../backend/users/fetchPersonalPlan';  // Function to fetch the user's personal plan
import styles from './styles';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import ProfileHeader from './ProfileHeader'

dayjs.extend(isoWeek);

export default function ProfileScreen({ user }) {
  userId = '5tKW9r0Et0WiFIWRINs4rcmqj4d2'
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [weekDays, setWeekDays] = useState([]);
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [hasPersonalPlan, setHasPersonalPlan] = useState(false);  // To track if the user has a personal plan
  const navigation = useNavigation();  // Initialize navigation

  useEffect(() => {
    const startOfWeek = currentDate.startOf('isoWeek');
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = startOfWeek.add(i, 'day');
      days.push({
        dayName: date.format('ddd'),
        dateNumber: date.format('D'),
        isToday: date.isSame(currentDate, 'day'),
      });
    }

    setWeekDays(days);
  }, [currentDate]);

  // Load personal plan for the user
  useEffect(() => {
    const loadPersonalPlan = async () => {
      try {
        const personalPlan = await fetchPersonalPlan(userId);
        const currentDay = currentDate.format('dddd');

        const workoutsForToday = personalPlan.filter(session => session.days.includes(currentDay));

        setTodayWorkouts(workoutsForToday);
        setHasPersonalPlan(true);
      } catch (error) {
        console.error('Error fetching personal plan:', error);
        setHasPersonalPlan(false);
      } finally {
        setLoading(false);
      }
    };

    loadPersonalPlan();
  }, [currentDate, userId]);

  const handlePress = (session) => {
    navigation.navigate('ExerciseList', {
      title: session.title,
      exercises: session.exerciseList,  // Pass the exercise list to ExerciseListScreen
      days: session.days,
      sessionId: session.id,
      userId: userId
    });
  };

  const stats = {
    caloriesBurned: 1200,
    workoutsCompleted: 3,
    remainingWorkouts: 2,
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader user={user}/>
      <WeekDays weekDays={weekDays} />
      <StatsCard stats={stats} />

      <View style={styles.todayWorkoutsContainer}>
        <Text style={styles.sectionTitle}>Today's Workouts</Text>
        <View style={styles.divider} />

        {loading ? (
          <Text>Loading workouts...</Text>
        ) : hasPersonalPlan && todayWorkouts.length > 0 ? (
          todayWorkouts.map((session, index) => (
            <TrainingSessionCard
              key={index}
              title={session.title}
              exercises={session.exerciseList.length}  // Count of exercises in the session
              imageUri={session.thumbnailUrl}  // Assuming each session has a thumbnail
              days={session.days}  // Pass the days for the session
              onPress={() => handlePress(session)}  // Handle navigation on press
            />
          ))
        ) : hasPersonalPlan ? (
          <Text>No workouts scheduled for today!</Text>
        ) : (
          <View style={styles.noPlanCard}>
            <Text style={styles.noPlanText}>You don't have a personal plan yet!</Text>
            <Button title="Purchase a Plan" onPress={() => {/* Handle purchasing plan */}} />
          </View>
        )}
      </View>
    </ScrollView>
  );
}
