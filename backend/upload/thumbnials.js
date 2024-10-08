import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import * as VideoThumbnails from 'expo-video-thumbnails';

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
        console.log("snapshot",snapshot);
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

export async function uploadVideo(uri, progressUpdateHandler, completionHandler) {
  try {
    const storage = getStorage();
    const fileName = uri.split('/').pop(); // Extract file name

    // 1. Generate thumbnail for the video
    const thumbnailUri  = await VideoThumbnails.getThumbnailAsync(uri);
    console.log(thumbnailUri)
    // 2. Upload the thumbnail using the uploadImage method
    await uploadImage(
      thumbnailUri.uri,
      (thumbnailProgress) => {
        console.log(`Thumbnail upload progress: ${thumbnailProgress}%`);
      },
      async (thumbnailError, thumbnailDownloadURL) => {
        if (thumbnailError) {
          if (completionHandler) {
            completionHandler(thumbnailError, null, null);
          }
          return;
        }

        const storageRef = ref(storage, `videos/${fileName}`);
        const response = await fetch(uri);
        const blob = await response.blob();
        
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (progressUpdateHandler) {
              progressUpdateHandler(progress);
            }
          },
          (error) => {
            if (completionHandler) {
              completionHandler(error, null, null);
            }
          },
          async () => {
            // 4. Get the download URL of the uploaded video
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              if (completionHandler) {
                completionHandler(null, downloadURL, thumbnailDownloadURL);
              }
            });
          }
        );
      }
    );
  } catch (error) {
    console.error('Upload failed:', error);
    if (completionHandler) {
      completionHandler(error, null, null);
    }
  }
};
