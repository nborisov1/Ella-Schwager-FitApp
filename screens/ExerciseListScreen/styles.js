import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    height: 320,  // Adjust the height for the header
  },
  headerBackgroundImage: {
    flex: 1,
    justifyContent: 'flex-end',  // Align the content at the bottom of the image
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  backButton: {
    position: 'absolute',
    top: 40,  // Position based on the device's status bar
    left: 20,
    zIndex: 1,  // Ensure the button appears on top
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 80,
  },
  exerciseItem: {
    flexDirection: 'column',
    padding: 15,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  activityIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }],
    zIndex: 1,  // Ensure the ActivityIndicator is on top of the image
  },  
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 15,
    marginTop: 20,  // Lower the position a bit
    justifyContent: 'space-around',
    alignItems: 'center',
    width: width * 0.5,  // Full width for two elements
    alignSelf: 'center',
  },
  infoContainerSingle: {
    width: width * 0.3,  // Smaller width for a single element
  },
  infoItem: {
    flexDirection: 'row-reverse',  // Position icon to the right of the text
    alignItems: 'center',
    paddingHorizontal: 10,  // Add padding between the icon and text
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginRight: 5,  // Add spacing between the text and icon
    textAlign: 'center',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
});

export default styles;
