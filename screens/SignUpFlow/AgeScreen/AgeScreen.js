import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Picker from '@uynguyen505/react-native-wheel-picker'
import styles from './styles';
import CustomPicker from '../../../utils/CustomPicker';

const PickerItem = Picker.Item;

const AgeScreen = ({ navigation, route }) => {
  const { signUpData } = route.params;
  const [selectedAgeIndex, setSelectedAgeIndex] = useState(14); // Default to age 32 (index 14)
  
  // Array of age values from 18 to 100
  const ageList = Array.from({ length: 83 }, (_, i) => (i + 18).toString());

  const handleContinue = () => {
    const selectedAge = ageList[selectedAgeIndex];
    const updatedData = { ...signUpData, age: selectedAge }; // Add selected age to sign-up data
    navigation.navigate('Weight', { signUpData: updatedData });
  };

  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <Text style={styles.title}>How Old Are You?</Text>
      <Text style={styles.subtitle}>Age in years. This will help us to personalize an exercise program plan that suits you.</Text>

      {/* Age Picker */}
      <CustomPicker
        itemList={ageList}
        selectedItemIndex={selectedAgeIndex}
        setSelectedItemIndex={setSelectedAgeIndex}
      />

      {/* Back and Continue Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.continueButton, { opacity: selectedAgeIndex ? 1 : 0.5 }]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AgeScreen;