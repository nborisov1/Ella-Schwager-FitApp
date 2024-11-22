import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const WeekDays = ({ weekDays }) => {
  const renderDay = (day, index) => (
    <View key={index} style={styles.dayContainer}>
      <Text style={styles.dayText}>{day.dayName}</Text>
      <View style={[styles.dateCircle, day.isToday && styles.highlight]}>
        <Text style={day.isToday ? styles.dateTextHighlight : styles.dateText}>
          {day.dateNumber}
        </Text>
      </View>
    </View>
  );

  return <View style={styles.weekContainer}>{weekDays.map((day, index) => renderDay(day, index))}</View>;
};

export default WeekDays;
