import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Footer = ({ coupons }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [message, setMessage] = useState('');
  const handleRedeem = () => {
    if (coupons && promoCode.toLocaleLowerCase() in coupons) {
      const discountValue = coupons[promoCode.toLocaleLowerCase()];
      setDiscount(discountValue);
      setMessage(`ההנחה שלך: ${discountValue}%`);
    } else {
      setDiscount(0);
      setMessage('קוד הקידום שהוזן אינו תקף');
    }
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
        <TouchableOpacity style={styles.promoButton} onPress={handleRedeem}>
          <Text style={styles.promoButtonText}>לפדות</Text>
        </TouchableOpacity>
      </View>

      {message && (
        <Text style={discount > 0 ? styles.discountText : styles.errorText}>
          {message}
        </Text>
      )}

      <TouchableOpacity style={styles.redeemButton}>
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
    marginBottom: 30,
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
    marginLeft: 12,
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
  discountText: {
    fontSize: 16,
    color: '#00BFFF',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 16,
  },
  redeemButton: {
    backgroundColor: '#DAA520',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 16,
  },
  redeemButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
