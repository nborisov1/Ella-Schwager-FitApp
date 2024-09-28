import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Function to add an exercise to a specific training session
const addExerciseToSession = async (userId, sessionId, exercise) => {
  try {
    const sessionRef = doc(db, `users/${userId}/personalPlan`, sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (sessionDoc.exists()) {
      await updateDoc(sessionRef, {
        exercises: arrayUnion(exercise)  // Add the new exercise to the existing list
      });
      console.log('Exercise added to session.');
    } else {
      console.log('Training session not found.');
    }
  } catch (error) {
    console.error('Error adding exercise to session:', error);
    throw error;
  }
};

export default addExerciseToSession;
