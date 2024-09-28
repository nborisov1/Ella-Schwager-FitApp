import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const updateExerciseInSession = async (userId, sessionId, exerciseId, updatedFields) => {
  try {
    const sessionRef = doc(db, `users/${userId}/personalPlan`, sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (sessionDoc.exists()) {
      const sessionData = sessionDoc.data();
      const updatedExercises = sessionData.exercises.map(exercise =>
        exercise.exerciseId === exerciseId
          ? { ...exercise, ...updatedFields }  // Update the exercise details
          : exercise
      );

      await updateDoc(sessionRef, { exercises: updatedExercises });
      console.log('Exercise updated successfully.');
    } else {
      console.log('Training session not found.');
    }
  } catch (error) {
    console.error('Error updating exercise in session:', error);
    throw error;
  }
};

export default updateExerciseInSession;
