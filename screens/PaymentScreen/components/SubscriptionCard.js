import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PricingLabel from './PricingLabel';
import BenefitsList from './BenefitsList';

const SubscriptionCard = ({ title, price, duration, benefits, buttonLabel, isRecommended, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]} // Change color if selected
      onPress={onSelect}
    >
      {/* Recommended Label */}
      {isRecommended && (
        <View style={styles.recommendedLabel}>
          <Text style={styles.recommendedLabelText}>🔥 הכי מומלץ</Text>
        </View>
      )}

      {/* Container for splitting left and right sections */}
      <View style={styles.contentContainer}>
        {/* Left Side: Benefits List with Title */}
        <View style={styles.leftContainer}>
          <Text style={styles.benefitsTitle}>את תקבלי</Text>
          <BenefitsList benefits={benefits} />
        </View>

        {/* Right Side: Title, Pricing, Decorative Text */}
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{title}</Text>
          <PricingLabel price={price} duration={duration} />
          <Text style={styles.decorativeLabel}>{buttonLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SubscriptionCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    elevation: 2,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F0C300',
  },
  selectedCard: {
    borderColor: '#FFA500', // Highlight color for selected card
    backgroundColor: '#FFF9E5', // Optional light background
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 10,
  },
  leftContainer: {
    flex: 1,
    paddingRight: 8,
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  benefitsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
  },
  decorativeLabel: {
    fontSize: 14,
    color: '#DAA520',
    marginTop: 8,
  },
  recommendedLabel: {
    position: 'absolute',
    top: -15,
    right: 10,
    backgroundColor: '#FFA500',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 3,
  },
  recommendedLabelText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
