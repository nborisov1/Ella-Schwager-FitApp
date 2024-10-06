import { getStorage, ref, uploadString, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as FileSystem from 'expo-file-system';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 1024;
  var byteCharacters = atob(base64Data);
  var bytesLength = byteCharacters.length;
  var slicesCount = Math.ceil(bytesLength / sliceSize);
  var byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      var begin = sliceIndex * sliceSize;
      var end = Math.min(begin + sliceSize, bytesLength);

      var bytes = new Array(end - begin);
      for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
          bytes[i] = byteCharacters[offset].charCodeAt(0);
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

// Function to upload the thumbnail and get its download URL
export const uploadThumbnail = async (imageUri) => {
  const storage = getStorage(); // Initialize Firebase Storage
  const fileName = imageUri.split('/').pop(); // Extract file name

  try {
    // Convert the local image URI to a Blob
    const fileData = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const blob = base64toBlob(fileData)
    // Prepend the base64 format identifier to the file data
    const base64Data = `data:image/jpeg;base64,${fileData}`;

    // Generate a unique file name using UUID

    // Create a reference to the storage path for the thumbnail
    const storageRef = ref(storage, `thumbnails/${fileName}`);
    const snapshot = await uploadBytes(storageRef, blob);

    console.log('Uploaded base64 string!', snapshot);

    // Optionally, get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading thumbnail:', error);
    throw error;
  }
};
