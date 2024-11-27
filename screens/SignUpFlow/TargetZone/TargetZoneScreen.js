import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import ProgressBar from '../ProgressBar'; // Use your existing ProgressBar component
import ContinueButton from '../ContinueButton'; // Use your existing ContinueButton component

const TargetZoneScreen = ({ navigation, route }) => {
  const [selectedZones, setSelectedZones] = useState([]);
  const { signUpData } = route.params;
  const zones = [
    { id: 'breasts', label: 'חזה', style: styles.breasts },
    { id: 'arms', label: 'ידיים', style: styles.arms },
    { id: 'belly', label: 'בטן', style: styles.belly },
    { id: 'back', label: 'גב', style: styles.back },
    { id: 'buttocks', label: 'ישבן', style: styles.buttocks },
    { id: 'legs', label: 'רגליים', style: styles.legs },
    { id: 'inners', label: 'ירך פנימית', style: styles.inners },
    { id: 'outters', label: 'ירך חיצונית', style: styles.outters },
  ];

  const toggleZone = (zone) => {
    setSelectedZones((prev) =>
      prev.includes(zone)
        ? prev.filter((item) => item !== zone) // Remove if already selected
        : [...prev, zone] // Add if not selected
    );
  };

  const isZoneSelected = (zone) => selectedZones.includes(zone);

  const handleContinue = () => {
    if (selectedZones.length > 0) {
      const updatedData = {...signUpData, zones: zones}
      navigation.navigate('PhysicalActivity', { signUpData: updatedData });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Bar */}
      <ProgressBar currentStep={6} />

      {/* Title */}
      <Text style={styles.title}>באילו איזורים תרצי להתמקד?</Text>

      <View style={styles.mainContent}>
        {/* Body Image on the Left */}
        <View style={styles.bodyContainer}>
          <ImageBackground
            source={require('../../../assets/images/base.jpg')} // Replace with your body image path
            style={styles.bodyImage}
          >
            {/* Highlight Layers */}
            {zones.map(
              (zone) =>
                isZoneSelected(zone.id) && (
                  <View key={zone.id} style={[styles.highlight, zone.style]} />
                )
            )}
          </ImageBackground>
        </View>

        {/* Buttons on the Right */}
        <View style={styles.boxContainer}>
          {zones.map((zone) => (
            <TouchableOpacity
              key={zone.id}
              style={[
                styles.box,
                isZoneSelected(zone.id) && styles.boxSelected, // Highlight the selected button
              ]}
              onPress={() => toggleZone(zone.id)}
            >
              <Text style={styles.boxText}>{zone.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.continueButtonContainer}>
        <ContinueButton onPress={handleContinue} disabled={selectedZones.length === 0} />
      </View>

    </SafeAreaView>
  );
};

export default TargetZoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  mainContent: {
    flex: 1,
    flexDirection: 'row', // Row layout to place image and buttons side by side
  },
  bodyContainer: {
    flex: 1, // Occupies the left half
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyImage: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 153, 200, 0.4)', // Semi-transparent blue
    borderRadius: 10,
  },
  breasts: {
    top: 80,
    left: 80,
    width: 40,
    height: 40,
  },
  inners: {
    top: 210,
    left: 105,
    width: 30,
    height: 70,
    transform: [{ rotate: '155deg' }],
  },
  outters: {
    top: 210,
    left: 55,
    width: 30,
    height: 40,
    transform: [{ rotate: '175deg' }],
  },

  arms: {
    top: 80,
    left: 45,
    width: 20,
    height: 90,
    transform: [{ rotate: '176deg' }],
  },
  belly: {
    top: 125,
    left: 80,
    width: 40,
    height: 40,
  },
  back: {
    top: 130,
    left: 60,
    width: 20,
    height: 20,
  },
  buttocks: {
    top: 175,
    left: 30,
    width: 40,
    height: 40,
  },
  legs: {
    top: 240,
    left: 50,
    width: 40,
    height: 120,
  },
  boxContainer: {
    flex: 1, // Occupies the right half
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DAA520',
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    width: '70%',
  },
  boxSelected: {
    backgroundColor: '#FFF5E1',
  },
  boxText: {
    color: 'black',
    fontWeight: 'bold',
  },
  continueButtonContainer: {
    position: 'absolute',
    bottom: 20, // Padding from the bottom of the screen
    left: 16,
    right: 16,
  },
});
