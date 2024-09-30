import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import Video from 'react-native-video'; // Import the video player component
import styles from './ExerciseVideoScreenStyle'

const ExerciseVideoScreen = ({ route }) => {
  const { exercise } = route.params; // Get exercise passed from the previous screen
  const [selectedVideo, setSelectedVideo] = useState(null); // State for the selected video
  const [isVideoModalVisible, setVideoModalVisible] = useState(false); // State for modal visibility

  // Function to play the selected video
  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setVideoModalVisible(true);
  };

  // Function to close the video modal
  const closeVideoModal = () => {
    setVideoModalVisible(false);
    setSelectedVideo(null);
  };

  // Function to render each video
  const renderVideo = ({ item }) => (
    <TouchableOpacity style={styles.videoContainer} onPress={() => handlePlayVideo(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.videoThumbnail} />
      <Text style={styles.videoName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{exercise.name} - Videos</Text>

      {/* Video List */}
      <FlatList
        data={exercise.videos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderVideo}
        ListEmptyComponent={() => <Text>No videos available for this exercise.</Text>}
      />

      {/* Video Player Modal */}
      {selectedVideo && (
        <Modal
          visible={isVideoModalVisible}
          animationType="slide"
          onRequestClose={closeVideoModal}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeVideoModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <Video
              source={{ uri: selectedVideo.url }}
              style={styles.videoPlayer}
              controls={true}  // Enable native video controls
              resizeMode="contain"  // Resize mode for the video
            />
            <Text style={styles.videoTitle}>{selectedVideo.name}</Text>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default ExerciseVideoScreen;

