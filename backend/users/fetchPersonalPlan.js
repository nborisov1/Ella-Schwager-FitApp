import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../config/firebase';
import * as FileSystem from 'expo-file-system';

export const downloadAndStoreImage = async (firebaseImageUrl, filename) => {
  try {
    // Use fetch to download the image from the Firebase Storage URL
    const response = await fetch(firebaseImageUrl);

    // Convert the response to a Blob
    const blob = await response.blob();

    // Define the local path where the image will be stored
    const localUri = `${FileSystem.documentDirectory}${filename}`;

    // Save the Blob to the device's local storage
    await FileSystem.writeAsStringAsync(localUri, await blob.text(), {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Return the local URI to use in your component
    return localUri;
  } catch (error) {
    console.error('Error downloading and storing image:', error);
    throw error;
  }
};

const fetchPersonalPlan = async (userId) => {
    try {
      const personalPlanRef = collection(db, `users/${userId}/personalPlan`);
      const querySnapshot = await getDocs(personalPlanRef);
      const trainingSessions = querySnapshot.docs.map((doc, index) => {
        const sessionData = doc.data();
        console.log("sessionData" , sessionData);
        const exerciseList = sessionData.exercises ? sessionData.exercises.map(exercise => ({
          ...exercise
        })) : [];
        return {
          id: doc.id,  // Generate an ID
          days: sessionData.days,  // The days of the week
          sessionName: sessionData.sessionName,  // Session title
          exercises: exerciseList.length,  // Number of exercises
          downloadURL: sessionData.downloadURL || '',  // Fetch the thumbnail URL
          exerciseList: exerciseList  // List of exercises
        };
      });
  
      return trainingSessions;
    } catch (error) {
      console.error('Error fetching personal plan:', error);
      throw error;
    }
  };
  
  export default fetchPersonalPlan;
