import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../ProgressBar';
import ContinueButton from '../ContinueButton';

const HeightScreen = ({ navigation, route }) => {
  const [height, setHeight] = useState(''); // Initialize height input as an empty string
  const { signUpData } = route.params;
  const handleContinue = () => {
    const updatedData = { ...signUpData, height: parseFloat(height), unit: 'cm' }; // Add selected age to sign-up data
    navigation.navigate('Goals', { signUpData: updatedData});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar currentStep={4} />
      <Text style={styles.title}>מה הגובה שלך?</Text>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {/* Input Field in the center */}
        <View style={styles.centerContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={height}
              onChangeText={setHeight}
              placeholder="0"
              keyboardType="numeric" // Shows the numeric keyboard on iOS
              maxLength={3} // Limit the input length as necessary
              returnKeyType="done" // Add "Done" button
            />
          </View>
          <Text style={styles.unitText}>cm</Text>
        </View>
      </TouchableWithoutFeedback>
      <ContinueButton onPress={handleContinue} disabled={!height} />
    </SafeAreaView>
  );
};

export default HeightScreen;

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
});
