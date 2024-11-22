import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

const OptionButton = ({ icon, iconType = 'FontAwesome5', label, isSelected, onPress }) => {
  const IconComponent = iconType === 'FontAwesome5' ? FontAwesome5 : FontAwesome;

  return (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
      onPress={onPress}
    >
      <IconComponent name={icon} size={24} color="#DAA520" style={styles.icon} />
      <Text style={[styles.label, isSelected && styles.labelSelected]}>{label}</Text>
      {isSelected && <FontAwesome name="check-circle" size={24} color="#DAA520" style={styles.checkIcon} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DAA520',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    width: '100%',
  },
  optionButtonSelected: {
    backgroundColor: '#FFF5E1',
  },
  icon: {
    marginLeft: 12,
  },
  label: {
    fontSize: 18,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  labelSelected: {
    fontWeight: 'bold',
    color: '#333',
  },
  checkIcon: {
    marginLeft: 8,
  },
});

export default OptionButton;
