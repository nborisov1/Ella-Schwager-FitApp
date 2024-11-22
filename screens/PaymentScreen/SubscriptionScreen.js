import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SubscriptionCard from './components/SubscriptionCard';
import Footer from './components/Footer';

const SubscriptionScreen = ({ route }) => {
  const { plans, headerTitle, headerDescription, coupons } = route.params;
  const [selectedPlan, setSelectedPlan] = useState(null); // Keep track of the selected plan
  const [discount, setDiscount] = useState(0); // Track the discount from the coupon

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  const handleRedeemCoupon = (discountValue) => {
    setDiscount(discountValue); // Update the discount from the Footer
  };

  const handlePayment = async () => {
    const finalPrice = (selectedPlan.price * (1 - discount / 100)).toFixed(2);
    console.log('finalPrice = ',finalPrice);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.videoThumbnailContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/300' }} // Placeholder for the video thumbnail
              style={styles.videoThumbnail}
            />
            <View style={styles.playButtonOverlay}>
              <Text style={styles.playButton}>▶</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{headerTitle || '!הצטרפו למהפכת הכושר שלנו'}</Text>
          <Text style={styles.headerDescription}>
            {headerDescription || 'הרשמו לתוכנית שלנו ושפרו חווית כושר נוספת עם תוכניות מותאמות אישית ליכולות ולמוטיבציה האישית שלכם!'}
          </Text>
        </View>

        {/* Subscription Cards */}
        {plans.map((plan, index) => (
          <SubscriptionCard
            key={index}
            {...plan}
            isSelected={selectedPlan?.title === plan.title} // Highlight selected plan
            onSelect={() => handleSelectPlan(plan)} // Set selected plan
          />
        ))}

        {/* Footer Section */}
        <Footer
        coupons={coupons}
        onRedeem={handleRedeemCoupon} // Handle coupon redemption
        onPay={handlePayment} // Trigger payment
      />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    marginBottom: 20,
  },
  videoThumbnailContainer: {
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  videoThumbnail: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  playButtonOverlay: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 10,
  },
  playButton: {
    color: '#FFF',
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 16,
  },
  payButton: {
    backgroundColor: '#F0C300',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    opacity: 0.5, // Disabled style
  },
  payButtonActive: {
    opacity: 1, // Active button style
  },
  payButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
