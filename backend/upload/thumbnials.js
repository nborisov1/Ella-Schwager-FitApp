import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

export async function uploadImage(uri, progressUpdateHandler, completionHandler) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storage = getStorage(); // Initialize Firebase Storage
    const fileName = uri.split('/').pop(); // Extract file name
    const storageRef = ref(storage, `thumbnails/${fileName}`);
    
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progressUpdateHandler) {
          progressUpdateHandler(progress);
        }
      },
      (error) => {
        if (completionHandler) {
          completionHandler(error, null);
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (completionHandler) {
            completionHandler(null, downloadURL);
          }
        });
      }
    );
    return uploadTask; // Return the uploadTask for cancellation or monitoring
  } catch (error) {
    console.error('Upload failed:', error);
    if (completionHandler) {
      completionHandler(error, null);
    }
  }
}
