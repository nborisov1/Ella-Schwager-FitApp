import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../ProgressBar';
import OptionButton from '../OptionButton';
import ContinueButton from '../ContinueButton';

const GoalsScreen = ({ navigation }) => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [isCustomGoalSelected, setIsCustomGoalSelected] = useState(false);
  const [customGoal, setCustomGoal] = useState('');

  const toggleGoalSelection = (goal) => {
    setSelectedGoals((prevGoals) => {
      if (prevGoals.includes(goal)) {
        return prevGoals.filter((item) => item !== goal);
      } else {
        return [...prevGoals, goal];
      }
    });
  };

  const handleCustomGoalToggle = () => {
    setIsCustomGoalSelected(!isCustomGoalSelected);
    if (!isCustomGoalSelected) {
      setCustomGoal('');
    }
  };

  const handleContinue = () => {
    const goalsToPass = isCustomGoalSelected && customGoal
      ? [...selectedGoals, customGoal]
      : selectedGoals;
      
    if (goalsToPass.length > 0) {
      navigation.navigate('PhysicalActivity', { goals: goalsToPass });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ProgressBar currentStep={2} totalSteps={4} />
      <Text style={styles.title}>מהי מטרת הכושר שלך?</Text>

      <View style={styles.optionsContainer}>
        <OptionButton
          icon="weight"
          label="לרדת במשקל"
          isSelected={selectedGoals.includes('weight_loss')}
          onPress={() => toggleGoalSelection('weight_loss')}
        />
        <OptionButton
          icon="smile"
          label="שמור על כושר"
          isSelected={selectedGoals.includes('stay_fit')}
          onPress={() => toggleGoalSelection('stay_fit')}
        />
        <OptionButton
          icon="dumbbell"
          label="להעלות מסת שריר"
          isSelected={selectedGoals.includes('gain_muscle')}
          onPress={() => toggleGoalSelection('gain_muscle')}
        />
        <OptionButton
          icon="running"
          label="להתחזק"
          isSelected={selectedGoals.includes('get_strong')}
          onPress={() => toggleGoalSelection('get_strong')}
        />

        {/* Custom Goal Option */}
        <OptionButton
          icon="pencil-alt"
          label="מטרה אישית"
          isSelected={isCustomGoalSelected}
          onPress={handleCustomGoalToggle}
        />

        {isCustomGoalSelected && (
          <TextInput
            style={styles.customGoalInput}
            placeholder="הכנס מטרה אישית כאן..."
            value={customGoal}
            onChangeText={setCustomGoal}
          />
        )}
      </View>

      <ContinueButton onPress={handleContinue} disabled={selectedGoals.length === 0 && !customGoal} />
    </SafeAreaView>
  );
};

export default GoalsScreen;

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
  customGoalInput: {
    borderWidth: 1,
    borderColor: '#DAA520',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    backgroundColor: '#FFF',
    textAlign: 'right',
  },
});
