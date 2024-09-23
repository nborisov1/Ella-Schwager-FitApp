import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles';

const PhysicalActivityScreen = ({ navigation, route }) => {
  const { signUpData } = route.params;
  const [selectedLevel, setSelectedLevel] = useState(null);  // Track selected level

  // Handle continue
  const handleContinue = () => {
    const updatedData = { ...signUpData, activityLevel: selectedLevel };
    navigation.navigate('Account', { signUpData: updatedData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centeredContent}>
        {/* Title and Subtitle */}
        <Text style={styles.title}>Physical Activity Level?</Text>
        <Text style={styles.subtitle}>
          Choose your regular activity level. This will help us to personalize plans for you.
        </Text>

        {/* Activity Level Options */}
        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Beginner' && styles.levelButtonSelected,
          ]}
          onPress={() => setSelectedLevel('Beginner')}
        >
          <Text style={styles.levelText}>Beginner</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Intermediate' && styles.levelButtonSelected,
          ]}
          onPress={() => setSelectedLevel('Intermediate')}
        >
          <Text style={styles.levelText}>Intermediate</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Advanced' && styles.levelButtonSelected,
          ]}
          onPress={() => setSelectedLevel('Advanced')}
        >
          <Text style={styles.levelText}>Advanced</Text>
        </TouchableOpacity>

        {/* Back and Continue Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.continueButton, { opacity: selectedLevel ? 1 : 0.5 }]}
            onPress={handleContinue}
            disabled={!selectedLevel}  // Disable continue if no selection
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PhysicalActivityScreen;
