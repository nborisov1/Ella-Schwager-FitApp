import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ContinueButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button, 
        disabled ? styles.disabledButton : styles.buttonActive
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>להמשיך</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    backgroundColor: '#FFF5E1',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#DAA520', // Black border
    borderWidth: 1,       // Border thickness
  },
  disabledButton: {
    marginTop: 32,
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    borderColor: '#DAA520', // Black border
    borderWidth: 1,       // Border thickness
  },
  buttonActive: {
    backgroundColor: '#e1b97b',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ContinueButton;
