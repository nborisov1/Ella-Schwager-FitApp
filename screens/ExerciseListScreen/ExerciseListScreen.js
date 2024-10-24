import React from 'react';
import { ScrollView, Text, View, SafeAreaView,ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ExerciseCard from './cards/ExerciseCard';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import updateExerciseInSession from '../../backend/personalPlan/updateExerciseInSession';

const ExerciseListScreen = ({ route }) => {
  const navigation = useNavigation();
  const { title, exercises, isSuperUser, sessionId, userId, userComment, thumbnail, description } = route.params;
  const [editableExercises, setEditableExercises] = useState(exercises.map(exercise => ({
    ...exercise,
    originalSets: exercise.sets || 0,  
    originalReps: exercise.reps || 0,  
  })));
  
  const handleSendComment = async (comment, name, exerciseId) => {
    console.log('comment  = ',comment);
    if (comment) {
      await updateExerciseInSession(userId, sessionId, name, exerciseId, comment);
    }
  }
  const handleNavigateToExerciseVideoScreen = (exercise) => {
    navigation.navigate('ExerciseVideoScreen', {
      title: exercise.name,
      videoUri: exercise.videoUri,
      thumbnail: exercise.thumbnail,
      exerciseId: exercise.id,
      sessionId: sessionId,
      isSuperUser: isSuperUser,
    });
  };
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <ImageBackground source={{ uri: thumbnail }} style={styles.headerBackgroundImage}>
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
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {editableExercises.map((exercise, index) => (
          <View key={index} style={styles.exerciseItem}>
            <TouchableOpacity
              onPress={() => handleNavigateToExerciseVideoScreen(exercise)}  // Make the card clickable
            >
            <ExerciseCard
              name={exercise.name}
              subtitle={exercise.subtitle}
              customField={exercise.customField}
              exerciseId={exercise.id}
              isSuperUser={isSuperUser}
              onCommentSend={handleSendComment}
              thumbnail={exercise.thumbnail}
              userComment={userComment}
            />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ExerciseListScreen;
