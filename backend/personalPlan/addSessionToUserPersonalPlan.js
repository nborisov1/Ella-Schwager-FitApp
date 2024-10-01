import { doc, setDoc, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';

const addSessionToUserPersonalPlan = async (userId, session) => {
  try {
    // Reference to the user's personal plan collection
    const personalPlanRef = collection(db, `users/${userId}/personalPlan`);

    // Data structure for adding the session
    const sessionData = {
      title: session.title,          // Session title
      thumbnailUrl: session.thumbnailUrl,  // Session thumbnail URL
      days: session.days || [],      // Days (if available)
      exerciseList: [],              // Initialize with an empty exercise list
    };

    // Add session to the personal plan subcollection
    await setDoc(doc(personalPlanRef, session.id), sessionData);
    console.log(`Added session ${session.title} to user ${userId}'s personal plan.`);
  } catch (error) {
    console.error('Error adding session to personal plan:', error);
    throw error;
  }
};

export default addSessionToUserPersonalPlan;