import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');  // Get screen width for responsive card design

const styles = StyleSheet.create({
  workoutPlanCard: {
    borderRadius: 10,
    overflow: 'hidden',  // Ensure content doesn't overflow the card
    marginVertical: 10,
    width: width * 0.9,  // Adjust width to be smaller, 90% of screen width
    height: 180,  // Adjust height for a better fit on the screen
    alignSelf: 'center',  // Center the card on the screen
  },
  workoutImage: {
    width: '100%',
    height: '100%',  // Ensure the image covers the entire card
    justifyContent: 'space-between',  // Align content at the top and bottom
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',  // Darken the background for readability
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
  },
  workoutTopInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 14,
  },
  workoutInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  instructorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  instructorName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  workoutTitle: {
    color: 'white',
    fontSize: 14,
  },
  lockIconContainer: {
    position: 'absolute',
    bottom: 10,  // Positioned at the bottom
    right: 10,   // Positioned at the right
  },
});

export default styles;
