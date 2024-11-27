import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import logo from '../../../assets/images/logoimg.jpg'; // Adjust this import to match your structure

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/963697/pexels-photo-963697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          {/* Logo Container */}
          <View style={styles.logoContainer}>
            <Image
              source={logo} // Using the imported image
              style={styles.logo}
            />
          </View>

          {/* Content Container */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              <Text style={styles.highlight}>Your</Text>
              {'\n'}happiness is in{'\n'}Your hands
            </Text>
          </View>

          {/* Sign-Up/In Container */}
          <View style={styles.signUpOrInContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Gender')}
            >
              <Text style={styles.buttonText}>הירשמי כאן על מנת להתחיל</Text>
            </TouchableOpacity>

            <View style={styles.footerTextContainer}>
              <Text style={styles.footerText}>
                יש לך חשבון?{' '}
                <Text
                  style={styles.signUpText}
                  onPress={() => navigation.navigate('Login')}
                >
                  התחבר
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between', // Ensures spacing between top, middle, and bottom sections
  },
  logoContainer: {
    height: '30%', // Take up 30% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  contentContainer: {
    marginBottom: 400,
    flex:1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
  },
  title: {
    fontSize: 40, // Bigger font size for the title
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40, // Adjust line height for better readability
    marginHorizontal: 20, // Add padding for better text placement
    lineHeight: 60,
  },
  signUpOrInContainer: {
    position: 'absolute',
    bottom: 30, // Position it at the bottom of the screen with some spacing
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#e1b97b',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  footerTextContainer: {
    marginTop: 20,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  signUpText: {
    color: '#e1b97b',
    fontWeight: 'bold',
  },
});
