// backend/personalPlan/updateTrainingSession.js
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Function to update the training session (e.g., title or days)
const updateTrainingSession = async (userId, sessionId, updatedFields) => {
  try {
    const sessionRef = doc(db, `users/${userId}/personalPlan`, sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (sessionDoc.exists()) {
      await updateDoc(sessionRef, updatedFields);
      console.log('Training session updated successfully.');
    } else {
      console.log('Training session not found.');
    }
  } catch (error) {
    console.error('Error updating training session:', error);
    throw error;
  }
};

export default updateTrainingSession;
