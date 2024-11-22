import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/963697/pexels-photo-963697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }}
        style={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          {/* Logo Container at the top 10% */}
          <View style={styles.logoContainer}>
            <Image source={{uri: 'https://www.shutterstock.com/shutterstock/photos/2440775703/display_1500/stock-vector-logo-design-gym-logo-fitness-logo-brand-identity-visual-identity-gym-branding-protein-shake-2440775703.jpg'}} style={styles.logo} />  
          </View>

          {/* Main Content Container taking up the remaining space */}
          <View style={styles.contentContainer}>
            <Text style={styles.title}>
              קחי שליטה על הגוף שלך 
            </Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Gender')}
            >
              <Text style={styles.buttonText}>הירשמי כאן על מנת להתחיל </Text>
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
  },
  logoContainer: {
    height: '30%',  // Take up 10% of the screen height
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },
  contentContainer: {
    flex: 1,  // Take up the remaining 90% of the screen height
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 30,
  },
  button: {
    backgroundColor: '#E8C547',
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
    color: '#E8C547',
    fontWeight: 'bold',
  },
});
