import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from './ProgressBar';
import ContinueButton from './ContinueButton';

const WeightScreen = ({ navigation, route }) => {
  const [weight, setweight] = useState(''); // Initialize weight input as an empty string
  const { signUpData } = route.params;
  const handleContinue = () => {
    const updatedData = { ...signUpData, weight: parseFloat(weight), unit: 'cm'  }; // Add selected age to sign-up data
    navigation.navigate('Height', { signUpData: updatedData});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar currentStep={3}/>
      <Text style={styles.title}>מה המשקל שלך?</Text>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* Input Field in the center */}
      <View style={styles.centerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setweight}
            placeholder="0"
            keyboardType="numeric" // Shows the numeric keyboard on iOS
            maxLength={3} // Limit the input length as necessary
          />
        </View>
        <Text style={styles.unitText}>kg</Text>
      </View>
      </TouchableWithoutFeedback>
      <ContinueButton onPress={handleContinue} disabled={!weight} />
    </SafeAreaView>
  );
};

export default WeightScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 24,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e1b97b',
    width: '100%',
  },
  unitText: {
    fontSize: 24,
    color: '#333',
    marginLeft: 8,
  },
  continueButton: {
    backgroundColor: '#DAA520',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
});
