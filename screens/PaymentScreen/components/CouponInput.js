import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';

const CouponInput = ({ onRedeem }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>יש לך קוד קידום?</Text>
      <TextInput
        style={styles.input}
        placeholder="הוסף קוד כאן..."
        textAlign={I18nManager.isRTL ? 'right' : 'left'}
      />
      <TouchableOpacity style={styles.button} onPress={onRedeem}>
        <Text style={styles.buttonText}>לפתות</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    flex: 1,
    marginHorizontal: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#FFCC00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default CouponInput;
