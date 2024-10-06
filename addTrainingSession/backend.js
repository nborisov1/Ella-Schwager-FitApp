import { getFirestore, collection, doc, setDoc, getDocs, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, UploadTask } from "firebase/storage";
import { uploadImage } from "../backend/upload/thumbnials";
import { db, storage } from '../config/firebase';

// Add a new training session
export const addTrainingSession = async (name, thumbnail) => {
  try {
    const sessionRef = await addDoc(collection(db, "trainingSessions"), { name, thumbnail });
    return sessionRef.id;
  } catch (error) {
    console.error("Error adding training session: ", error);
    throw error;
  }
};

// Add exercise to training session
export const addExerciseToGeneralSession = async (sessionId, exercise, progressUpdateHandler, completionHandler) => {
  try {
    const thumbnailUrl = exercise.thumbnail;
    return uploadImage(thumbnailUrl, 
                progressUpdateHandler,
                completionHandler);
  } catch (error) {
    console.error("Error adding exercise: ", error);
    throw error;
  }
};

// Fetch all training sessions
export const fetchTrainingSessions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "trainingSessions"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching training sessions: ", error);
    throw error;
  }
};

export const createTrainingSessionInSessionCollection = async (thumbnailUrl, progressUpdateHandler, completionHandler) => {
  try {
    return uploadImage(thumbnailUrl, 
      progressUpdateHandler,
      completionHandler);
    console.log('Training session created with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding training session: ', e);
    throw e;
  }
};

// Fetch exercises for a training session
export const fetchExercisesForSession = async (sessionId) => {
  try {
    const querySnapshot = await getDocs(collection(db, `trainingSessions/${sessionId}/exercises`));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching exercises: ", error);
    throw error;
  }
};

// Upload thumbnail or video
export const uploadFile = async (file, path) => {
  const fileRef = ref(storage, path);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadUrl = await getDownloadURL(snapshot.ref);
  return downloadUrl;
};
