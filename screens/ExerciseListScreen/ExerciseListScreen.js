import React, { useState } from 'react';
import { ScrollView, Text, View, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ExerciseCard from './cards/ExerciseCard';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import updateCommentForUsersPlanOnExerciseInSession from '../../backend/personalPlan/updateExerciseInSession';
import { formatDuration } from '../../utils/utils';

const ExerciseListScreen = ({ route }) => {
  const navigation = useNavigation();
  const { title, exercises, sessionId, userId, userComment, thumbnail, description, totalDuration } = route.params;
  const [editableExercises, setEditableExercises] = useState(exercises ? exercises.map(exercise => ({
    ...exercise,
    originalSets: exercise.sets || 0,  
    originalReps: exercise.reps || 0,  
  })) : []);
  const [loading, setLoading] = useState(true);  // Manage loading state for the header image

  const exerciseCount = exercises ? exercises.length : 0;
  
  const handleSendComment = async (comment, name, exerciseId) => {
    if (comment) {
      await updateCommentForUsersPlanOnExerciseInSession(userId, sessionId, name, exerciseId, comment);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={{ uri: thumbnail }}
          style={styles.headerBackgroundImage}
          onLoadStart={() => setLoading(true)}  // Show loader when image loading starts
          onLoadEnd={() => setLoading(false)}   // Hide loader when image finishes loading
        >
          {loading && (
            <ActivityIndicator size="large" color="#ffffff" style={styles.activityIndicator} />
          )}
          <LinearGradient
            colors={['transparent', 'rgba(255, 255, 255, 1)']}  // Linear gradient from transparent to white
            style={styles.gradient}
          >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <FontAwesome name="arrow-left" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.headerTitle}>{title}</Text>
              {description && (
                <Text style={styles.headerSubtitle}>{description}</Text>
              )}
              
              <View
                style={[
                  styles.infoContainer,
                  !totalDuration && styles.infoContainerSingle  // Apply narrower width if only one element
                ]}
              >
                <View style={styles.infoItem}>
                  <FontAwesome name="list" size={16} color="black" />
                  <Text style={styles.infoText}>
                    {exerciseCount === 1 ? 'תרגיל בודד' : `${exerciseCount} תרגילים`}
                  </Text>
                </View>

                {totalDuration ? (
                  <>
                    <View style={styles.divider} />
                    <View style={styles.infoItem}>
                      <FontAwesome name="clock-o" size={16} color="black" />
                      <Text style={styles.infoText}>{formatDuration(totalDuration)}</Text>
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {editableExercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
              <ExerciseCard
                name={exercise.name}
                subtitle={exercise.subtitle}
                customField={exercise.customFields}
                exerciseId={exercise.id}
                onCommentSend={handleSendComment}
                thumbnail={exercise.thumbnail}
                userComment={userComment}
                sessionId={sessionId}
                video={exercise.videoURL}
              />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ExerciseListScreen;
