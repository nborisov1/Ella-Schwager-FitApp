import React from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook
import styles from './styles';
import TrainingSessionCard from './TrainingSessionCrad/TrainingSessionCard';

const PersonalCoachScreen = () => {
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();  // Get the navigation object
  
  // Sample exercise data for each session
  const trainingSessions = [
    {
      id: 1,
      days: ['ו׳', 'ד׳', 'ב׳'],
      title: 'אימון רגליים',
      exercises: 6,
      imageUri: 'https://andscape.com/wp-content/uploads/2023/02/GettyImages-1330293031-e1675962077402.jpg?w=2048',
      exerciseList: [
        { name: 'Squats', sets: 3, reps: 12 },
        { name: 'Lunges', sets: 3, reps: 10 },
        { name: 'Leg Press', sets: 4, reps: 8 }
      ]
    },
    {
      id: 2,
      days: ['ד׳', 'ב׳'],
      title: 'אימון בטן',
      exercises: 5,
      imageUri: 'https://static9.depositphotos.com/1246892/1132/i/450/depositphotos_11328174-stock-photo-strong-athletic-man-on-dark.jpg',
      exerciseList: [
        { name: 'Crunches', sets: 3, reps: 15 },
        { name: 'Plank', sets: 3, reps: 1 },
        { name: 'Russian Twists', sets: 3, reps: 20 }
      ]
    },
    {
      id: 3,
      days: ['ב׳'],
      title: 'אימון ידיים',
      exercises: 4,
      imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC1UexSN5f_9Amk3cPl6Ui7OQVYqyT7IWFEg&s',
      exerciseList: [
        { name: 'Bicep Curls', sets: 3, reps: 12 },
        { name: 'Tricep Dips', sets: 3, reps: 10 },
        { name: 'Hammer Curls', sets: 3, reps: 12 }
      ]
    }
  ];

  // Function to handle card press and navigate to the ExerciseListScreen
  const handlePress = (session) => {
    navigation.navigate('ExerciseList', {
      title: session.title,
      exercises: session.exerciseList  // Pass the list of exercises for the selected session
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Headline Section */}
        <View style={[styles.headlineContainer, { paddingVertical: height * 0.02, paddingHorizontal: width * 0.05 }]}>
          <Text style={[styles.headlineText, { fontSize: width * 0.06 }]}>My Workouts</Text>
        </View>
        
        {/* Training Sessions List */}
        <ScrollView contentContainerStyle={styles.sessionList}>
          {trainingSessions.map((session) => (
            <TrainingSessionCard 
              key={session.id}
              title={session.title}
              exercises={session.exercises}
              imageUri={session.imageUri}
              days={session.days}
              onPress={() => handlePress(session)}  // Handle navigation on press
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PersonalCoachScreen;
