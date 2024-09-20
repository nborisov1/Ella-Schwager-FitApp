import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  workoutPlanCard: {
    backgroundColor: '#FFF5E1',  // Light background color
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    position: 'relative',  // Important for positioning the lock/unlock icon
  },
  workoutTopInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,  // Spacing between the blocks
  },
  infoText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
  workoutImage: {
    width: '100%',
    height: 150,
    borderRadius: 15,
    marginBottom: 10,
  },
  workoutInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  lockIconContainer: {
    position: 'absolute',  // Absolute positioning to place it in the bottom right
    right: 15,  // Distance from the right edge
    bottom: 15,  // Distance from the bottom edge
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',  // Black background for better visibility
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  lockText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  workoutScreenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF8C00',  // Your theme color
    marginBottom: 20,  // Add some margin to separate the title from the cards
  },
  workoutCardsContainer: {
    marginTop: 20,  // This creates space between the title and the first card
  },
});

export default styles;
