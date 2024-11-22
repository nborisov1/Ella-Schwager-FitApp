import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './styles';  // Assuming you have a styles.js for styling

const SettingsScreen = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://example.com/avatar.png' }} style={styles.profileImage} />
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editProfileText}>Edit Profile Info</Text>
          <Text style={styles.profileInfoText}>John Doe - johndoe@example.com</Text>
        </TouchableOpacity>
      </View>

      {/* Notification Settings */}
      <View style={styles.settingsGroup}>
        <Text style={styles.settingsGroupTitle}>Notifications</Text>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsItemText}>Workout Reminders</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsItemText}>New Challenges</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
          />
        </View>
      </View>

      {/* Dark Mode Toggle */}
      <View style={styles.settingsGroup}>
        <Text style={styles.settingsGroupTitle}>Appearance</Text>
        <View style={styles.settingsItem}>
          <Text style={styles.settingsItemText}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
          />
        </View>
      </View>

      {/* Log Out */}
      <TouchableOpacity style={styles.logoutButton} onPress={() => console.log('Logged out')}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;
