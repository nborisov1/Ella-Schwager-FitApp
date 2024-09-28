import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // For generating unique file names
import * as FileSystem from 'expo-file-system';

// Convert image URI to Blob
const uriToBlob = async (uri) => {
  const response = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + 'image.jpg');
  const blob = await (await fetch(response.uri)).blob();
  return blob;
};

const storage = getStorage(); // Initialize Firebase Storage

// Function to upload the thumbnail and get its download URL
export const uploadThumbnail = async (imageUri, imageName) => {
  try {
    // Convert the image URI to a Blob
    const imageBlob = await uriToBlob(imageUri);

    // Generate a unique file name using UUID
    const storageRef = ref(storage, `thumbnails/${imageName}`);

    // Set MIME type metadata if needed
    const metadata = {
      contentType: 'image/jpeg' // or 'image/png', depending on your use case
    };

    // Upload the Blob to Firebase Storage
    const snapshot = await uploadBytes(storageRef, imageBlob, metadata);

    // Get the download URL after the file is uploaded
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL; // Return the URL to be stored in Firestore
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    throw error;
  }
};
