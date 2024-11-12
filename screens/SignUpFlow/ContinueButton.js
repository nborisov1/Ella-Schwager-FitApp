import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ContinueButton = ({ onPress, disabled }) => {
  return (
    <TouchableOpacity
      style={[styles.button, !disabled && styles.buttonActive]}
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
    backgroundColor: '#F0C300',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#DAA520',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default ContinueButton;
