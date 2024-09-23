import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // For checkboxes
import styles from './styles';

const GoalsScreen = ({ navigation, route }) => {
  const { signUpData } = route.params;

  // Initial state for goals with an array of false values
  const [goals, setGoals] = useState([
    { title: 'Get Fitter', selected: false },
    { title: 'Gain Weight', selected: false },
    { title: 'Lose Weight', selected: false },
    { title: 'Building Muscle', selected: false },
    { title: 'Improving Endurance', selected: false },
    { title: 'Others', selected: false },
  ]);

  // Toggle selected state for each goal
  const toggleGoal = (index) => {
    const updatedGoals = [...goals];
    updatedGoals[index].selected = !updatedGoals[index].selected;
    setGoals(updatedGoals);
  };

  const handleContinue = () => {
    const selectedGoals = goals.filter(goal => goal.selected).map(goal => goal.title);
    const updatedData = { ...signUpData, goals: selectedGoals };
    navigation.navigate('PhysicalActivity', { signUpData: updatedData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.centeredContent}>
        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* Title and Subtitle */}
          <Text style={styles.title}>What is Your Goal?</Text>
          <Text style={styles.subtitle}>You can choose more than one. Don't worry, you can always change it later.</Text>

          {/* Goals List */}
          {goals.map((goal, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.goalItem, goal.selected && styles.goalItemSelected]}
              onPress={() => toggleGoal(index)}
            >
              <Text style={styles.goalText}>{goal.title}</Text>
              <FontAwesome
                name={goal.selected ? "check-square" : "square-o"}
                size={24}
                color={goal.selected ? '#7D3C98' : '#555'}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Back and Continue Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GoalsScreen;
