import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, I18nManager } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const VideoHeader = ({ onPlayPress }) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://example.com/video-thumbnail.jpg' }}
        style={styles.thumbnail}
      />
      <TouchableOpacity style={styles.playButton} onPress={onPlayPress}>
        <FontAwesome name="play-circle" size={60} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  thumbnail: {
    width: '100%',
    height: 220,
    borderRadius: 12,
  },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: I18nManager.isRTL ? '45%' : '45%',
  },
});

export default VideoHeader;
