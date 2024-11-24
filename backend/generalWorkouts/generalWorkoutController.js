import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import React from 'react';
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

export const fetchPopularWorkouts = async () => {
  try {
    // Query workouts that have a score, ordering by score in descending order
    const generalWorkouts = await fetchGeneralWorkouts();
    // Map through scored documents
    const scoredWorkouts = generalWorkouts.map(workout => ({
      ...doc.data(),
      score: workout.score ?? 0,
    }));

    // Combine and sort the lists, putting scored workouts first
    const allWorkouts = [...scoredWorkouts].sort((a, b) => b.score - a.score);
    // Set only the top 10 if needed
    return allWorkouts.slice(0,10);
  } catch (error) {
    console.error('Error fetching popular workouts:', error);
  }
}

export const fetchPlans = async (planName = 'generalWorkouts') => {
  try {
    // Reference to the 'pricing' collection
    const pricingCollectionRef = collection(db, 'pricing');
    const querySnapshot = await getDocs(pricingCollectionRef);

    let plansMap = {};
    let headerTitle = '';
    let headerDescription = '';
    let coupons = {};

    // Iterate over all documents in the pricing collection
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data[planName]) {
        // If the document contains the plan map, set the plansMap
        plansMap = data[planName];
        
        // Access headerTitle and headerDescription dynamically using planName as the prefix
        headerTitle = data[`${planName}HeaderTitle`] || '';
        headerDescription = data[`${planName}HeaderDescription`] || '';
        coupons = data.coupons || {}; // Fetch the coupons map if it exists
      }
    });

    // Convert the plans map to an array of plan objects
    const plans = Object.keys(plansMap).map((key) => plansMap[key]);

    return {
      plans,
      headerTitle,
      headerDescription,
      coupons,
    };
  } catch (error) {
    console.error('Error fetching plans:', error);
    return {
      plans: [],
      headerTitle: '',
      headerDescription: '',
      coupons: {},
    };
  }
};
