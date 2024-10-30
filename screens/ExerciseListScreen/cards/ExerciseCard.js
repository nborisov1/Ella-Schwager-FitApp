import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import styles from './styles';

const ExerciseCard = ({ name, subtitle, customField, thumbnail, userComment, exerciseId, onCommentSend }) => {
  const [comment, setComment] = useState(userComment || '');
  const [loading, setLoading] = useState(true);  // Manage loading state

  const handleSendComment = () => {
    if (comment.trim()) {
      onCommentSend(comment, name, exerciseId);
      setComment(''); // Clear the comment box after sending
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.topSection}>
        {/* Thumbnail on the left */}
        <View style={styles.imageContainer}>
          {loading && (
            <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />
          )}

          <Image
            source={{ uri: thumbnail }}
            style={styles.thumbnail}
            onLoadStart={() => setLoading(true)}  // Show ActivityIndicator when loading starts
            onLoadEnd={() => setLoading(false)}   // Hide ActivityIndicator when loading finishes
          />
        </View>

        {/* Details Section */}
        <View style={styles.detailsContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
          </View>
          {subtitle && (
            <Text style={styles.subtitle}>{subtitle}</Text>
          )}

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              {customField && Object.keys(customField).map((key, index) => (
                `${key}: ${customField[key]}`
              )).join('  ')}  {/* Add two spaces between each field */}
            </Text>
          </View>
        </View>
      </View>

      {/* Comment Section (At the bottom of the card) */}
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
  );
};

export default ExerciseCard;
