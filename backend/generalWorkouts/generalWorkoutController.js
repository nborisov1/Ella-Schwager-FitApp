import { collection, addDoc, doc, getDoc, updateDoc, arrayUnion, getDocs, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { uploadVideo, uploadImage } from '../upload/thumbnials';

// 1. Create a New General Workout
export const createGeneralWorkout = async (workoutName, thumbnailURI) => {
  try {
    // First, upload the workout thumbnail to Firebase Storage
    const thumbnailUploadTask = await uploadImage(
      thumbnailURI,
      (progress) => console.log(`Thumbnail Upload Progress: ${progress}%`),
      async (error, downloadURL) => {
        if (error) {
          console.error('Thumbnail upload failed:', error);
          return;
        } else {
          thumbnailDownloadURL = downloadURL;  // Store the download URL for later use
          console.log('Thumbnail uploaded successfully:', downloadURL);
              // Now, create the general workout document in Firestore with the correct thumbnail URL
          const generalWorkoutsRef = collection(db, 'generalWorkouts');
          const newWorkout = {
            workoutName,
            thumbnailURL: thumbnailDownloadURL,  // Use the correct download URL from the upload
          };

          const docRef = await addDoc(generalWorkoutsRef, newWorkout);
          console.log('New General Workout created with ID: ', docRef.id);
          return docRef.id;
        }
      }
    );
  } catch (error) {
    console.error('Error creating new general workout: ', error);
    throw error;
  }
};


export const addVideoToGeneralWorkout = async (workoutId, videoData) => {
  if (!videoData.videoURI || !videoData.thumbnailURI) {
    console.error('No thumbnail or video URL for general workout was supplied');
    return;
  }

  try {
    let videoDownloadURL = null;
    let thumbnailDownloadURL = null;

    // First, upload the video
    await uploadVideo(
      videoData.videoURI,  // Local URI of the video
      (progress) => console.log(`Video Upload Progress: ${progress}%`),
      (error, downloadURL, thumbnailURL) => {
        if (error) {
          console.error('Video upload failed:', error);
        } else {
          videoDownloadURL = downloadURL;
          thumbnailDownloadURL = thumbnailURL;
          console.log('Video uploaded successfully:', downloadURL);
        }
      }
    );

    // Now, save the video details to Firestore
    const workoutDocRef = doc(db, `generalWorkouts/${workoutId}/workouts`);
    const workoutVideo = {
      name: videoData.name,
      videoURL: videoDownloadURL,
      thumbnailURL: thumbnailDownloadURL,
      duration: videoData.duration,
      createdAt: new Date(),
    };

    // Add the new video to the workouts subcollection
    await updateDoc(workoutDocRef, {
      videos: arrayUnion(workoutVideo),
    });

    console.log('Video added to general workout successfully');

    // Fetch the current workout document to update the total duration and video count
    const generalWorkoutRef = doc(db, `generalWorkouts/${workoutId}`);
    const generalWorkoutDoc = await getDoc(generalWorkoutRef);

    if (generalWorkoutDoc.exists()) {
      const workoutData = generalWorkoutDoc.data();
      const currentVideos = workoutData.videos || [];  // Fetch existing videos (if any)
      
      // Calculate new total duration and video count
      const totalDuration = currentVideos.reduce((total, video) => total + video.duration, 0) + videoData.duration;
      const videoCount = currentVideos.length + 1;

      // Update the general workout document with new total duration and video count
      await updateDoc(generalWorkoutRef, {
        totalDuration,
        videoCount,
      });

      console.log('General workout updated with new total duration and video count');
    }

  } catch (error) {
    console.error('Error adding video to general workout: ', error);
  }
};

// 3. Fetch All General Workouts
export const fetchGeneralWorkouts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'generalWorkouts'));
    const workouts = [];
    querySnapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() });
    });
    return workouts;
  } catch (error) {
    console.error('Error fetching general workouts: ', error);
  }
};

// 4. Fetch All Videos of a Specific General Workout
export const fetchWorkoutVideos = async (workoutId) => {
  try {
    const videosRef = collection(db, `generalWorkouts/${workoutId}/workouts`);
    const querySnapshot = await getDocs(videosRef);
    const videos = [];
    querySnapshot.forEach((doc) => {
      videos.push({ id: doc.id, ...doc.data() });
    });
    return videos;
  } catch (error) {
    console.error('Error fetching workout videos: ', error);
  }
};

// 5. Delete a Video from a General Workout
export const deleteVideoFromGeneralWorkout = async (workoutId, videoId, videoURL) => {
  try {
    // Delete the video from Firestore
    const videoDocRef = doc(db, `generalWorkouts/${workoutId}/workouts`, videoId);
    await deleteDoc(videoDocRef);

    const videoRef = ref(storage, videoURL);
    await deleteObject(videoRef);

    console.log('Video deleted successfully');
  } catch (error) {
    console.error('Error deleting video: ', error);
  }
};

export const fetchUserUnlockedWorkouts = async (userId) => {
  try {
    const userDocRef = doc(db, `users/${userId}`);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const unlockedWorkoutIds = userData.unlockedWorkoutIds || [];
      const unlockAll = userData.unlockAll || false;
      return { unlockedWorkoutIds, unlockAll };
    } else {
      console.error('No user data found for ID:', userId);
      return { unlockedWorkoutIds: [], unlockAll: false };
    }
  } catch (error) {
    console.error('Error fetching user unlocked workouts:', error);
    return { unlockedWorkoutIds: [], unlockAll: false };
  }
};
