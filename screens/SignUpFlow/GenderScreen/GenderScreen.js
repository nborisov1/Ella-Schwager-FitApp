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
      <ProgressBar currentStep={1} />
      <Text style={styles.title}>בחר את המין שלך</Text>

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
        <OptionButton
          icon="mars-stroke"
          label="א-בינארי"
          isSelected={selectedGender === 'Non-binary'}
          onPress={() => setSelectedGender('Non-binary')}
        />
      </View>

      <View style={styles.continueButtonContainer}>
        <ContinueButton onPress={handleContinue} disabled={!selectedGender} />
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 24,
  },
  optionsContainer: {
    justifyContent: 'center',
  },
  continueButtonContainer: {
    position: 'absolute',
    bottom: 20, // Position at the bottom with some spacing
    left: 0,
    right: 0,
    paddingHorizontal: 16,
  },
});
