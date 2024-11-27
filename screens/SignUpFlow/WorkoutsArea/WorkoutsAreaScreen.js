import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressBar from '../ProgressBar';
import OptionButton from '../OptionButton';
import ContinueButton from '../ContinueButton';

const WorkoutAreaScreen = ({ navigation, route }) => {
  const { signUpData } = route.params;
  const [selectedArea, setSelectedArea] = useState([]);
  const [iscustomAreaSelected, setIscustomAreaSelected] = useState(false);
  const [customArea, setCustomArea] = useState('');

  const toggleAreaSelection = (area) => {
    setSelectedArea((prevareas) => {
      if (prevareas.includes(area)) {
        return prevareas.filter((item) => item !== area);
      } else {
        return [...prevareas, area];
      }
    });
  };

  const handlecustomAreaToggle = () => {
    setIscustomAreaSelected(!iscustomAreaSelected);
    if (!iscustomAreaSelected) {
      setCustomArea('');
    }
  };

  const handleContinue = () => {
    const areasToPass = iscustomAreaSelected && customArea
      ? [...selectedArea, customArea]
      : selectedArea;
    const updatedData = { ...signUpData, areas: areasToPass }; // Add selected areas to sign-up data
    if (areasToPass.length > 0) {
      navigation.navigate('Account', {signUpData: updatedData});
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <ProgressBar currentStep={8} />
          <Text style={styles.title}>היכן את מתאמנת?</Text>
          <Text style={styles.subtitle}>ניתן לבחור מספר אופציות</Text>

          <View style={styles.optionsContainer}>
            <OptionButton
              icon="dumbbell"
              label="חדר כושר מקצועי"
              isSelected={selectedArea.includes('weight_loss')}
              onPress={() => toggleAreaSelection('weight_loss')}
            />
            <OptionButton
              icon="home"
              label="בית"
              isSelected={selectedArea.includes('gain_muscle')}
              onPress={() => toggleAreaSelection('gain_muscle')}
            />
            <OptionButton
              icon="cloud"
              label="פארק"
              isSelected={selectedArea.includes('get_strong')}
              onPress={() => toggleAreaSelection('get_strong')}
            />

            {/* Custom area Option */}
            <OptionButton
              icon="pencil-alt"
              label="אחר"
              isSelected={iscustomAreaSelected}
              onPress={handlecustomAreaToggle}
            />

            {iscustomAreaSelected && (
              <TextInput
                style={styles.customAreaInput}
                placeholder="כתבי לנו היכן את מתאמנת"
                value={customArea}
                onChangeText={setCustomArea}
              />
            )}
          </View>

          <ContinueButton onPress={handleContinue} disabled={selectedArea.length === 0 && !customArea} />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default WorkoutAreaScreen;

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
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'right',
  },

  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  customAreaInput: {
    borderWidth: 1,
    borderColor: '#DAA520',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    backgroundColor: '#FFF',
    textAlign: 'right',
  },
});
