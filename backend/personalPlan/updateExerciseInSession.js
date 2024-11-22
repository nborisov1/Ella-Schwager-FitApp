import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const updateCommentForUsersPlanOnExerciseInSession = async (userId, sessionId, name, exerciseId, comment) => {
  try {
    const sessionRef = doc(db, `users/${userId}/personalPlan`, sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (sessionDoc.exists()) {
      const sessionData = sessionDoc.data();
      const currentExercises = sessionData.exercises || [];  // Default to an empty array if no exercises exist
      
      // Check if the exercise already exists in the session
      const exerciseExists = currentExercises.some(exercise => exercise.id === exerciseId && exercise.name === name);
      let updatedExercises;

      if (exerciseExists) {
        // Update the existing exercise with new comment
        updatedExercises = currentExercises.map(exercise => {
          if (exercise.id === exerciseId && exercise.name === name) {
            // Ensure the exercise has a comments array, or create one if it doesn't exist
            const updatedComments = [...(exercise.comments || []), {
              comment: comment,
              timestamp: new Date().toISOString(),  // Add timestamp for the comment
            }];
            // Return the exercise with updated comments, preserving other fields
            return {
              ...exercise,  // Spread all other fields
              comments: updatedComments  // Only update the comments array
            };
          }
          return exercise;
        });
      } else {
        console.log("Couldn't find exercise id for sending comments");
        return;  // Exit if the exercise is not found
      }

      // Update the session with the modified exercises array
      await updateDoc(sessionRef, { exercises: updatedExercises });
      console.log('Exercise comment updated successfully.');
    } else {
      console.log('Training session not found.');
    }
  } catch (error) {
    console.error('Error updating or adding comment to exercise in session:', error);
    throw error;
  }
};

export default updateCommentForUsersPlanOnExerciseInSession;
