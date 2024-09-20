import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';  // Import SafeAreaView

const ProfileHeader = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
    <View style={styles.profileHeaderContainer}>
        <View style={styles.profileHeaderTextContainer}>
            <Text style={styles.welcomeText}>WELCOME BACK,</Text>
            <Text style={styles.userName}>Natan Borisov</Text>
        </View>
    </View>
    </SafeAreaView>
  );
};

export default ProfileHeader;
