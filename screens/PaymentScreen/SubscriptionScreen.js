import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import VideoHeader from './components/VideoHeader';
import SubscriptionCard from './components/SubscriptionCard';
import CouponInput from './components/CouponInput';
import PaymentButton from './components/PaymentButton';

const SubscriptionScreen = () => {
  const handlePlayPress = () => {
    // Code to play video
  };

  const handleRedeem = () => {
    // Code for redeeming coupon
  };

  const handlePayment = () => {
    // Code to proceed to payment
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <VideoHeader onPlayPress={handlePlayPress} />

      <Text style={styles.headerText}>הצטרפו למהפכת הכושר שלנו!</Text>
      <Text style={styles.description}>
        הירשם לתוכנית שלנו ושפרו חווית כושר רוויה
      </Text>

      <SubscriptionCard
        title="תוכנית בסיסית"
        price="199$"
        pricePeriod="לחודש"
        features={['אימון ליבה', 'צוות מומחים']}
        subtitle="למתחילים"
      />
      <SubscriptionCard
        title="תוכנית סטנדרטית"
        price="199$"
        pricePeriod="לחודש"
        features={['ספריה מורחבת', 'הורד מדריכים']}
        subtitle="לעלייה ברמה"
      />
      <SubscriptionCard
        title="תוכנית פרימיום"
        price="200$"
        pricePeriod="לשנה"
        features={['גישה מוגבלת', 'אימון תזונה']}
        subtitle="למקצוענים"
        highlighted
      />

      <CouponInput onRedeem={handleRedeem} />
      <PaymentButton onPress={handlePayment} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
});

export default SubscriptionScreen;
