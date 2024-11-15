import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, View, FlatList, ActivityIndicator, RefreshControl, TextInput, TouchableOpacity } from 'react-native';
import WorkoutPlanCard from './cards/WorkoutPlanCard';
import styles from '../cards/styles';
import { fetchGeneralWorkouts, fetchUserUnlockedWorkouts } from '../../backend/generalWorkouts/generalWorkoutController';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import SmallWorkoutCard from './cards/SmallWorkoutCard';
import { useNavigation } from '@react-navigation/native';
import { getUserLikedSessions, toggleLikeSession } from '../../backend/userController';
import NoLikedWorkoutsCard from './cards/NoLikeWorkoutsCard';
import { Alert } from 'react-native';
import { fetchPlans } from '../../backend/generalWorkouts/generalWorkoutController';

const WorkoutsScreen = ({ user }) => {
  const [workouts, setWorkouts] = useState([]);
  const [likedSessionIds, setLikedSessionIds] = useState([]);
  const [likedWorkouts, setLikedWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [plans, setPlans] = useState([]);
  const [headerTitle, setHeaderTitle] = useState('');
  const [headerDescription, setHeaderDescription] = useState('');
  const [coupons, setCoupons] = useState({});

  const navigation = useNavigation();

  const handlePaymentPress = () => {
    navigation.navigate('Payment', { plans: plans, headerTitle: headerTitle, headerDescription: headerDescription, coupons: coupons })
  };


  const handlePress = (workout) => {
    if (workout.isUnlocked || user.unlockAll) {
        navigation.navigate('ExerciseList', {
          title: workout.workoutName,
          exercises: workout.videos,
          sessionId: workout.id,
          thumbnail: workout.thumbnailURL,
          description: workout.subtitle,
          totalDuration: workout.totalTime,
          isGeneralWorkout: true,
        });
    } else {
      Alert.alert(
        'Workout Locked',
        'This workout plan is locked. Unlock to continue.',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Pay for Workout', 
            onPress: () => handlePaymentPress()
          }
        ],
        { cancelable: true }
      );
    }
  };

  const loadUserLikedSessions = async () => {
    if (user) {
      try {
        const likedSessionIds = await getUserLikedSessions(user.uid);
        setLikedSessionIds(likedSessionIds);
      } catch (error) {
        console.error('Error fetching liked sessions:', error);
      }
    }
  };

  const handleExplorePress = () => {
    navigation.navigate('AllWorkouts', { workouts: workouts, user: user , onPaymentPress: handlePaymentPress});
  };

  const handleShowAllWorkouts = (allRelevantWorkouts, title) => {
    navigation.navigate('AllWorkouts', { workouts: allRelevantWorkouts, title: title, user: user, onPaymentPress: handlePaymentPress });
  };

  const loadWorkouts = async () => {
    try {
      let fetchedWorkouts = await fetchGeneralWorkouts();
      if (!user.unlockAll) {
        fetchedWorkouts = fetchedWorkouts.sort((a,b) => {
          return (b.isUnlocked ? 1 : 0) - (a.isUnlocked ? 1 : 0);
        })
      }
      setWorkouts(fetchedWorkouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPlans = async () => {
    const { plans, headerTitle, headerDescription, coupons } = await fetchPlans();
    const sortedPlans = plans.sort((a, b) => (b.isRecommended ? 1 : 0) - (a.isRecommended ? 1 : 0));
    console.log(sortedPlans);
    setPlans(sortedPlans);
    setHeaderTitle(headerTitle);
    setHeaderDescription(headerDescription);
    setCoupons(coupons);
  };
  useEffect(() => {
    loadPlans();
    loadWorkouts();
    loadUserLikedSessions();
  }, []);

  useEffect(() => {
    const filteredLikedWorkouts = workouts.filter(workout => likedSessionIds.includes(workout.id));
    setLikedWorkouts(filteredLikedWorkouts);
  }, [likedSessionIds, workouts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadWorkouts();
    loadPlans();
    loadUserLikedSessions().then(() => setRefreshing(false));
  }, []);


  const _getFixupForLikedSessions = (workouts, likedSessionIds) => {
    // Add the `liked` field to each workout based on `likedSessionIds`
    let currentWorkouts = workouts.map(workout => ({
      ...workout,
      liked: likedSessionIds.includes(workout.id),
    }));
  
    // Sort unlocked workouts to appear first if `user.unlockAll` is false
    if (!user.unlockAll) {
      currentWorkouts = currentWorkouts.sort((a, b) => {
        return (b.isUnlocked ? 1 : 0) - (a.isUnlocked ? 1 : 0);
      });
    }
  
    // Log each workout's liked status to verify
    currentWorkouts.forEach(workout => {
      console.log(`Workout ID: ${workout.id}, Liked: ${workout.liked}`);
    });
  
    return currentWorkouts;
  };
  const handleToggleLike = async (sessionId) => {
    try {
      // Toggle the like status and get updated liked sessions
      const updatedLikedSessions = await toggleLikeSession(user.uid, sessionId, likedSessionIds);
  
      // Update `likedSessionIds` state
      setLikedSessionIds(updatedLikedSessions);
  
      // Update `workouts` array to reflect the new liked status for all workouts
      setWorkouts(_getFixupForLikedSessions(workouts, updatedLikedSessions));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  const filteredWorkouts = workouts.filter(workout =>
    workout.workoutName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.premiumButton} onPress={handlePaymentPress}>
          <View style={styles.iconCircle}>
            <FontAwesome name="star" size={16} color="#333" />
          </View>
          <Text style={styles.premiumButtonText}>הפוך לפרימיום</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>האימונים שלנו 🔥</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FontAwesome name="sliders" size={20} color="#888" style={styles.filterIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="חיפוש אימון"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FontAwesome name="search" size={18} color="#888" style={styles.searchIcon} />
      </View>

      <ScrollView
        style={styles.workoutList}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Render only search results when there is a search query */}
        {searchQuery ? (
          filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout, index) => (
              <WorkoutPlanCard
                key={index}
                workout={{
                  title: workout.workoutName,
                  subtitle: workout.subtitle,
                  videos: workout.videos,
                  totalTime: workout.totalDuration || '',
                  isUnlocked: user.unlockAll || workout.isUnlocked,
                  image: workout.thumbnailURL,
                  id: workout.id,
                  place: workout.place,
                  level: workout.level,
                }}
                onLike={() => handleToggleLike(workout.id)}
                onPress={() => handlePress(workout)}
              />
            ))
          ) : (
            <Text style={{ textAlign: 'center', marginTop: 20 }}>לא נמצאו אימונים</Text>
          )
        ) : (
          <>
            {/* Liked Workouts Section */}
            <View style={styles.sectionHeader}>
              {likedWorkouts.length > 0 && (
                <Text style={styles.sectionTitle}>אימונים שאהבתי</Text>
              )}
              {likedWorkouts.length > 0 && (
                <TouchableOpacity onPress={() => handleShowAllWorkouts(likedWorkouts, 'אימונים שאהבתי')}>
                  <Text style={styles.viewAllButton}>להציג את הכל</Text>
                </TouchableOpacity>
              )}
            </View>
            {likedWorkouts.length > 0 ? (
              likedWorkouts.slice(0, 2).map((workout, index) => (
                <WorkoutPlanCard
                  key={index}
                  workout={{
                    title: workout.workoutName,
                    subtitle: workout.subtitle,
                    videos: workout.videos,
                    totalTime: workout.totalDuration || '',
                    isUnlocked: user.unlockAll || workout.isUnlocked,
                    image: workout.thumbnailURL,
                    id: workout.id,
                    place: workout.place,
                    level: workout.level,
                    liked: true,
                  }}
                  onLike={() => handleToggleLike(workout.id)}
                  onPress={() => handlePress(workout)}
                  />
              ))
            ) : (
              <NoLikedWorkoutsCard title='עדיין לא שמרת שום אימון' subtitle='חקור את כלל האימונים שלנו וסמן את מה שאהבת!' onExplorePress={handleExplorePress} />
            )}

            {/* Other Sections */}
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>כל האימונים הזמינים</Text>
              <TouchableOpacity onPress={() => handleShowAllWorkouts(workouts)}>
                <Text style={styles.viewAllButton}>להציג את הכל</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              data={workouts}
              renderItem={({ item }) => (
                <SmallWorkoutCard
                  workout={{
                    title: item.workoutShortName,
                    image: item.thumbnailURL,
                    label: item.label,
                    isUnlocked: user.unlockAll || item.isUnlocked,
                  }}
                  onPress={() => handlePress(item)}
                  />
              )}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={styles.horizontalList}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>אימונים פופולריים</Text>
              <TouchableOpacity onPress={() => handleShowAllWorkouts(workouts.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0,10), 'אימונים פופולריים')}>
                <Text style={styles.viewAllButton}>להציג את הכל</Text>
              </TouchableOpacity>
            </View>
            {workouts.sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 2).map((workout, index) => (
              console.log("NATAN workout like ",workout.liked),
              <WorkoutPlanCard
                key={index}
                workout={{
                  title: workout.workoutName,
                  subtitle: workout.subtitle,
                  videos: workout.videos,
                  totalTime: workout.totalDuration || '',
                  isUnlocked: user.unlockAll || workout.isUnlocked,
                  image: workout.thumbnailURL,
                  id: workout.id,
                  place: workout.place,
                  level: workout.level,
                  liked: workout.liked ? true : false,
                }}
                onLike={() => handleToggleLike(workout.id)}
                onPress={() => handlePress(workout)}
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutsScreen;
