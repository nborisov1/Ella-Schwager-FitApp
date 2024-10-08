import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const StartButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ff0',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default StartButton;