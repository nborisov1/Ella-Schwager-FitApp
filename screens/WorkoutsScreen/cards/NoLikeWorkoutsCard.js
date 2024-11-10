import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const NoLikedWorkoutsCard = ({ onExplorePress }) => (
  <View style={styles.cardContainer}>
    <Text style={styles.title}>עדיין לא שמרת שום אימון</Text>
    <Text style={styles.subtitle}>חקור את כלל האימונים שלנו וסמן את מה שאהבת!</Text>
    <TouchableOpacity style={styles.button} onPress={onExplorePress}>
      <Text style={styles.buttonText}>חקור עכשיו</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'white', // Light green background color
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'pink', // Border color similar to background
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFD700', // Yellow color for the button
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default NoLikedWorkoutsCard;
