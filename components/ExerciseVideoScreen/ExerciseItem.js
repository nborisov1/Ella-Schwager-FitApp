import React, { useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Video } from 'expo-av';

const ExerciseItem = ({ title, duration, image, videoUri }) => {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [videoPosition, setVideoPosition] = useState(0); // State to store video playback position
  const videoRef = useRef(null); // Ref for the Video component
  // Open modal and resume video from the saved position
  const handleOpenVideo = () => {
    setIsVideoVisible(true);
  };

  // Close modal and save current video position
  const handleCloseVideo = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isLoaded) {
        setVideoPosition(status.positionMillis); // Save the current video position
      }
    }
    setIsVideoVisible(false);
  };

  return (
    <View>
      {/* Main content of the exercise item */}
      <TouchableOpacity style={styles.container} onPress={handleOpenVideo}>
        {/* Conditionally render the image only if it's provided */}
        <View style={styles.imageContainer}>
          {image ? (
            <Image source={{uri: image}} style={styles.image} />
          ) : (
            <View style={styles.placeholderImage} />
          )}
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.duration}>{duration}</Text>
        </View>
      </TouchableOpacity>

      {/* Modal for playing the video */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVideoVisible}
        onRequestClose={handleCloseVideo} // Save the video position on modal close
      >
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={{ uri: videoUri }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay
            positionMillis={videoPosition} // Start the video from the saved position
            useNativeControls
            style={styles.video}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseVideo} // Close video and save its state
          >
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444', // Placeholder background color
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#555', // Placeholder color when image is not available
  },
  detailsContainer: {
    marginLeft: 15,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  duration: {
    color: '#aaa',
    fontSize: 14,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: 300,
  },
  closeButton: {
    padding: 10,
    backgroundColor: '#ff0',
    borderRadius: 10,
    marginTop: 20,
  },
  closeText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default ExerciseItem;
