import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; // For gender icons
import styles from './styles';

const GenderScreen = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleContinue = () => {
    if (selectedGender) {
      const signUpData = { gender: selectedGender };
      navigation.navigate('Age', { signUpData });
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Tell Us About Yourself</Text>
      <Text style={styles.subtitle}>To give you a better experience and results, we need to know your gender</Text>

      {/* Gender Options */}
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'Female' && styles.genderButtonSelected
          ]}
          onPress={() => handleGenderSelect('Female')}
        >
          <FontAwesome5 name="female" size={40} color={selectedGender === 'Female' ? '#fff' : '#000'} />
          <Text style={selectedGender === 'Female' ? styles.genderTextSelected : styles.genderText}>Female</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'Male' && styles.genderButtonSelected
          ]}
          onPress={() => handleGenderSelect('Male')}
        >
          <FontAwesome5 name="male" size={40} color={selectedGender === 'Male' ? '#fff' : '#000'} />
          <Text style={selectedGender === 'Male' ? styles.genderTextSelected : styles.genderText}>Male</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueButton, selectedGender && styles.continueButtonActive]}
        onPress={handleContinue}
        disabled={!selectedGender}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GenderScreen;
