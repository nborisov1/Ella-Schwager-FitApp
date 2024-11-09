import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SubscriptionCard = ({ title, price, pricePeriod, features }) => {
  return (
    <View style={styles.card}>
      {/* Top Row: Title and Price Information */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.pricePeriod}>{pricePeriod}</Text>
        </View>
      </View>

      {/* Subtitle and Feature List */}
      <View style={styles.featuresContainer}>
        <Text style={styles.subtitle}>אתה תקבל</Text>
        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.checkmark}>✔</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#e3f2f9',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF9900',
    textAlign: 'right',
  },
  pricePeriod: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
  featuresContainer: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginBottom: 5,
  },
  features: {
    alignItems: 'flex-end',
  },
  featureRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkmark: {
    fontSize: 12,
    color: 'green',
    marginLeft: 6,
  },
  featureText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'right',
  },
});

export default SubscriptionCard;
