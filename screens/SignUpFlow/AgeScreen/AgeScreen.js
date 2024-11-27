import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../ProgressBar';
import ContinueButton from '../ContinueButton';

const AgeScreen = ({ navigation, route }) => {
  const [age, setAge] = useState(''); // Initialize height input as an empty string
  const { signUpData } = route.params;
  const handleContinue = () => {
    const updatedData = { ...signUpData, age: parseInt(age) }; // Add selected age to sign-up data
    navigation.navigate('Weight', { signUpData: updatedData });  
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar currentStep={2}/>
      <Text style={styles.title}>מה הגיל שלך?</Text>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* Input Field in the center */}
      <View style={styles.centerContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="0"
            keyboardType="numeric" // Shows the numeric keyboard on iOS
            maxLength={2} // Limit the input length as necessary
              />
        </View>
      </View>
      </TouchableWithoutFeedback>
      <ContinueButton onPress={handleContinue} disabled={!age} />
    </SafeAreaView>
  );
};

export default AgeScreen;

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
