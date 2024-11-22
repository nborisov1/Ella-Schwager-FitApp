import * as ImagePicker from 'expo-image-picker';

// Pick a Video
export const pickVideo = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      return { success: true, result: result };  // Return the video URI
    }
    return { success: false };  // Return a failed result if the user cancels
  } catch (error) {
    console.error('Error picking a video: ', error);
    return { success: false, error: error.message };
  }
};

// Pick an Image (Thumbnail)
export const pickThumbnail = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,   // Allows user to crop image
      aspect: [4, 3],        // Aspect ratio of the image
      quality: 1,            // Image quality (1 = max)
    });
    
    if (!result.canceled) {
      return { success: true, uri: result.assets[0].uri };  // Return the image URI
    }
    return { success: false };  // Return a failed result if the user cancels
  } catch (error) {
    console.error('Error picking a thumbnail: ', error);
    return { success: false, error: error.message };
  }
};