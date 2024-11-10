import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView style={styles.container}>
      {/* Title */}
      <View style={styles.progressBar}>
        <Text style={styles.progressText}>שלב 1 מתוך 4</Text>
        <View style={styles.progressLine}>
          <View style={styles.progressIndicator} />
        </View>
      </View>
      <Text style={styles.title}>לבחור המין שלך</Text>

      {/* Centering Wrapper */}
      <View style={styles.centerWrapper}>
        {/* Gender Options */}
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === 'Female' && styles.genderOptionSelected
            ]}
            onPress={() => handleGenderSelect('Female')}
          >
            <FontAwesome5 name="venus" size={40} color="#DAA520" style={styles.genderIcon} />
            <Text style={[styles.genderText, selectedGender === 'Female' && styles.genderTextSelected]}>אשה</Text>
            {selectedGender === 'Female' && (
              <FontAwesome name="check-circle" size={24} color="#DAA520" style={styles.checkIcon} />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderOption,
              selectedGender === 'Male' && styles.genderOptionSelected
            ]}
            onPress={() => handleGenderSelect('Male')}
          >
            <FontAwesome5 name="mars" size={40} color="#DAA520" style={styles.genderIcon} />
            <Text style={[styles.genderText, selectedGender === 'Male' && styles.genderTextSelected]}>גבר</Text>
            {selectedGender === 'Male' && (
              <FontAwesome name="check-circle" size={24} color="#DAA520" style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        </View>
              {/* Continue Button */}
      <TouchableOpacity
        style={[styles.continueButton, selectedGender && styles.continueButtonActive]}
        onPress={handleContinue}
        disabled={!selectedGender}
      >
        <Text style={styles.continueButtonText}>להמשיך</Text>
      </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  progressText: {
    color: '#000',
    fontSize: 16,
  },
  progressLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#D3D3D3',
    marginTop: 4,
  },
  progressIndicator: {
    width: '25%',
    height: 2,
    backgroundColor: '#DAA520',
  },
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
  centerWrapper: {
    flex: 1,
    justifyContent: 'center', // Center the gender options vertically
  },
  genderContainer: {
    flexDirection: 'column',
    // Removed alignItems property to allow centering by the parent
  },
  genderOption: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DAA520',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    width: '100%',
  },
  genderOptionSelected: {
    backgroundColor: '#FFF5E1',
  },
  genderIcon: {
    marginLeft: 12,
  },
  genderText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'right',
    flex: 1,
  },
  genderTextSelected: {
    fontWeight: 'bold',
    color: '#333',
  },
  checkIcon: {
    marginLeft: 8,
  },
  continueButton: {
    marginTop: 32,
    backgroundColor: '#F0C300',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#DAA520',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
