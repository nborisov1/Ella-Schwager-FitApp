import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Button, RefreshControl } from 'react-native';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import WeekDays from './WeekDays';
import StatsCard from './StatsCard';
import fetchPersonalPlan from '../../backend/users/fetchPersonalPlan';  // Function to fetch the user's personal plan
import styles from './styles';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import ProfileHeader from './ProfileHeader'

dayjs.extend(isoWeek);

export default function ProfileScreen({ user }) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [weekDays, setWeekDays] = useState([]);
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [hasPersonalPlan, setHasPersonalPlan] = useState(false);  // To track if the user has a personal plan
  const [refreshing, setRefreshing] = useState(false);  // Refreshing state for pull-to-refresh
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

  // Function to load personal plan (used in both initial loading and refreshing)
  const loadPersonalPlan = async () => {
    try {
      const personalPlan = await fetchPersonalPlan(user.uid);
      if (personalPlan) {
        setHasPersonalPlan(true);
        const currentDay = currentDate.format('dddd');
        const workoutsForToday = personalPlan.filter(session => session.days.includes(currentDay));
        setTodayWorkouts(workoutsForToday);
      }
    } catch (error) {
      console.error('Error fetching personal plan:', error);
      setHasPersonalPlan(false);
    } finally {
      setLoading(false);
      setRefreshing(false);  // Stop the refreshing state after data is loaded
    }
  };

  // Initial data loading
  useEffect(() => {
    loadPersonalPlan();
  }, [currentDate, user.uid]);

  // Function to handle refresh action
  const onRefresh = () => {
    setRefreshing(true);
    loadPersonalPlan();  // Reload the personal plan data
  };

  const handlePress = (session) => {
    navigation.navigate('ExerciseList', {
      title: session.sessionName,
      exercises: session.exerciseList,  // Pass the exercise list to ExerciseListScreen
      days: session.days,
      sessionId: session.id,
      userId: user.uid,
      commnet: session.commnet,
    });
  };

  const stats = {
    caloriesBurned: 1200,
    workoutsCompleted: 3,
    remainingWorkouts: 2,
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileHeader user={user}/>
      <WeekDays weekDays={weekDays} />
      <StatsCard stats={stats} />

      <View style={styles.todayWorkoutsContainer}>
        <Text style={styles.sectionTitle}>Today's Workouts</Text>
        <View style={styles.divider} />
      </View>
    </ScrollView>
  );
}
