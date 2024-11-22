import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PricingLabel = ({ price, duration }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>
        {price} ₪ / <Text style={styles.duration}>{duration}</Text>
      </Text>
    </View>
  );
};

export default PricingLabel;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  price: {
    fontSize: 22,
    color: '#DAA520',
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 16,
  },
});
