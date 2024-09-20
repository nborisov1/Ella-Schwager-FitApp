import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

import styles from './styles';

const PaymentScreen = ({ route, navigation }) => {
  const { workoutId } = route.params;

  const handlePayment = () => {
    // Here you can implement the actual payment process
    // For now, we can assume the payment is successful and redirect the user
    Alert.alert("Payment Successful", "You can now access this workout!");

    // After payment, you can navigate back or to the workout details screen
    navigation.navigate('Workouts');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paymentTitle}>Payment for Workout {workoutId}</Text>
      {/* Implement your payment logic or form here */}
      <Button title="Pay Now" onPress={handlePayment} />
    </View>
  );
};

export default PaymentScreen;
