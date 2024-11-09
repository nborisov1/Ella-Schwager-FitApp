import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Video } from 'expo-av';
import styles from './styles';
import { fetchExerciseVideos } from '../../../backend/trainingSession/fetchExerciseVideos';

const ExerciseCard = ({ name, subtitle, customField, thumbnail, userComment, exerciseId, onCommentSend, sessionId, video }) => {
  const [comment, setComment] = useState(userComment || '');
  const [loading, setLoading] = useState(true);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const handleSendComment = () => {
    if (comment.trim()) {
      onCommentSend(comment, name, exerciseId);
      setComment(''); // Clear the comment box after sending
    }
  };

  const handlePlayPress = async () => {
    try {
      let videoURL = video;
      if (!videoURL) {
        const videos = await fetchExerciseVideos(sessionId, exerciseId);
        if (videos.length > 0 && videos[0].videoURL) {
          videoURL = video[0].videoURL;
        }
      }
      setVideoUrl(video);
      setVideoModalVisible(true);
      setVideoLoading(true); // Start loading indicator      
    } catch (error) {
      console.error("Failed to load video:", error);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        {loading && (
          <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
        )}
        <Image
          source={{ uri: thumbnail }}
          style={styles.thumbnail}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        <TouchableOpacity style={styles.playButtonContainer} onPress={handlePlayPress}>
          <FontAwesome name="play" size={16} color="white" style={styles.playIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{name} -</Text>
          <Text style={styles.infoText}>
            {customField &&
              Object.keys(customField)
                .map((key, index, arr) => `${customField[key]} ${key}${index < arr.length - 1 ? ' -' : ''}`)
                .join(' ')}
          </Text>
        </View>
        { subtitle ? (<Text style={styles.subtitle}>{subtitle}</Text>) : null }

        <View style={styles.commentSection}>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendComment}>
            <FontAwesome name="send" size={16} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.commentBox}
            placeholder="קשה/קל מידי? כתבי לנו"
            value={comment}
            onChangeText={setComment}
          />
        </View>
      </View>

      <Modal visible={isVideoModalVisible} animationType="fade" transparent={true} onRequestClose={() => setVideoModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setVideoModalVisible(false)}>
            <FontAwesome name="times" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.modalContent}>
            {videoLoading && <ActivityIndicator size="large" color="#ffffff" style={styles.videoLoadingIndicator} />}
            {videoUrl && (
              <Video
                source={{ uri: videoUrl }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                style={styles.videoPlayer}
                useNativeControls
                onLoadStart={() => setVideoLoading(true)}
                onLoad={() => setVideoLoading(false)}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExerciseCard;
