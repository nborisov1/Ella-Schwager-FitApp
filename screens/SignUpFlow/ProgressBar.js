import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProgressBar = ({ currentStep }) => {
  return (
    <View style={styles.progressBar}>
      <Text style={styles.progressText}>שלב {currentStep} מתוך {7}</Text>
      <View style={styles.progressLine}>
        <View style={[styles.progressIndicator, { width: `${(currentStep / 7) * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  progressText: {
    color: '#000',
    fontSize: 16,
  },
  progressLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#D3D3D3',
    marginTop: 4,
  },
  progressIndicator: {
    height: 2,
    backgroundColor: '#e1b97b',
  },
});

export default ProgressBar;
