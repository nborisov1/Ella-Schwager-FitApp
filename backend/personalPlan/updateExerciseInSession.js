import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const updateExerciseInSession = async (userId, sessionId, exerciseId, name, updatedFields) => {
  try {
    const sessionRef = doc(db, `users/${userId}/personalPlan`, sessionId);
    const sessionDoc = await getDoc(sessionRef);

    if (sessionDoc.exists()) {
      const sessionData = sessionDoc.data();
      const currentExercises = sessionData.exercises || [];  // Default to an empty array if no exercises exist
      
      // Check if the exercise already exists in the session
      const exerciseExists = currentExercises.some(exercise => exercise.exerciseId === exerciseId && exercise.name === name);
      console.log("currentExercises",currentExercises);
      let updatedExercises;
      if (exerciseExists) {
        // Update the existing exercise
        updatedExercises = currentExercises.map(exercise =>
          exercise.exerciseId === exerciseId && exercise.name === name
            ? { ...exercise, ...updatedFields }  // Update the exercise details
            : exercise
        );
        console.log("updatedExercises",updatedExercises);
      } else {
        // Add the new exercise if it doesn't exist
        const newExercise = {
          name,
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
