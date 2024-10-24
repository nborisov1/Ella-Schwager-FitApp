import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    width: '100%',
    height: 300,  // Adjust the height for the header
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
    paddingBottom: 15,
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
    paddingBottom: 40,
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
});

export default styles;
