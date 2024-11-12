import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../ProgressBar';
import OptionButton from '../OptionButton';
import ContinueButton from '../ContinueButton';

const GenderScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleContinue = () => {
    if (selectedGender) {
      const signUpData = { gender: selectedGender };
      navigation.navigate('Age', { signUpData });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar currentStep={1} totalSteps={4} />
      <Text style={styles.title}>לבחור המין שלך</Text>

      <View style={styles.optionsContainer}>
        <OptionButton
          icon="venus"
          label="אשה"
          isSelected={selectedGender === 'Female'}
          onPress={() => setSelectedGender('Female')}
        />
        <OptionButton
          icon="mars"
          label="גבר"
          isSelected={selectedGender === 'Male'}
          onPress={() => setSelectedGender('Male')}
        />
      </View>

      <ContinueButton onPress={handleContinue} disabled={!selectedGender} />
    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 24,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
