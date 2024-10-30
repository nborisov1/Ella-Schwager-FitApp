import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../config/firebase';

// 3. Fetch All General Workouts
export const fetchGeneralWorkouts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'generalWorkouts'));
    const workouts = [];
    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() });
    });
    return workouts;
  } catch (error) {
    console.error('Error fetching general workouts: ', error);
  }
};

// 4. Fetch All Videos of a Specific General Workout
export const fetchWorkoutVideos = async (workoutId) => {
  try {
    // Get a reference to the general workout document
    const workoutDocRef = doc(db, `generalWorkouts/${workoutId}`);
    const workoutDoc = await getDoc(workoutDocRef);

    if (workoutDoc.exists()) {
      const workoutData = workoutDoc.data();
      
      // Extract videos array from the workout data
      const videos = workoutData.videos || [];  // Default to an empty array if no videos are present

      return videos;
    } else {
      console.error(`No workout found for ID: ${workoutId}`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching workout videos: ', error);
    return [];
  }
};

export const fetchUserUnlockedWorkouts = async (userId) => {
  try {
    const userDocRef = doc(db, `users/${userId}`);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const unlockedWorkoutIds = userData.unlockedWorkoutIds || [];
      const unlockAll = userData.unlockAll || false;
      return { unlockedWorkoutIds, unlockAll };
    } else {
      console.error('No user data found for ID:', userId);
      return { unlockedWorkoutIds: [], unlockAll: false };
    }
  } catch (error) {
    console.error('Error fetching user unlocked workouts:', error);
    return { unlockedWorkoutIds: [], unlockAll: false };
  }
};
