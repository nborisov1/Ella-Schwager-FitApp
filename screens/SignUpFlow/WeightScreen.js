import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomPicker from '../../utils/CustomPicker'; // Import the reusable picker component
import styles from './AgeScreen/styles';

const WeightScreen = ({ navigation, route }) => {
  const { signUpData } = route.params;
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(25); // Default index for Weight
  
  // Array of weight values from 30 to 150
  const WeightList = Array.from({ length: 121 }, (_, i) => (30 + i).toString());

  const handleContinue = () => {
    const selectedWeight = WeightList[selectedWeightIndex];
    const updatedData = { ...signUpData, Weight: selectedWeight }; // Add selected Weight to sign-up data
    navigation.navigate('Height', { signUpData: updatedData });
  };

  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <Text style={styles.title}>Enter Your Weight</Text>
      <Text style={styles.subtitle}>Weight in centimeters. This will help us to personalize an exercise program plan that suits you.</Text>

      {/* Weight Picker */}
      <CustomPicker
        itemList={WeightList}
        selectedItemIndex={selectedWeightIndex}
        setSelectedItemIndex={setSelectedWeightIndex}
      />

      {/* Back and Continue Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.continueButton, { opacity: selectedWeightIndex ? 1 : 0.5 }]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WeightScreen;
