import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../ProgressBar';
import OptionButton from '../OptionButton';
import ContinueButton from '../ContinueButton';

const PhysicalActivityScreen = ({ navigation, route }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const { signUpData } = route.params;
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };

  const handleContinue = () => {
    if (selectedLevel) {
      const updatedData = {...signUpData, activityLevel: selectedLevel}
      console.log(updatedData);
      console.log(signUpData);
      navigation.navigate('Account', { signUpData: updatedData });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar currentStep={6}/>
      <Text style={styles.title}>מהי רמת הפעילות הגופנית שלך?</Text>

      <View style={styles.optionsContainer}>
        <OptionButton
          icon="child"
          label="מתחיל"
          isSelected={selectedLevel === 'beginner'}
          onPress={() => handleLevelSelect('beginner')}
        />
        <OptionButton
          icon="user"
          label="בינוני"
          isSelected={selectedLevel === 'intermediate'}
          onPress={() => handleLevelSelect('intermediate')}
        />
        <OptionButton
          icon="running"
          label="מתקדם"
          isSelected={selectedLevel === 'advanced'}
          onPress={() => handleLevelSelect('advanced')}
        />
      </View>

      <ContinueButton onPress={handleContinue} disabled={!selectedLevel} />
    </SafeAreaView>
  );
};

export default PhysicalActivityScreen;

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
