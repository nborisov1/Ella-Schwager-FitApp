import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import WeekDays from './WeekDays';
import StatsCard from './StatsCard';
import WorkoutCard from '../cards/WorkoutCard';
import styles from './styles';
import ProfileHeader from './ProfileHeader';
dayjs.extend(isoWeek);

export default function ProfileScreen() {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [weekDays, setWeekDays] = useState([]);

  // Sample workout data for today
  const [todayWorkouts, setTodayWorkouts] = useState([
    { name: 'Morning Run', duration: 30, type: 'Cardio', watched: 10, total: 30, image: 'https://www.auraleisure.ie/wp-content/uploads/2023/03/john-arano-h4i9G-de7Po-unsplash-1-scaled.jpg' },
    { name: 'Strength Training', duration: 45, type: 'Strength', watched: 20, total: 45, image: 'https://www.auraleisure.ie/wp-content/uploads/2023/03/john-arano-h4i9G-de7Po-unsplash-1-scaled.jpg' },

  ]);

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

  const stats = {
    caloriesBurned: 1200,
    workoutsCompleted: 3,
    remainingWorkouts: 2,
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader/>
      <WeekDays weekDays={weekDays} />
      <StatsCard stats={stats} />

      {/* Improved Headline for Today's Workouts */}
      <View style={styles.todayWorkoutsContainer}>
        <Text style={styles.sectionTitle}>Today's Workouts</Text>
        <View style={styles.divider} />
        {todayWorkouts.map((workout, index) => (
          <WorkoutCard key={index} workout={workout} />
        ))}
      </View>
    </ScrollView>
  );
}
