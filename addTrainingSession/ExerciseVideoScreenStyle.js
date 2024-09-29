import { StyleSheet } from 'react-native'
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f8f8f8',
    },
    heading: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333',
    },
    videoContainer: {
      flexDirection: 'row',
      marginBottom: 15,
      alignItems: 'center',
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
    },
    videoThumbnail: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: 15,
    },
    videoName: {
      fontSize: 16,
      color: '#333',
      flexShrink: 1,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#000',
    },
    videoPlayer: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height * 0.4,
    },
    closeButton: {
      position: 'absolute',
      top: 30,
      right: 20,
      zIndex: 1,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 18,
    },
    videoTitle: {
      fontSize: 18,
      color: '#fff',
      textAlign: 'center',
      marginTop: 20,
    },
  });
  