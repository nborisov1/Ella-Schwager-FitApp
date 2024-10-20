import { getFirestore, doc, getDoc } from "firebase/firestore";

export const fetchExerciseVideos = async (trainingSessionId, exerciseId) => {
  const db = getFirestore();
  try {
    // Reference to the specific exercise document
    const exerciseDocRef = doc(db, `trainingSessions/${trainingSessionId}/exercises`, exerciseId);
    
    // Fetch the document
    const exerciseDoc = await getDoc(exerciseDocRef);

    // Check if the document exists
    if (exerciseDoc.exists()) {
      const exerciseData = exerciseDoc.data();

      // Check if the videos array exists in the document
      if (exerciseData.videos) {
        return exerciseData.videos; // Return the videos array
      } else {
        console.log('No videos found for this exercise');
        return [];
      }
    } else {
      console.log('No such exercise document found');
      return [];
    }
  } catch (error) {
    console.error('Error fetching exercise videos: ', error);
    throw error; // Re-throw the error to handle it elsewhere if necessary
  }
};