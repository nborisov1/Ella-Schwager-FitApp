import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const BenefitsList = ({ benefits }) => {
  return (
    <View style={styles.container}>
      {benefits.map((benefit, index) => (
        <View key={index} style={styles.benefitItem}>
          <FontAwesome name="check" size={14} color="green" style={styles.icon} />
          <Text style={styles.benefitText}>{benefit}</Text>
        </View>
      ))}
    </View>
  );
};

export default BenefitsList;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  benefitItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginVertical: 2, // Reduced spacing to make the list more compact
  },
  icon: {
    marginLeft: 6, // Reduced spacing to make the checkmark feel less dominant
  },
  benefitText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'right',
  },
});
