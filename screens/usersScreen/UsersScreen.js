import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Text, StyleSheet, SafeAreaView, RefreshControl } from 'react-native';
import fetchAllUsers from '../../backend/users/fetchAllUsers'; // Import the backend method
import UserCard from './UserCard'; // Import the UserCard component
import styles from './styles';

const UsersScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const fetchedUsers = await fetchAllUsers();  // Fetch users from backend
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers); // Initialize filteredUsers with all users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const fetchedUsers = await fetchAllUsers();
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
    } catch (error) {
      console.error('Error refreshing users:', error);
    }
    setRefreshing(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = users.filter((user) => {
      const userName = user.name ? user.name.toLowerCase() : '';  // Handle undefined name
      const userEmail = user.email ? user.email.toLowerCase() : '';  // Handle undefined email
      return userName.includes(query.toLowerCase()) || userEmail.includes(query.toLowerCase());
    });
    setFilteredUsers(filtered);
  };

  // Function to handle clicking on a user card and navigate to the detail screen
  const handleUserPress = (user) => {
    navigation.navigate('UserDetail', { user });  // Pass the userId to the detail screen
  };

  const renderUser = ({ item }) => (
    <UserCard
      user={item}
      onPress={() => handleUserPress(item)}  // Pass user ID to navigate to detail screen
    />
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search by name or email"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.id}
          renderItem={renderUser}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

export default UsersScreen;
