import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Footer = () => {
  const [promoCode, setPromoCode] = useState('');

  const handleRedeem = () => {
    // Add logic for redeeming the promotion code
    console.log('Promo code entered:', promoCode);
  };

  return (
    <View style={styles.footerContainer}>
      <Text style={styles.footerTitle}>יש לך קוד קידום?</Text>

      <View style={styles.promoContainer}>
        <TextInput
          style={styles.promoInput}
          placeholder="הכנס קוד כאן..."
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity style={styles.promoButton}>
          <Text style={styles.promoButtonText}>לפדות</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.redeemButton} onPress={handleRedeem}>
        <Text style={styles.redeemButtonText}>הוסף לתשלום</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footerContainer: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderTopWidth: 1,
    borderColor: '#D3D3D3',
    marginTop: 20,
    marginBottom: 30, // Additional margin to provide space at the bottom of the screen
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginBottom: 12,
  },
  promoContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DAA520',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FFF',
    textAlign: 'right',
    marginLeft: 12, // Increased margin between TextInput and promoButton
  },
  promoButton: {
    backgroundColor: '#F0C300',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  promoButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  redeemButton: {
    backgroundColor: '#DAA520',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16, // Space between the promo section and redeem button
    marginBottom: 20, // Additional space at the bottom of the button
  },
  redeemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
