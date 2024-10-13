import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const updateExerciseInSession = async (userId, sessionId, exerciseId, name, thumbnail, updatedFields, difficulty, comment) => {
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
        // Update the existing exercise
        updatedExercises = currentExercises.map(exercise =>
          exercise.id === exerciseId && exercise.name === name
            ? { ...exercise, ...updatedFields, difficulty, comment }  // Update the exercise details
            : exercise
        );
      } else {
        // Add the new exercise if it doesn't exist
        const newExercise = {
          name,
          id: exerciseId,
          thumbnail:thumbnail,
          ...updatedFields
        };
        updatedExercises = [...currentExercises, newExercise];  // Add the new exercise to the array
      }
      await updateDoc(sessionRef, { exercises: updatedExercises });
      console.log('Exercise updated or added successfully.');
    } else {
      console.log('Training session not found.');
    }
  } catch (error) {
    console.error('Error updating or adding exercise in session:', error);
    throw error;
  }
};

export default updateExerciseInSession;
