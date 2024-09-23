import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomPicker from '../../../utils/CustomPicker'; // Import the reusable picker component
import styles from '../AgeScreen/styles';

const HeightScreen = ({ navigation, route }) => {
  const { signUpData } = route.params;
  const [selectedHeightIndex, setSelectedHeightIndex] = useState(14); // Default index for height
  
  // Array of height values from 140cm to 220cm
  const heightList = Array.from({ length: 81 }, (_, i) => (140 + i).toString());

  const handleContinue = () => {
    const selectedHeight = heightList[selectedHeightIndex];
    const updatedData = { ...signUpData, height: selectedHeight }; // Add selected height to sign-up data
    navigation.navigate('Goals', { signUpData: updatedData });
  };

  return (
    <View style={styles.container}>
      {/* Title and Subtitle */}
      <Text style={styles.title}>How Tall Are You?</Text>
      <Text style={styles.subtitle}>Height in centimeters. This will help us to personalize an exercise program plan that suits you.</Text>

      {/* Height Picker */}
      <CustomPicker
        itemList={heightList}
        selectedItemIndex={selectedHeightIndex}
        setSelectedItemIndex={setSelectedHeightIndex}
      />

      {/* Back and Continue Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.continueButton, { opacity: selectedHeightIndex ? 1 : 0.5 }]}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeightScreen;
