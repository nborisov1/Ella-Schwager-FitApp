import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SpecialLabel = ({ label }) => {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{label}</Text>
    </View>
  );
};

export default SpecialLabel;

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: '#FFA500',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 8,
  },
  labelText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
