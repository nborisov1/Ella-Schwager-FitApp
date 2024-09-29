import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import styles
 from './styles';
const UserCard = ({ user, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View>
        <Text style={styles.userName}>{user.fullName || 'Unnamed User'}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        {/* Add any other user details you'd like to display */}
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
