import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { uploadThumbnail } from '../upload/thumbnials';

// Function to create a training session in the personalPlan subcollection
const createTrainingSession = async (userId, sessionData) => {
  try {
    const thumbnailUrl = await uploadThumbnail(sessionData.thumbnail, 'natan123');
    const personalPlanRef = collection(db, `users/${userId}/personalPlan`);

    // Add the new training session as a document in the personalPlan subcollection
    await addDoc(personalPlanRef, {
      title: sessionData.title,
      days: sessionData.days,  // Days of the week the session is performed
      exercises: sessionData.exercises,  // Array of exercises
      thumbnailUrl: thumbnailUrl  // Store the thumbnail URL
    });

    console.log('Training session created successfully.');
  } catch (error) {
    console.error('Error creating training session:', error);
    throw error;
  }
};

export default createTrainingSession;
