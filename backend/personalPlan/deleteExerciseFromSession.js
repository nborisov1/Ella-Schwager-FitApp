// backend/personalPlan/deleteExerciseFromSession.js
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Function to delete an exercise from a session
const deleteExerciseFromSession = async (userId, sessionId, exerciseId) => {
  try {
    const sessionRef = doc(db, `users/${userId}/personalPlan`, sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (sessionDoc.exists()) {
      const sessionData = sessionDoc.data();
      const updatedExercises = sessionData.exercises.filter(
        exercise => exercise.exerciseId !== exerciseId
      );

      await updateDoc(sessionRef, { exercises: updatedExercises });
      console.log('Exercise deleted successfully.');
    } else {
      console.log('Training session not found.');
    }
  } catch (error) {
    console.error('Error deleting exercise from session:', error);
    throw error;
  }
};

export default deleteExerciseFromSession;
