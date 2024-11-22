import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CTAButton = ({ label }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default CTAButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DAA520',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
