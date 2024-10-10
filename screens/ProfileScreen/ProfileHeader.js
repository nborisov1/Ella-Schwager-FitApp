import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';  // Import FontAwesome or any other icon set

const ProfileHeader = ({ user }) => {
  return (
    <SafeAreaView style={updatedStyles.safeArea}>
      <View style={updatedStyles.container}>
        {/* Profile Image or Default Icon */}
        {user.profileImage ? (
          <Image
            source={{ uri: user.profileImage }}
            style={updatedStyles.profileImage}
          />
        ) : (
          <View style={updatedStyles.iconContainer}>
            <Icon name="user-circle" size={80} color="#444" />
          </View>
        )}

        {/* Welcome Text and User Name */}
        <View style={updatedStyles.textContainer}>
          <Text style={updatedStyles.userName}>{user ? user.fullName : 'User'}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const updatedStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'orange',
  },
  textContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange',
    marginTop: 5,
  },
});

export default ProfileHeader;
