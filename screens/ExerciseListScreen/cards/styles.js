import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',  // Horizontal layout with thumbnail on the left
    width: '100%',  // Adjust card width based on your design (thumbnail size)
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,  // Fixed width for the thumbnail
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  detailsContainer: {
    flex:1,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-start',  // Align content to the top
    flexDirection: 'row-reverse',
    alignItems: 'top',
    marginBottom: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'right',
    marginLeft: 5,  // Minimal spacing between title and custom fields
  },
  subtitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'right',
    marginBottom: 10, // Default margin
  },
  infoText: {
    fontSize: 11,
    color: '#333',
    textAlign: 'right',
    marginTop: 3,
  },
  commentSection: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
    width: '95%',
    justifyContent: 'space-between',
    marginLeft: 16, // Add space between the comment section and the thumbnail
  },
    commentBox: {
    flex: 1,
    borderRadius: 8,
    padding: 8,
    fontSize: 13,
    textAlign: 'right',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: 'pink',
    padding: 8,
    borderRadius: 8,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -16 }, { translateY: -16 }],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    width: 32,
    height: 32,
    },
  playIcon: {
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#000', // Background for video container
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40, // Move it down slightly from the top edge for accessibility
    right: 20, // Keep it aligned to the right edge of the screen
    borderRadius: 15,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  videoPlayer: {
    width: '100%',
    height: 300,
  },
  videoLoadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  });

export default styles;
