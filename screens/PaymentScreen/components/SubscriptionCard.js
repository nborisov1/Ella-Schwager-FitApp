import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PricingLabel from './PricingLabel';
import BenefitsList from './BenefitsList';
import SpecialLabel from './SpecialLabel';

const SubscriptionCard = ({ title, price, duration, benefits, buttonLabel, isRecommended }) => {
  return (
    <View style={styles.card}>
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
    </View>
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
  contentContainer: {
    flexDirection: 'row', // Keeps the Hebrew layout RTL (Title on the right)
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingRight: 10,
  },
  leftContainer: {
    flex: 1,
    paddingRight: 8, // Spacing between left and right containers
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    paddingLeft: 8, // Spacing between left and right containers
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
    top: -15, // Moved higher for better prominence
    right: 10, // Still providing some space from the right edge
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
