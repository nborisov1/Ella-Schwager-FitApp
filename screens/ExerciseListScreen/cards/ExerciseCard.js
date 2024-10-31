import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

const ExerciseCard = ({ name, customField, thumbnail, userComment, exerciseId, onCommentSend }) => {
  const [comment, setComment] = useState(userComment || '');
  const [loading, setLoading] = useState(true);

  const handleSendComment = () => {
    if (comment.trim()) {
      onCommentSend(comment, name, exerciseId);
      setComment(''); // Clear the comment box after sending
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Thumbnail on the left */}
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
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          {/* Title at the top right and custom fields next to it */}
          <Text style={styles.title}>{name} -</Text>
          <Text style={styles.infoText}>
            {customField &&
              Object.keys(customField)
              .map((key, index, arr) => `${customField[key]} ${key}${index < arr.length - 1 ? ' -' : ''}`)
              .join(' ')}
          </Text>
        </View>

        {/* Comment Section (Directly below the title and custom fields) */}
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
    </View>
  );
};

export default ExerciseCard;
