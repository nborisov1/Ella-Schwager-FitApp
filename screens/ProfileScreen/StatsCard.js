import React from 'react';
import { View, Text } from 'react-native';
import CircularProgress from './CircularProgress';
import styles from './styles';

const StatsCard = ({ stats }) => {
  const totalWorkouts = stats.workoutsCompleted + stats.remainingWorkouts;
  const percentageCompleted = (stats.workoutsCompleted / totalWorkouts) * 100;

  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsText}>Workout Summary:</Text>
      <View style={styles.indicatorContainer}>
        <CircularProgress percentage={percentageCompleted} />
      </View>
      <Text style={styles.statsText}>Calories Burned This Week: {stats.caloriesBurned}</Text>
    </View>
  );
};

export default StatsCard;
