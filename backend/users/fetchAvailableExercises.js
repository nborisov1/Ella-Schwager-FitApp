import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';  // Import your Firestore config

// Function to fetch available exercises from a subcollection of a specific training session
const fetchAvailableExercises = async (sessionId) => {
  try {
    // Reference to the 'exercises' subcollection within the specific training session
    const exercisesRef = collection(db, `trainingSessions/${sessionId}/exercises`);
    
    // Get all documents from the 'exercises' subcollection
    const exercisesSnapshot = await getDocs(exercisesRef);
    
    // Map through the documents and return the exercise data
    const exercises = exercisesSnapshot.docs.map(doc => ({
      id: doc.id,  // Document ID
      ...doc.data()  // Exercise data (name, reps, sets, etc.)
    }));
    return exercises;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
};

export default fetchAvailableExercises;
