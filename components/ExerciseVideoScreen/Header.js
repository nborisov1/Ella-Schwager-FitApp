import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = ({ imageSource, title }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: imageSource }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailsContainer}>
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: undefined,  // Allow the height to adjust based on the container
    aspectRatio: 16 / 9,  // Keep the image aspect ratio (adjust this as needed)
  },
  overlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  details: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Header;
